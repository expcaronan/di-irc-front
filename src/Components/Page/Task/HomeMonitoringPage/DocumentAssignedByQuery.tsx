import React, { useEffect, useState } from 'react'
import EmployeeUserModel from '../../../../Interfaces/EmployeeUserModel'
import { useGetAllTaskDocumentsWithAssignedEmployeeByIdQuery } from '../../../../Api/taskDocumentApi';
import { taskDocumentAssignedEmployeeBaseModel } from '../../../../Interfaces/BaseModel/taskDocumentAssignedEmployeeBaseModel';
import DocumentAssignedTable from './DocumentAssignedTable';
import MainLoader from '../../../Common/MainLoader';
interface props{
    userDetails:EmployeeUserModel
}
function DocumentAssignedByQuery({userDetails}:props) {
//console.log(userDetails.employeeId);
const { data, isLoading } = useGetAllTaskDocumentsWithAssignedEmployeeByIdQuery(userDetails.employeeId);
const [loading, setLoading] = useState(false);
const [taskDocumentList, setTaskDocumentList] = useState<taskDocumentAssignedEmployeeBaseModel[]>([])

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
            !loading && taskDocumentList ? <DocumentAssignedTable documentList={taskDocumentList}/> :<MainLoader/>
        }
    </div>
)


}

export default DocumentAssignedByQuery