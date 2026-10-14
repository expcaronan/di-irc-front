import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useGetApprovalCountQuery } from '../../Api/taskDocumentApi';
import EmployeeUserModel from '../../Interfaces/EmployeeUserModel';
import signalRService from '../../Helpers/SignalR/SignalRService';
import MainLoader from '../Common/MainLoader';
import apiResponse from '../../Interfaces/apiResponse';
interface props{
  roleId?:number
  departmentId?:number
  empId?:number 
}

function Home({roleId,departmentId,empId}:props) {
  
const [noBioCount, setNoBioCount] = useState<number>(0);
const [approvalCount, setApprovalCount] = useState<number>(0);
const [iParam, setIParam] = useState("");
const { data, isLoading} = useGetApprovalCountQuery(
  { deptId:departmentId ?? 0,
    empId:empId ?? 0
  });
const [loading, setLoading] = useState(false);



useEffect(() => {
  const handleMessage = (message: any) => {
    //console.log(message);
    if (message?.message === "TaskDocumentStatusIsApprovedCount" && message?.departmentId == departmentId) {
         //console.log(message);
        setApprovalCount(p => p + Number(message.taskCount))
        setNoBioCount(p => p + Number(message.bioCount))
         //console.log(Number(message.documentId));
    }else{
         return;
    }
  };
  signalRService.onReceiveMessageCount(handleMessage);
   return () => {
    //signalRService.stopConnection();
  };
}, [approvalCount]);

useEffect(() => {
    if (!isLoading && data) {
      //console.log(data.result);
        setApprovalCount(data.result.approvalCount);
        setNoBioCount(data.result.noBioCount);
    }
}, [data, isLoading]);

return (
<div className='container '>   
{
  !isLoading ?  <Sidebar roleId={roleId ?? 0} 
                        approvalCount={Number(approvalCount)} 
                        noBioCount={Number(noBioCount)}
                        /> : <MainLoader/>
} 
</div>
)
}

export default Home