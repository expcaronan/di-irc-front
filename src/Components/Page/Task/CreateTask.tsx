import React, { useEffect, useState } from 'react'
import CreateTaskTable from './CreateTaskTable'
import { useGetAllTaskDocumentsWithAssignedEmployeeCreatedByQuery } from '../../../Api/taskDocumentApi';
import { taskDocumentBaseModel } from '../../../Interfaces/BaseModel/taskDocumentBaseModel';
import MainLoader from '../../Common/MainLoader';
interface props{
  employeeId:number
}
function CreateTask({employeeId}:props) {
  const {
    data,
    isLoading
  } = useGetAllTaskDocumentsWithAssignedEmployeeCreatedByQuery(employeeId);

  const [taskDocumentList, setTaskDocumentList] =
    useState<taskDocumentBaseModel[]>([]);

  useEffect(() => {
    if (data && !isLoading) {
      setTaskDocumentList(data.result);
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div>
       <CreateTaskTable
        taskDocumentList={taskDocumentList}
      />
    </div>
  )
}

export default CreateTask