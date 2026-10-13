import React, { useEffect, useState } from 'react'
import EmployeeUserModel from '../../../../Interfaces/EmployeeUserModel'
import { useGetAllApprovedTaskDocumentsWithAssignedDepartmentByIdQuery } from '../../../../Api/taskDocumentApi';
import { taskDocumentAssignedDepartmentBaseModel } from '../../../../Interfaces/BaseModel/taskDocumentAssignedDepartmentBaseModel';
import signalRService from '../../../../Helpers/SignalR/SignalRService';
import DocumentApprovedTable from './DocumentApprovedTable';
interface props{
  userDetails:EmployeeUserModel
  empToken:string
}
function DocumentApprovedQuery({userDetails,empToken}:props) {
const { data, isLoading } = useGetAllApprovedTaskDocumentsWithAssignedDepartmentByIdQuery(userDetails.departmentId);
const [loading, setLoading] = useState(false);
const [taskDocumentList, setTaskDocumentList] = useState<taskDocumentAssignedDepartmentBaseModel[]>([])



useEffect(() => {
  const handleMessage = (message: any) => {
    console.log(message);

    if (message?.message !== "TaskDocumentApproved") {
      return;
    }

    const taskList = message.data as taskDocumentAssignedDepartmentBaseModel;

    setTaskDocumentList(previous => [
      taskList,
      ...previous.filter(item => item.id !== taskList.id)
    ]);
  };

  // Register the SignalR message handler
  signalRService.onReceiveMessage(handleMessage);

  return () => {
    // Clean up when the component unmounts
    signalRService.stopConnection();
  };
}, [taskDocumentList]);


useEffect(() =>{
    setLoading(true);
    if(data && !isLoading){
        setTaskDocumentList(data.result);
    }
    setLoading(false);
},[data]);


  return (
    <div>
            <DocumentApprovedTable
                documentList={taskDocumentList}
                employeeId={userDetails.employeeId}

            />
    </div>
  )
}

export default DocumentApprovedQuery