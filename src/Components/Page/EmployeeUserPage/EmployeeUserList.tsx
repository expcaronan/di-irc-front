import React, { useEffect, useState } from 'react'
import { useGetEmpUserListQuery } from '../../../Api/userEmpApi';
import { employeeUserBaseModel } from '../../../Interfaces/BaseModel/employeeUserBaseModel';
import MainLoader from '../../Common/MainLoader';
import EmployeeUserTable from './EmployeeUserTable';

function EmployeeUserList() {


const{data, isLoading} = useGetEmpUserListQuery(null);
const [empUserData, setEmpUserData] = useState<employeeUserBaseModel[]>([])
const [loading, setLoading] = useState(false);


useEffect(() =>{
    setLoading(true);
    if(data && !isLoading){
      setEmpUserData(data.result);
    }
    setLoading(false);
});


  return (
    <div>
        { 
        !loading && empUserData ? <EmployeeUserTable empUserList={empUserData}/>:<MainLoader/>
        }
    </div>
  )
}

export default EmployeeUserList