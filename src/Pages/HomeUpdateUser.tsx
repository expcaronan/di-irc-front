import React, { useEffect, useState } from 'react'
import dropdownListDto from '../Interfaces/dropdownListDto';
import { useGetEmpDetailsDropdownListQuery } from '../Api/userEmpApi';
import RegisterForm from '../Components/Page/RegisterPage/RegisterForm';
import MainLoader from '../Components/Common/MainLoader';
import { useLocation } from 'react-router-dom';
import UpdateForm from '../Components/Page/EmployeeUserPage/Action/UpdateForm';


function HomeUpdateUser() {
  
const [dropdownListData, setDropdownListData] = useState<dropdownListDto>();
const [loading, setLoading] = useState(false);

const{data, isLoading} = useGetEmpDetailsDropdownListQuery(null);

const location = useLocation();
const { taskDocument } = location.state || {}


useEffect(() =>{
    setLoading(true);
    if(data && !isLoading){
      //console.log(data.result)
      setDropdownListData(data.result);
      //console.log(dropdownListData);
    }
    //console.log(dropdownListData);
    setLoading(false);
},[data])


  return (
    <div>
      { 
        !loading && dropdownListData ? <UpdateForm dropdownListData={dropdownListData} employeeData={taskDocument}/>:<MainLoader/>
      }
    </div>
  )
}

export default HomeUpdateUser