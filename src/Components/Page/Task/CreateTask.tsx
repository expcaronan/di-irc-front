import React, { useEffect, useState } from 'react'
import CreateTaskTable from './CreateTaskTable'

import { taskDocumentBaseModel } from '../../../Interfaces/BaseModel/taskDocumentBaseModel';
import MainLoader from '../../Common/MainLoader';
import { useGetAllTaskDocumentsWithAssignedDepartmentCreatedByQuery } from '../../../Api/taskDocumentApi';
import signalRService from '../../../Helpers/SignalR/SignalRService';
interface props{
  employeeId:number
  empToken:string
  deptId:number
}
function CreateTask({employeeId,empToken,deptId}:props) {
  const {data,isLoading, refetch} = useGetAllTaskDocumentsWithAssignedDepartmentCreatedByQuery(deptId);
  const [taskDocumentList, setTaskDocumentList] = useState<taskDocumentBaseModel[]>([]);

  useEffect(() => {
    if (data && !isLoading) {
      //console.log(data.result);
      setTaskDocumentList(data.result);
    }
  }, [data, isLoading]);


useEffect(() => {
  const handleMessage = (message: any) => {
    console.log(message);
    if (message?.message === "TaskDocumentStatusIsApproved" && message?.departmentId == deptId) {
        refetch()
    }else{
         return;
    }
  };
  signalRService.onReceiveMessage(handleMessage);
  return () => {
    //signalRService.stopConnection();
  };
  //console.log("signalk"+taskDocumentList);
}, [refetch]);


  
if (isLoading) {
  return <MainLoader />; 
}


  return (
    <div >
       <CreateTaskTable
        taskDocumentList={taskDocumentList}
        employeeId={employeeId}
        empToken={empToken}
        deptId={deptId}
      />
    </div>
  )
}

export default CreateTask