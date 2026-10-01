import React, { useEffect, useState } from 'react'
import EmployeeUserModel from '../../../../Interfaces/EmployeeUserModel'

import { taskDocumentAssignedEmployeeBaseModel } from '../../../../Interfaces/BaseModel/taskDocumentAssignedEmployeeBaseModel';
import DocumentAssignedTable from './DocumentAssignedTable';
import MainLoader from '../../../Common/MainLoader';
import { useGetAllTaskDocumentsWithAssignedDepartmentByIdQuery } from '../../../../Api/taskDocumentApi';
import { taskDocumentAssignedDepartmentBaseModel } from '../../../../Interfaces/BaseModel/taskDocumentAssignedDepartmentBaseModel';
import { taskDocumentBaseModel } from '../../../../Interfaces/BaseModel/taskDocumentBaseModel';
interface props{
    userDetails:EmployeeUserModel
}
function DocumentAssignedByQuery({userDetails}:props) {
//console.log(userDetails.employeeId);
const { data, isLoading } = useGetAllTaskDocumentsWithAssignedDepartmentByIdQuery(userDetails.departmentId);
const [loading, setLoading] = useState(false);
const [taskDocumentList, setTaskDocumentList] = useState<taskDocumentAssignedDepartmentBaseModel[]>([])

useEffect(() =>{
    setLoading(true);
    if(data && !isLoading){
       //console.log(data.result)
        setTaskDocumentList(data.result);
    }
    setLoading(false);
});


return (
    <div>
        {
            !loading && taskDocumentList ? <DocumentAssignedTable documentList={taskDocumentList} employeeId={userDetails.employeeId}/> :<MainLoader/>
        }
    </div>
)


}

export default DocumentAssignedByQuery