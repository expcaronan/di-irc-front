import React, { useEffect, useState } from 'react'
import EmployeeUserModel from '../../../../Interfaces/EmployeeUserModel';
import TaskForm from './TaskForm';
import { MainLoader } from '../../../Common/Index';
import { useGetDeptRrsOfficeDropdownListQuery } from '../../../../Api/taskDocumentApi';
import taskDocumentDropdown from '../../../../Interfaces/taskDocumentDropdown';
interface props{
    employeeId:number
}
function UserEmpQuery({employeeId}:props) {
    const[loading, setLoading] = useState(false);
    const{data, isLoading} = useGetDeptRrsOfficeDropdownListQuery(null);
    const[dropdownListData, setDropdownListData] = useState<taskDocumentDropdown>();
    useEffect(() =>{

        if(data && !isLoading){
            //console.log(data.result);
            setDropdownListData(data.result)
        }
    })

  return (
    <div className='container-fluid pb-5 mb-3'>
        { 
        !loading && dropdownListData ? <TaskForm employeeId={employeeId} dropdownListData={dropdownListData}/>:<MainLoader/>
        }
    </div>
  )
}

export default UserEmpQuery