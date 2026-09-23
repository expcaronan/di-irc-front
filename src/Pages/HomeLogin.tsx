import React from 'react'

interface props{
  empId:number,
   deptId:number,
   shiftId:number
}

function HomeLogin({empId,deptId,shiftId}:props) {
  return (
    <div>
        <h1>Home Login Page</h1>
    </div>
    // <div><LoginQuery empId={empId} deptId={deptId} shiftId={shiftId}/></div>
  )
}

export default HomeLogin