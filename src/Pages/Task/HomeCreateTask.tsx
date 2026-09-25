import React from 'react'
import CreateTask from '../../Components/Page/Task/CreateTask'
interface props{
  employeeId:number
}
function HomeCreateTask({employeeId}:props) {
  return (
    <div>
      <CreateTask employeeId={employeeId}/>
    </div>
  )
}

export default HomeCreateTask