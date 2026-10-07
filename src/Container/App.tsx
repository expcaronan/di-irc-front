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
import HomeLogin from '../Pages/AttendancePages/HomeLogin';
import { jwtDecode } from 'jwt-decode';
import EmployeeUserModel from '../Interfaces/EmployeeUserModel';
import HomeRegisterUser from '../Pages/HomeRegisterUser';
import HomeEmployeeUser from '../Pages/HomeEmployeeUser';
import HomeCreateTask from '../Pages/Task/HomeCreateTask';
import TaskForm from '../Components/Page/Task/Actions/TaskForm';
import UserEmpQuery from '../Components/Page/Task/Actions/UserEmpQuery';
import HomeMonitoringTask from '../Pages/Task/HomeMonitoringTask';
import TaskFormAddDepartmentQuery from '../Components/Page/Task/Actions/TaskFormAddDepartmentQuery';
import HomeUpdateUser from '../Pages/HomeUpdateUser';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedJsonString = localStorage.getItem('Credentials');
  const hasLocalStorageData = !!localStorage.getItem('Credentials');
  const[shiftId, setShiftId] = useState(0);
  const[deptId, setDeptId] = useState(0);
  const [getRoleId, setGetRoleId] = useState(0);
  const[employeeId, setEmployeeId]=useState(0);
  const[userDetails, setUserDetails]=useState<EmployeeUserModel>();
  
  useEffect(() => {
    //console.log(isLoggedIn);
    var userRoleId =0;
    if (hasLocalStorageData) {
      if (storedJsonString !== null) {
        const storedJsonData= jwtDecode<EmployeeUserModel>(storedJsonString);
        userRoleId = storedJsonData.roleId;
      setUserDetails({
        employeeId:storedJsonData.employeeId,
        lastName:storedJsonData.lastName,
        firstName:storedJsonData.firstName,
        roleName:storedJsonData.roleName,
        roleId:storedJsonData.roleId,
        designationName:storedJsonData.designationName,
        designationId:storedJsonData.designationId,
        departmentName:storedJsonData.departmentName,
        departmentId:storedJsonData.departmentId,
        rankId:storedJsonData.rankId,
        rankName:storedJsonData.rankName,
        email:storedJsonData.email,
        userName:storedJsonData.userName,
      });
       // console.log(storedData);
       // const storedJsonData  = JSON.parse(storedData); 
      //console.log(storedJsonData);
       setEmployeeId(storedJsonData.employeeId);
       //setShiftId(storedJsonData.shiftId);
       setDeptId(storedJsonData.departmentId);
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
        
         if(userRoleId == 3){
                 navigate("/"); 
            }else{
              //console.log("id"+userRoleId)
               navigate("/task/document/list");
          }
        
        // navigate("/login");
      }
    }else{
      setIsLoggedIn(false)
      navigate("/login");
     
    }
  }, [storedJsonString,hasLocalStorageData]); 
 
  
  return (
    <div className="App">
     {/* <div className="text-primary"> */}
       <ToastContainer />  
       {!isLoggedIn && 
         <Routes>
        <>
            {/* <Route path="/" element= {<HomeLogin  empId={employeeId} deptId={deptId}  shiftId={shiftId}/>} /> */}
            {/* <Route
              path="/"
              element={userDetails ? <HomeMonitoringTask userDetails={userDetails} /> : null}
            /> */}
            
            <Route path="/login" element={<Login onLogin={isLoggedIn} />} />
            <Route path="user/register" element={<HomeRegisterUser/>} />
        </>
      
        </Routes>
        }
        
      {isLoggedIn && (
            <>
          <Home roleId={getRoleId}/>
      <HeaderNew />
     
        <main className="page-content d-flex flex-column flex-row-fluid">
        {/* <div className="page-content-body"> */}
        <Routes>
          <Route path="/employee/list" element={<HomeEmployeeUser/>} />  
          <Route path="/task/document/list" element={<HomeCreateTask employeeId={employeeId}/>} /> 
          <Route path="/task/create/form" element={<UserEmpQuery employeeId={employeeId}/>} />
          <Route path="/task/create/assignedDepartment" element={<TaskFormAddDepartmentQuery/>} />           
          <Route path="*" element= {<NotFound/>} />
          <Route
              path="/" element={userDetails && <HomeMonitoringTask userDetails={userDetails} /> }
          />
          <Route path="/user/update" element={<HomeUpdateUser/>} />
          <Route path="/homelogin" element= {<HomeLogin empId={employeeId}/>} />   
        </Routes>
        {/* </div> */}
      </main>
      <Footer />
            </>
          )}
     
    </div>
  );
}

export default App;


