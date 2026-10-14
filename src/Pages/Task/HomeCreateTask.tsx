import React from 'react'
import CreateTask from '../../Components/Page/Task/CreateTask'
interface props{
  employeeId:number
  empToken:string
  deptId:number
}
function HomeCreateTask({employeeId,empToken, deptId}:props) {
  return (
    <div>
      <CreateTask employeeId={employeeId} empToken={empToken} deptId={deptId}/>
    </div>
  )
}

export default HomeCreateTask