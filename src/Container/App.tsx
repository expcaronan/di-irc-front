import React, { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { setLoggedInUser } from '../Storage/Slice/userAuthSlice';
import Home from '../Components/Layout/Home';
import Footer from '../Components/Layout/Footer';
import HeaderNew from '../Components/Layout/HeaderNew';
import NotFound from '../Pages/NotFound';
import Login from '../Pages/Login';
import HomeLogin from '../Pages/HomeLogin';
import { jwtDecode } from 'jwt-decode';
import EmployeeUserModel from '../Interfaces/EmployeeUserModel';
import HomeRegisterUser from '../Pages/HomeRegisterUser';
import HomeEmployeeUser from '../Pages/HomeEmployeeUser';
import HomeCreateTask from '../Pages/Task/HomeCreateTask';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedJsonString = localStorage.getItem('Credentials');
  const hasLocalStorageData = !!localStorage.getItem('Credentials');
  const [useId, setUseId] = useState(0);
  const[shiftId, setShiftId] = useState(0);
  const[deptId, setDeptId] = useState(0);
  const [getRoleId, setGetRoleId] = useState(0);
 
  
  useEffect(() => {
    //console.log(isLoggedIn);
    if (hasLocalStorageData) {
      if (storedJsonString !== null) {
        const storedJsonData= jwtDecode<EmployeeUserModel>(storedJsonString);
       // console.log(storedData);
       // const storedJsonData  = JSON.parse(storedData); 
        //console.log(storedJsonData);
       setUseId(storedJsonData.employeeId);
       //setShiftId(storedJsonData.shiftId);
       //setDeptId(storedJsonData.departmentId);
       //setGetRoleId(storedJsonData.roleId);
        setIsLoggedIn(true)
              dispatch(setLoggedInUser({
              firstName: storedJsonData.firstName,
                    lastName: storedJsonData.lastName,
                    departmentName: storedJsonData.departmentName,
                    roleName: storedJsonData.roleName,  
                    userName:storedJsonData.userName,
                    rankName:storedJsonData.rankName,
                    designationName: storedJsonData.designationName, // typo preserved if backend sends "postitionName"
                    employeeId: storedJsonData.employeeId
             }))
     
      } else {
        setIsLoggedIn(false)
         navigate("/");
        // navigate("/login");
      }
    }else{
      setIsLoggedIn(false)
      navigate("/login");
     
    }
  }, [storedJsonString,hasLocalStorageData]); 
 
  
  return (
    <div className="text-primary">
       <ToastContainer />  
       {!isLoggedIn && 
         <Routes>
        <>
            <Route path="/" element= {<HomeLogin  empId={useId} deptId={deptId}  shiftId={shiftId}/>} /> 
            <Route path="/login" element={<Login onLogin={isLoggedIn} />} />
            <Route path="user/register" element={<HomeRegisterUser/>} />
        </>
      
        </Routes>
        }
        
      {isLoggedIn && (
            <>
          <Home roleId={getRoleId}/>
      <HeaderNew />
     
      <div className="page-content d-flex flex-column flex-row-fluid">
        <Routes>
          <Route path="employee/list" element={<HomeEmployeeUser/>} />  
          <Route path="task/create" element={<HomeCreateTask/>} />      
          <Route path="*" element= {<NotFound/>} />
   
        </Routes>
      </div>
      <Footer />
            </>
          )}
     
    </div>
  );
}

export default App;


