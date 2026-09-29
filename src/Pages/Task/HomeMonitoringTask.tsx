import React from 'react'
import EmployeeUserModel from '../../Interfaces/EmployeeUserModel'
import DocumentAssignedByQuery from '../../Components/Page/Task/HomeMonitoringPage/DocumentAssignedByQuery'
interface props{
    userDetails:EmployeeUserModel
}
function HomeMonitoringTask({userDetails}:props) {
  return (
    <div>
      <DocumentAssignedByQuery userDetails={userDetails}/>
    </div>
  )
}

export default HomeMonitoringTask