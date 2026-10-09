import React from 'react'
import CreateTask from '../../Components/Page/Task/CreateTask'
interface props{
  employeeId:number
  empToken:string
}
function HomeCreateTask({employeeId,empToken}:props) {
  return (
    <div>
      <CreateTask employeeId={employeeId} empToken={empToken}/>
    </div>
  )
}

export default HomeCreateTask