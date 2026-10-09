
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
import EmployeeUserModel from '../../../../Interfaces/EmployeeUserModel';
import getTestNotifications from '../../../../Helpers/getTestNotifications';

interface Props {
    documentList: taskDocumentAssignedDepartmentBaseModel[];
    notificationList: notifiedUserBaseModel[];
    userDetails: EmployeeUserModel;
    accessToken:string;
}

function DocumentAssignedCompare({
    documentList,
    notificationList,
    userDetails,
    accessToken
}: Props) {

    const [isModalOpen, setIsModalOpen] = useState(true);
    const [createNotifiedUser] = useCreateNotifiedUsersMutation();
    const closeModal = () => {
        setIsModalOpen(false);
    };


  const differenceData = useMemo(() => {
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
                notification.employeeId == userDetails.employeeId &&
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
    userDetails.employeeId
]);

//console.log(difference);
//console.log(notificationList);

const newNotifications = useMemo<notifiedUserBaseModel[]>(() => {

    return differenceData.map(department => ({
        id: 0,
        employeeId: userDetails.employeeId,
        taskdocumentId: department.taskDocumentId,
        dateNotified:formatDate(new Date().toISOString())
    }));

}, [differenceData, userDetails.employeeId]);



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

                //console.log("Notifications saved");
                getTestNotifications(accessToken, userDetails.departmentId, differenceData);
                setIsModalOpen(true);
                
                // Show popup
               

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

    // if(newNotifications.length > 0){
    //     saveNotifications();
    // }
   

}, [newNotifications, createNotifiedUser, isModalOpen]);
  

    return (
        <div>


        {isModalOpen && differenceData.length > 0 && (
            <NotificationModal
                isOpen={isModalOpen}
                closeModal={closeModal} 
                documentList={differenceData}
                accessToken={accessToken}
            />
        )} 

        {differenceData.length == 0 &&(
            <DocumentAssignedTable
                documentList={documentList}
                employeeId={userDetails.employeeId}
            />
        )}

 

        </div>
    );
}

export default DocumentAssignedCompare;

