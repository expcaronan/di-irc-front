import React, { useEffect, useState } from 'react'
import MainLoader from '../../../../Common/MainLoader';
import { attendanceWithEmp } from '../../../../../Interfaces/attendanceWithEmp';
import { useGetAttendanceNoBioQuery } from '../../../../../Api/attendanceApi';
import NoBioApprovalTable from './NoBioApprovalTable';

interface props{
  deptId:number
}
function NoBioApprovalQuery({deptId}:props) {
  
      const {data, isLoading, } = useGetAttendanceNoBioQuery(deptId);
        const [attendanceData, setAttendanceData] = useState<attendanceWithEmp[]>([]);
        const [loading, setLoading] = useState(false);
    
      useEffect(() => {
          setLoading(true);
          
          if(data){
         
              setAttendanceData(data.result);
              //console.log(data.result);
          }
          
          setLoading(false);
        },[data])

  return (
    <div>
        {
              !loading ? <NoBioApprovalTable attendanceData={attendanceData}/>:<MainLoader/>
        }
    </div>
  )
}

export default NoBioApprovalQuery