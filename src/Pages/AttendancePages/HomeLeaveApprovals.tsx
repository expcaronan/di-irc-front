import React from 'react'
import EmployeeUserModel from '../../Interfaces/EmployeeUserModel'
import LeaveForApprovalsQuery from '../../Components/Page/AttendancePage/LeaveApprovals/LeaveForApprovalsQuery'
interface props{
    userDetails:EmployeeUserModel
}
function HomeLeaveApprovals({userDetails}:props) {
  return (
    <div>
      <LeaveForApprovalsQuery userDetails={userDetails}/>
    </div>
  )
}

export default HomeLeaveApprovals