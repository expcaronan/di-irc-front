import React, { useEffect, useState } from 'react'
import EmployeeUserModel from '../../../../Interfaces/EmployeeUserModel'
import { useGetLeaveStatusByEmpIdQuery } from '../../../../Api/leaveApplicationApi';
import leaveApplicationModel from '../../../../Interfaces/BaseModel/leaveApplicationModel';
import MainLoader from '../../../Common/MainLoader';
import LeaveStatusTable from './LeaveStatusTable';
interface props{
    userDetails:EmployeeUserModel
}
function LeaveStatusQuery({userDetails}:props) {

    const [loading, setLoading] = useState(false);
    const [leaveData, setLeaveData] = useState<leaveApplicationModel[]>([])
    const {data, isLoading, refetch} = useGetLeaveStatusByEmpIdQuery(userDetails.employeeId);

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