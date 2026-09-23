// import React, { useEffect, useState } from 'react'

//  interface props{
//   empId:number,
//   deptId:number,
//   shiftId:number
// }
// function LoginQuery({empId, deptId,shiftId}:props) {


//     // const {data, isLoading, } = useGetEmployeeByDateIdQuery(empId ?? 0);
//     // const [attendanceData, setAttendanceData] = useState<EmployeeModel | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [getShiftId, setGetShiftId] = useState(0);

//   useEffect(() => {
//       setLoading(true);
//       setGetShiftId(shiftId);
//       //console.log(data);
//       if(data?.result != null){
     
//           setAttendanceData(data.result);
         
//           //console.log(data.result);
//       }
//       //console.log(data.result);
//       setLoading(false);
//     },[data])
//   return (
//     <div>
//         {
//             //   !loading ? <AttendanceLoginTable attendanceData={attendanceData} 
//             //   eId={empId} shiftId={getShiftId} deptId={deptId}/>:<Loader/>
//         }
//     </div>
//   )
// }

// export default LoginQuery