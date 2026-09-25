import React, { useEffect, useState } from 'react'
import CreateTaskTable from './CreateTaskTable'
import { useGetAllTaskDocumentsWithAssignedEmployeeQuery } from '../../../Api/taskDocumentApi';
import { taskDocumentBaseModel } from '../../../Interfaces/BaseModel/taskDocumentBaseModel';
import MainLoader from '../../Common/MainLoader';
interface props{
  employeeId:number
}
function CreateTask({employeeId}:props) {
  const{data, isLoading} = useGetAllTaskDocumentsWithAssignedEmployeeQuery(employeeId);
  const [loading, setLoading] = useState(false);
  const [taskDocumentList, setTaskDocumentList] = useState<taskDocumentBaseModel[]>([])
  useEffect(() =>{
      setLoading(true);
      if(data && !isLoading){
        setTaskDocumentList(data.result);
      }
      setLoading(false);
  });
  return (
    <div>
      <div>
        { 
        !loading && taskDocumentList ? <CreateTaskTable taskDocumentList={taskDocumentList}/>:<MainLoader/>
        }
    </div>
    </div>
  )
}

export default CreateTask