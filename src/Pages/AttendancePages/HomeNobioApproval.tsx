import React from 'react'
import NoBioApprovalQuery from '../../Components/Page/AttendancePage/NoBioPage/NoBioApproval/NoBioApprovalQuery'

interface props{
  deptId:number
}
function HomeNoBioApproval({deptId}:props) {
  return (
    <div><NoBioApprovalQuery deptId={deptId}/></div>
  )
}

export default HomeNoBioApproval