import React, { useEffect, useState } from 'react'
import CreateTaskTable from './CreateTaskTable'
import { useGetAllTaskDocumentsWithAssignedEmployeeQuery } from '../../../Api/taskDocumentApi';
interface props{
  employeeId:number
}
function CreateTask({employeeId}:props) {
  const{data, isLoading} = useGetAllTaskDocumentsWithAssignedEmployeeQuery(employeeId);
  const [loading, setLoading] = useState(false);
  const [taskDocumentList, setTaskDocumentList] = useState<any[]>([])
  useEffect(() =>{
      setLoading(true);
      if(data && !isLoading){
        //setEmpUserData(data.result);
      }
      setLoading(false);
  });
  return (
    <div>
      <CreateTaskTable/>
    </div>
  )
}

export default CreateTask