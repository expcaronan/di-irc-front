import React from 'react'
import EmployeeUserModel from '../../Interfaces/EmployeeUserModel'
import LeaveStatusQuery from '../../Components/Page/AttendancePage/LeavePage/LeaveStatusQuery'
interface props{
    userDetails:EmployeeUserModel
}
function HomeLeaveStatus({userDetails}:props) {
  return (
    <div>
        <LeaveStatusQuery userDetails={userDetails}/>
    </div>
  )
}

export default HomeLeaveStatus