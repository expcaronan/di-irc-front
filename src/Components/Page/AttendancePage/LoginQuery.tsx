import React, { useEffect, useState } from 'react'
import EmployeeUserModel from '../../../Interfaces/EmployeeUserModel';
import AttendanceLoginTable from './AttendanceLoginTable';
import MainLoader from '../../Common/MainLoader';
import { useGetEmployeeByDateIdQuery } from '../../../Api/attendanceApi';


 interface props{
  empId:number,
}
function LoginQuery({empId}:props) {


    const {data, isLoading, } = useGetEmployeeByDateIdQuery(empId ?? 0);
    
    const [attendanceData, setAttendanceData] = useState<EmployeeUserModel | null>(null);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
      setLoading(true);
     
      //console.log(data);
      if(data?.result != null){
     
          setAttendanceData(data.result);
         
          //console.log(data.result);
      }
      //console.log(data.result);
      setLoading(false);
    },[data])
  return (
    <div>
        {
              !loading ? <AttendanceLoginTable attendanceData={attendanceData} 
              eId={empId}/>:<MainLoader/>
        }
    </div>
  )
}

export default LoginQuery