import React, { useEffect, useState } from 'react'
import { useGetEmpUserListQuery } from '../../../../Api/userEmpApi';
import EmployeeUserModel from '../../../../Interfaces/EmployeeUserModel';
import TaskForm from './TaskForm';
import { MainLoader } from '../../../Common/Index';
interface props{
    employeeId:number
}
function UserEmpQuery({employeeId}:props) {
    const[loading, setLoading] = useState(false);
    const{data, isLoading} = useGetEmpUserListQuery(null);
    const[dropdownListData, setDropdownListData] = useState<EmployeeUserModel[]>([]);
    useEffect(() =>{

        if(data && !isLoading){
            setDropdownListData(data.result)
        }
    })

  return (
    <div>
        { 
        !loading && dropdownListData ? <TaskForm employeeId={employeeId} dropdownListData={dropdownListData}/>:<MainLoader/>
        }
    </div>
  )
}

export default UserEmpQuery