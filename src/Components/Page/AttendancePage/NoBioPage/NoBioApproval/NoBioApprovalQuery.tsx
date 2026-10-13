import React, { useEffect, useState } from 'react'
import MainLoader from '../../../../Common/MainLoader';
import { attendanceWithEmp } from '../../../../../Interfaces/attendanceWithEmp';
import { useGetAttendanceNoBioQuery } from '../../../../../Api/attendanceApi';
import NoBioApprovalTable from './NoBioApprovalTable';
import signalRService from '../../../../../Helpers/SignalR/SignalRService';

interface props{
  deptId:number,
  empId:number  
}
function NoBioApprovalQuery({deptId, empId}:props) {
  
      const {data, isLoading, refetch} = useGetAttendanceNoBioQuery({
            deptId:deptId,
            empId:empId,
      });
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

        
        useEffect(() => {
          const handleMessage = (message: any) => {
            // console.log(message);
            if (message?.message === "EmployeeNoBio") {
                refetch()
            }else{
                 return;
            }
          };
          signalRService.onReceiveMessage(handleMessage);
          return () => {
            //signalRService.stopConnection();
          };
          //console.log("signalk"+taskDocumentList);
        }, [refetch]);
        

  return (
    <div>
        {
              !loading ? <NoBioApprovalTable attendanceData={attendanceData}/>:<MainLoader/>
        }
    </div>
  )
}

export default NoBioApprovalQuery