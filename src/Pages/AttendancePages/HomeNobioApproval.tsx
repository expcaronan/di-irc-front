import React from 'react'
import NoBioApprovalQuery from '../../Components/Page/AttendancePage/NoBioPage/NoBioApproval/NoBioApprovalQuery'

interface props{
  deptId:number
  empId:number
}
function HomeNoBioApproval({deptId, empId}:props) {
  return (
    <div><NoBioApprovalQuery deptId={deptId} empId={empId}/></div>
  )
}

export default HomeNoBioApproval