import React, { useEffect, useState } from 'react'
import EmployeeUserModel from '../../../../Interfaces/EmployeeUserModel'
import { useGetLeaveStatusByEmpIdQuery } from '../../../../Api/leaveApplicationApi';
import leaveApplicationModel from '../../../../Interfaces/BaseModel/leaveApplicationModel';
import MainLoader from '../../../Common/MainLoader';
import LeaveStatusTable from './LeaveStatusTable';
import signalRService from '../../../../Helpers/SignalR/SignalRService';
interface props{
    userDetails:EmployeeUserModel
}
function LeaveStatusQuery({userDetails}:props) {

    const [loading, setLoading] = useState(false);
    const [leaveData, setLeaveData] = useState<leaveApplicationModel[]>([])
    const {data, isLoading, refetch} = useGetLeaveStatusByEmpIdQuery(userDetails.employeeId);
    useEffect(() => {
    const handleMessage = (message: any) => {
       console.log("Received message:", message);
      if (message?.message == "SendMessageForLeaveApprovalUpdate") {
          //console.log("refetch update")
          refetch();
      }
    };
    signalRService.onReceiveMessageLeaveApprovalUpdate(handleMessage);
    return () => {
      //signalRService.stopConnection();
  };
}, [refetch]);

    useEffect(() =>{
        setLoading(true);
        if(data){
          setLeaveData(data.result);
        }
        setLoading(false);
    },[data])

  return (
    <div>
        {
            loading ? <MainLoader/> : <LeaveStatusTable userDetails={userDetails} leaveData={leaveData}/>
        }
    </div>
  )
}

export default LeaveStatusQuery