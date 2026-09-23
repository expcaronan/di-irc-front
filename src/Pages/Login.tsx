import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../Api/authApi';
import { useDispatch } from 'react-redux';
import { MainLoader } from '../Components/Common/Index';
import { toast } from "react-toastify";
import inputHelper from '../Helpers/inputHelper';
import apiResponse from '../Interfaces/apiResponse';
import { setLoggedInUser } from '../Storage/Slice/userAuthSlice';

interface props{
    onLogin: boolean
}


function Login({onLogin}: props) {

 
  const hasLocalStorageData = !!localStorage.getItem('Credentials');

  const navigate = useNavigate();
  useEffect(() => {
    if(hasLocalStorageData){
      navigate('/homelogin');
    }
  }, []); 
 

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();


  const [userInput,setUserInput] = useState({
    userName:"",
    passwordHash:"",
  });
  // const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
  //   const tempData = inputHelper(e,userInput);
  //   setUserInput(tempData);
  //   setUserInputRegister(tempData);
  // }
  const handleUserInputLog = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const tempData = inputHelper(e,userInput);
    setUserInput(tempData);
   
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setLoading(true);
    const response: apiResponse = await loginUser({
        userName: userInput.userName,
        passwordHash: userInput.passwordHash,
    });
    console.log(userInput);
    if(response.data?.isSuccess == true){
     
      const jsonString = JSON.stringify(response.data.result);
      localStorage.setItem("Credentials",jsonString);
      const storedJsonData = JSON.parse(jsonString);
      //console.log(response.data.result);
   
      dispatch(setLoggedInUser({
                    firstName: storedJsonData.firstName,
                    lastName: storedJsonData.lastName,
                    department: storedJsonData.departmentName,
                    roleName: storedJsonData.roleName,  
                    userName:storedJsonData.userName,
                    rankName:storedJsonData.rankName,
                    designationName: storedJsonData.designationName, // typo preserved if backend sends "postitionName"
                    employeeId: storedJsonData.id
                   }))

    toast.success(
    `${storedJsonData.firstName} ${storedJsonData.lastName}: Login Successfully!`,
    {
        position: "top-right",
        autoClose: 5000,
    }
    );
    navigate("/");    
    }else if(response.data?.isSuccess == false) {
     
      toast.warning('invalid password or username!', {
        position: "top-right", 
        autoClose: 5000, 
      });
      setError(response.error);
    }
    setLoading(false);
    
  } 
 
//   const handleVerify = async () => {
//     navigate(`/register/${userInputRegister.empID}`); 
// }
  
  return (





<div className="d-flex flex-column flex-root" data-bs-theme-value="dark">
            {/* <!--Page--> */}
            <div className="page d-flex flex-row flex-column-fluid">
                
                {/* <!--///////////Page content wrapper///////////////--> */}
                <main className="page-content overflow-hidden ms-0 d-flex flex-column flex-row-fluid">

                    {/* <!--//content//--> */}
                    <div className="content p-1 d-flex flex-column-fluid position-relative">
                        <div className="container py-4">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-md-8 col-lg-5 col-xl-4">
                                    {/* <!--Logo--> */}
                                    {/* <a href="index.html"
                                        className="d-flex position-relative mb-4 z-1 align-items-center justify-content-center">
                                        <span className="sidebar-icon size-60 bg-gradient-primary text-white rounded-3">
                                            <b className="fw-bolder fs-3"></b>
                                        </span>
                                    </a> */}
                                    {/* <!--Card--> */}
                                    <div className="card card-body p-4">
                                        <h4 className="text-center text-primary">Welcome Back!</h4>
                                        <p className="mb-4 text-body-secondary text-center">
                                            Please Sign In with details...
                                        </p>
                                        <form method="post" onSubmit={handleSubmit} className=" z-1 position-relative needs-validation" >
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" required
                                                 name="userName"
                                                 value={userInput.userName}
                                                 onChange={handleUserInputLog}
                                                 placeholder="User Name" />

                                                <label htmlFor="floatingInput">UserName</label>
                                                <span className="invalid-feedback">Please enter a valid User Name</span>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input type="password" required className="form-control"
                                                   placeholder="Password"
                                                   name="passwordHash"
                                                   value={userInput.passwordHash}
                                                   onChange={handleUserInputLog}
                                                   />
                                                <label htmlFor={"floatingPassword"}>Password</label>
                                                <span className="invalid-feedback">Enter the password</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                {/* <div className="form-check">
                                                    <input className="form-check-input me-1" id="terms" type="checkbox"
                                                        value=""/>
                                                    <label className="form-check-label" htmlFor="terms">Remember Me</label>
                                                </div> */}
                                                <div>
                                                    {/* <a href="page-auth-recover-pass.html" className="small">Forget Password?</a> */}
                                                </div>
                                            </div>
                                            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign In</button>
                                            <hr className="mt-4 mb-3"/>
                                           
                                            <div className="d-flex align-items-center pb-3">

                                            <button className="w-100 btn btn-lg" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                                                Register Here
                                            </button>
                                                {/* <span
                                                    className="d-inline-flex align-items-center justify-content-center lh-1 size-30 rounded-circle text-mono"></span> */}
                                               
                                            </div>
                                            <div className="d-grid">
                                               
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                   
                </main>
            </div>


<div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">    
        <h1 className="modal-title fs-5" id="exampleModalLabel">Details</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label htmlFor="first-name" className="col-form-label">First Name:</label>
            <input type="text" className="form-control" id="first-name" />
          </div>
          <div className="mb-3">
            <label htmlFor="last-name" className="col-form-label">Last Name:</label>
            <input type="text" className="form-control" id="last-name" />
          </div>
          {/* <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">Message:</label>
            <textarea className="form-control" id="message-text"></textarea>
          </div> */}
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Send message</button>
      </div>
    </div>
  </div>
</div>
            {/* end */}
        </div>


//     <div className="container text-center">
     
  
//     <section className="vh-100">
//   <div className="d-flex align-items-center flex-column mt-5">
//   {loading && <MainLoader/>}
//     <div className="row">
//       <div className="col-sm-12 text-black">

//           <form style={{width: "30rem"}}  method="post" onSubmit={handleSubmit}>

//             <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}} >  Web Attendance Tool </h3>

//             <div data-mdb-input-init className="form-outline mb-4">
//               <input type="text" id="form2Example18" className="form-control form-control-lg" 
//                placeholder="Employee Id"
//                required
//                name="employeeId"
//                value={userInput.employeeId}
//                onChange={handleUserInputLog}
//                 />
//               <label className="form-label" htmlFor="form2Example18"
              
//               >Employee Id</label>
//             </div>

//             <div data-mdb-input-init className="form-outline mb-4">
//               <input type="password" id="form2Example28" className="form-control form-control-lg" 
//                placeholder="Enter Password"
//                required
//                name="passwordHash"
//                value={userInput.passwordHash}
//                onChange={handleUserInputLog}
//               />
//               <label className="form-label" htmlFor="form2Example28">Password</label>
//             </div>

//             <div className="pt-1 mb-4">
//               <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-info btn-lg btn-block">Login</button>
//             </div>

//             {/* <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p> */}
//             <p>Don't have an account? <a type="button" className="link-info"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Register here</a></p>

//           </form>

//         {/* </div> */}

//       </div>
    
//     </div>
    
//   </div>
// </section>
// <>
     


//      {/* <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
//        <div className="modal-dialog">
//          <div className="modal-content">
//            <div className="modal-header">
//              <h1 className="modal-title fs-5" id="staticBackdropLabel">Verify your NTLogin or Employee ID</h1>
//              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//            </div>
//            <div className="modal-body">
//            <div className="modal-body">
//                          <input type="text" className="form-control" required
//                                                         name='empID'
//                                                         value={userInputRegister.empID}
//                                                         onChange={handleUserInput}
//                                                         />
//                      </div>
//            </div>
//            <div className="modal-footer">
//              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//              <button type="button" className="btn btn-primary" onClick={() => handleVerify()} data-bs-dismiss="modal">Verify</button>
//            </div>
//          </div>
//        </div>
//      </div>
//       */}
     
//            </>



//   </div>
  )
}

export default Login