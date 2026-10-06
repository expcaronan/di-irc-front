import React, { useEffect, useState } from 'react'
import EmployeeUserModel from '../../../../Interfaces/EmployeeUserModel'

import { taskDocumentAssignedEmployeeBaseModel } from '../../../../Interfaces/BaseModel/taskDocumentAssignedEmployeeBaseModel';
import DocumentAssignedTable from './DocumentAssignedTable';
import MainLoader from '../../../Common/MainLoader';
import { useGetAllTaskDocumentsWithAssignedDepartmentByIdQuery } from '../../../../Api/taskDocumentApi';
import { taskDocumentAssignedDepartmentBaseModel } from '../../../../Interfaces/BaseModel/taskDocumentAssignedDepartmentBaseModel';
import { taskDocumentBaseModel } from '../../../../Interfaces/BaseModel/taskDocumentBaseModel';
import notifiedUserBaseModel from '../../../../Interfaces/BaseModel/notifiedUserBaseModel';
import DocumentAssignedCompare from './DocumentAssignedCompare';
interface props{
    userDetails:EmployeeUserModel
    notificationList:notifiedUserBaseModel[]
}
function DocumentAssignedByQuery({userDetails, notificationList}:props) {
//console.log(userDetails.employeeId);
const { data, isLoading } = useGetAllTaskDocumentsWithAssignedDepartmentByIdQuery(userDetails.departmentId);
const [loading, setLoading] = useState(false);
const [taskDocumentList, setTaskDocumentList] = useState<taskDocumentAssignedDepartmentBaseModel[]>([])

useEffect(() =>{
    setLoading(true);
    if(data && !isLoading){
        setTaskDocumentList(data.result);
    }
    setLoading(false);
},[data]);


return (
    <div>
        {
            !loading && taskDocumentList ? <DocumentAssignedCompare documentList={taskDocumentList} notificationList={notificationList} employeeId={userDetails.employeeId}/> :<MainLoader/>
        }
    </div>
)


}

export default DocumentAssignedByQuery