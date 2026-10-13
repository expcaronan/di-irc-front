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
import signalRService from '../../../../Helpers/SignalR/SignalRService';
import sMessage from '../../../../Helpers/SignalR/sMessage';
interface props{
    userDetails:EmployeeUserModel
    notificationList:notifiedUserBaseModel[]
    accessToken:string
}
function DocumentAssignedByQuery({userDetails, notificationList, accessToken}:props) {
//console.log(userDetails.employeeId);
const { data, isLoading } = useGetAllTaskDocumentsWithAssignedDepartmentByIdQuery(userDetails.departmentId);
const [loading, setLoading] = useState(false);
const [taskDocumentList, setTaskDocumentList] = useState<taskDocumentAssignedDepartmentBaseModel[]>([])


useEffect(() => {
  const handleMessage = (message: any) => {
    //console.log(message);
    if (message?.message === "TaskDocument") {
        const taskList = message.data as taskDocumentAssignedDepartmentBaseModel;

    setTaskDocumentList(previous => [
      taskList,
      ...previous.filter(item => item.id !== taskList.id)
    ]);
      
    }else{
      return;
    }
    // console.log(message.data);
 

  signalRService.onReceiveMessage(handleMessage);
  console.log("signalk"+taskDocumentList);
  return () => {
    signalRService.stopConnection();
  };
  }
}, []);

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
            !loading && taskDocumentList ? <DocumentAssignedCompare 
            documentList={taskDocumentList} 
            notificationList={notificationList} 
            userDetails={userDetails}
            accessToken={accessToken}/> :<MainLoader/>
        }
    </div>
)


}

export default DocumentAssignedByQuery