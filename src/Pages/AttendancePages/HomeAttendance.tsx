import React from 'react'
import AttendanceQuery from '../../Components/Page/AttendancePage/AttendanceQuery'

interface props{
  empId:number,
 
}
function HomeAttendance({empId}:props) {
 
  return (
    <div><AttendanceQuery empId={empId} /></div>
  )
}

export default HomeAttendance