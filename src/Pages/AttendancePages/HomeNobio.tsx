import React from 'react'
import NoBioQuery from '../../Components/Page/AttendancePage/NoBioPage/NoBioQuery';

interface props{
  empId:number;
  deptId:number;

}
function HomeNobio({empId,deptId}:props) {
  
  return (
    <div><NoBioQuery empId={empId} deptId={deptId} /></div>
  )
}

export default HomeNobio