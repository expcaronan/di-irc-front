import React from 'react'
import CreateTask from '../../Components/Page/Task/CreateTask'
interface props{
  employeeId:number
  empToken:string
  deptId:number
  designationName:string
}
function HomeCreateTask({employeeId,empToken, deptId,designationName}:props) {
  console.log(designationName);
  return (
    <div>
      <CreateTask employeeId={employeeId} empToken={empToken} deptId={deptId} designationName={designationName}/>
    </div>
  )
}

export default HomeCreateTask