import React, { useEffect, useState } from 'react'
import dropdownListDto from '../Interfaces/dropdownListDto';
import { useGetEmpDetailsDropdownListQuery } from '../Api/userEmpApi';
import RegisterForm from '../Components/Page/RegisterPage/RegisterForm';
import MainLoader from '../Components/Common/MainLoader';


function HomeRegisterUser() {
  
    const [dropdownListData, setDropdownListData] = useState<dropdownListDto>();
    const [loading, setLoading] = useState(false);

const{data, isLoading} = useGetEmpDetailsDropdownListQuery(null);
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
        !loading && dropdownListData ? <RegisterForm dropdownListData={dropdownListData}/>:<MainLoader/>
      }
    </div>
  )
}

export default HomeRegisterUser