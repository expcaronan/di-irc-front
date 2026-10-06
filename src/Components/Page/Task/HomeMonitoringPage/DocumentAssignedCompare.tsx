
import React, { useEffect, useMemo, useState } from 'react';
import {
    taskDocumentAssignedDepartmentBaseModel
} from '../../../../Interfaces/BaseModel/taskDocumentAssignedDepartmentBaseModel';
import notifiedUserBaseModel
    from '../../../../Interfaces/BaseModel/notifiedUserBaseModel';

import NotificationModal from './NotificationModal';
import DocumentAssignedTable from './DocumentAssignedTable';
import { useCreateNotifiedUsersMutation } from '../../../../Api/taskDocumentApi';
import apiResponse from '../../../../Interfaces/apiResponse';
import formatDate from '../../../../Helpers/formatDate';

interface Props {
    documentList: taskDocumentAssignedDepartmentBaseModel[];
    notificationList: notifiedUserBaseModel[];
    employeeId: number;
}

function DocumentAssignedCompare({
    documentList,
    notificationList,
    employeeId
}: Props) {

    const [isModalOpen, setIsModalOpen] = useState(true);
    const [createNotifiedUser] = useCreateNotifiedUsersMutation();
    const closeModal = () => {
        setIsModalOpen(false);
    };


  const difference = useMemo(() => {
    return documentList.filter(department => {

        // Task has no status yet
        const hasNoStatus =
            department.taskDocumentStatus === null ||
            department.taskDocumentStatus.length === 0;

        // Task has an active status and is NOT completed
        const hasIncompleteStatus =
            department.taskDocumentStatus?.some(status =>
                status.isActive === true &&
                status.taskStatusId !== 5
            ) ?? false;

        // Already notified?
        const alreadyNotified =
                notificationList.some(notification =>
                notification.employeeId == employeeId &&
                notification.taskdocumentId == department.taskDocumentId &&
                formatDate(notification.dateNotified) == formatDate(new Date().toISOString())
                
            );
        
            //console.log(department.taskDocumentId+" "+employeeId);
            console.log(alreadyNotified);
        // Show only if incomplete AND not notified
        return (
            (hasNoStatus || hasIncompleteStatus) &&
            !alreadyNotified
        );
    });
}, [
    documentList,
    notificationList,
    employeeId
]);

//console.log(difference);
//console.log(notificationList);

const newNotifications = useMemo<notifiedUserBaseModel[]>(() => {

    return difference.map(department => ({
        id: 0,
        employeeId: employeeId,
        taskdocumentId: department.taskDocumentId,
        dateNotified:formatDate(new Date().toISOString())
    }));

}, [difference, employeeId]);
console.log(isModalOpen);
console.log(difference.length);

 useEffect(() => {

    // if (newNotifications.length === 0) {
    //     setIsModalOpen(false);
    //     return;
    // }

    const saveNotifications = async () => {

        try {

            const response = await createNotifiedUser(newNotifications).unwrap();
            console.log(response);
            if (response?.isSuccess === true) {

                console.log("Notifications saved");

                // Show popup
                setIsModalOpen(true);

            } else {

                console.error(
                    "Failed to save notifications"
                );

                setIsModalOpen(false);
            }

        } catch (error) {

            console.error(
                "Error saving notifications:",
                error
            );

            setIsModalOpen(false);
        }
    };

    if(!isModalOpen && newNotifications.length > 0){
        saveNotifications();
    }
   

}, [newNotifications, createNotifiedUser, isModalOpen]);
  

    return (
        <div>


        {isModalOpen && difference.length > 0 && (
            <NotificationModal
                isOpen={isModalOpen}
                closeModal={closeModal} 
                documentList={difference}
            />
        )}

        {difference.length == 0 &&(
            <DocumentAssignedTable
                documentList={documentList}
                employeeId={employeeId}
            />
        )}

 

        </div>
    );
}

export default DocumentAssignedCompare;

