import React from 'react'
import LoginQuery from '../../Components/Page/AttendancePage/LoginQuery'

interface props{
   empId:number,

}

function HomeLogin({empId}:props) {
  return (
    <div>
        <div><LoginQuery empId={empId}/></div>
    </div>
    // <div><LoginQuery empId={empId} deptId={deptId} shiftId={shiftId}/></div>
  )
}

export default HomeLogin