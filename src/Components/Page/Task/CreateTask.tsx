import React, { useEffect, useState } from 'react'
import CreateTaskTable from './CreateTaskTable'

import { taskDocumentBaseModel } from '../../../Interfaces/BaseModel/taskDocumentBaseModel';
import MainLoader from '../../Common/MainLoader';
import { useGetAllTaskDocumentsWithAssignedDepartmentCreatedByQuery } from '../../../Api/taskDocumentApi';
interface props{
  employeeId:number
}
function CreateTask({employeeId}:props) {
  const {
    data,
    isLoading
  } = useGetAllTaskDocumentsWithAssignedDepartmentCreatedByQuery(employeeId);

  const [taskDocumentList, setTaskDocumentList] =
    useState<taskDocumentBaseModel[]>([]);

  useEffect(() => {
    if (data && !isLoading) {
      //console.log(data.result);
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
        employeeId={employeeId}
      />
    </div>
  )
}

export default CreateTask