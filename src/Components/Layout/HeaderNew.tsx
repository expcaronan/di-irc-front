import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../Storage/Redux/store';
import EmployeeUserModel from '../../Interfaces/EmployeeUserModel';
import { emptyUserState, setLoggedInUser } from '../../Storage/Slice/userAuthSlice';


function HeaderNew (){
const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData:EmployeeUserModel = useSelector((state:RootState) => state.userAuthStore);
  //console.log(userData  );
  const handleLogout= ()=>{
    localStorage.removeItem("Credentials");
    dispatch(setLoggedInUser({...emptyUserState}))
    navigate("/login")
  }
const [isSidebarOn, setIsSidebarOn] = useState(true);

const toggleSidebar =  (On:boolean) => {
  
  // Rest of your function code
  if (On) {
    //console.log("on");
    document.body.classList.add("page-sidebar-mini");
    setIsSidebarOn(!isSidebarOn);
  } else {
    //console.log("off");
    document.body.classList.remove("page-sidebar-mini");
    setIsSidebarOn(!isSidebarOn);
  }
};


  return (
    <div>

      <header className="navbar transition-base border-bottom px-3 px-lg-6 px-3 px-lg-6 align-items-center page-header navbar-expand navbar-light"
       style={{width:'100%'}}>
                      <a className="navbar-brand d-block d-lg-none ">
                        <div className="d-flex align-items-center flex-no-wrap text-truncate">
                          {/* <!--Sidebar-icon--> */}
                          <span className="sidebar-icon bg-gradient-primary rounded-3 size-40 fw-bolder text-white">
                            A
                          </span>
                        </div>
                      </a>
                      <ul className="navbar-nav d-flex align-items-center h-100">
                      <li className="nav-item d-none d-lg-flex flex-column h-100 me-1 align-items-center justify-content-center" 
                      data-tippy-placement="bottom-start" data-tippy-content="Toggle Sidebar"> 
                     
                 

                                <a style={{cursor:'pointer'}}
                                 onClick={() => toggleSidebar(isSidebarOn)}
                                  className="sidebar-trigger nav-link size-40 d-flex align-items-center justify-content-center p-0"
                                 >
                                  <span className="material-symbols-rounded fs-4">
                                    menu_open
                                  </span>
                                </a>
                              </li>


                    <li className="nav-item d-flex flex-column me-1 h-100 justify-content-center">
                          <span role="button" className="d-flex align-items-center justify-content-center js-search nav-link size-40 p-0">
                            <span  className="material-symbols-rounded fs-1">
                              search
                              </span>
                          </span>
                           {/* <!--Search dropdown menu--> */}
                           <div className="dropdown-search p-0 overflow-hidden bg-body position-absolute start-0 top-0 w-100 h-100 border-0">
                         
                            {/* <!--Search form--> */}
                            <form>
                              <div className="d-flex align-items-center p-2 ps-4">
                                <div className="text-body-tertiary">
                                  <span   className="material-symbols-rounded fs-4">
                                    search
                                    </span>
                                </div>
                                {/* autofocus:true */}
                                <input type="text"  className="form-control bg-transparent rounded-0 py-3 pe-7 ps-3 border-0 shadow-none"
                                  placeholder="Type & hit enter..."/>
                                  <button type="button" className="position-absolute end-0 top-50 translate-middle-y me-3 js-search btn rounded-pill size-30 p-0 d-flex align-items-center justify-content-center">
                                    <span className="material-symbols-rounded">
                                      close
                                      </span>
                                    </button>

                                   
                              </div>
                            </form>
                          </div>
                        </li>
                      
                      </ul>
                      <ul className="navbar-nav d-flex align-items-center h-100">


                      <li className="nav-item d-none d-lg-flex flex-column h-100 me-1 align-items-center justify-content-center" 
                      data-tippy-placement="bottom-start" data-tippy-content="Toggle Sidebar" 
                       >
                      
                       
                         <div className='container'>
              
                       </div>

                      </li>

                      <li className="nav-item d-none d-lg-flex flex-column h-100 me-1 align-items-center justify-content-center" 
                      data-tippy-placement="bottom-start" data-tippy-content="Toggle Sidebar" 
                       >
                         <div className='container'>
                    
                         </div>
                         
                      </li>

                  
                   
                      </ul>



                      <ul className="navbar-nav ms-auto d-flex align-items-center h-100">
                 
                     
                        <li className="nav-item dropdown d-flex align-items-center justify-content-center flex-column h-100">
                          <a href="#offcanvas_user"
                            className="nav-link height-40 px-2 d-flex align-items-center justify-content-center"
                            aria-expanded="false" data-bs-toggle="offcanvas">
                            <div className="d-flex align-items-center">

                              {/* <!--Avatar with status--> */}
                              <div className="avatar-status status-online me-sm-2 avatar xs">
                                <img src="assets/media/avatars/01.jpg" className="rounded-circle img-fluid" alt=""/>
                              </div>
                              <span className="d-none d-md-inline-block">{userData.firstName}</span>
                            </div>
                          </a>
                        </li>

                       
                      </ul>
                    </header>
                  
<div className="offcanvas offcanvas-end border-0"  id="offcanvas_user">
<div className="offcanvas-body p-0">
  {/* <!--User meta--> */}
  <div className="position-relative overflow-hidden offcanvas-header px-3 pt-6 pb-10 bg-body-secondary">
    {/* <!--Divider--> */}
    <svg style={{ transform: "rotate(-180deg)", color: "var(--bs-offcanvas-bg)" }} preserveAspectRatio="none"
      className="position-absolute start-0 bottom-0 w-100" fill="currentColor" height="24" viewBox="0 0 1200 120"
      xmlns="http://www.w3.org/2000/svg">

      <path
        d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z"
        opacity=".25" />
      <path
        d="M0 0v15.81c13 21.11 27.64 41.05 47.69 56.24C99.41 111.27 165 111 224.58 91.58c31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-49.24V0z"
        opacity=".5" />
      <path
        d="M0 0v5.63C149.93 59 314.09 71.32 475.83 42.57c43-7.64 84.23-20.12 127.61-26.46 59-8.63 112.48 12.24 165.56 35.4C827.93 77.22 886 95.24 951.2 90c86.53-7 172.46-45.71 248.8-84.81V0z" />
    </svg>
    <div className="position-relative flex-grow-1">
      <div>
        <div className="flex-shrink-0 me-3">
          <img src="assets/media/avatars/01.jpg" className="rounded-circle shadow width-60 d-block mx-auto img-fluid" alt="" />
        </div>
        <div className="text-center pt-4">
          <h5 className="mb-1">{userData.firstName+" "+userData.lastName}</h5>
      <p className="text-body-tertiary mb-0 lh-1">{userData.departmentName}</p>
        </div>
      </div>
    </div>
    <button type="button" className="btn btn-sm px-2 btn-white position-absolute end-0 top-0 me-2 mt-2" data-bs-dismiss="offcanvas">
      <span className="material-symbols-rounded fs-5 align-middle">close</span>
    </button>
  </div>
  <div className="list-group rounded-0 px-3 py-4 gap-1">
    <a href="profile.html" className="list-group-item-action rounded px-2 py-1 d-flex align-items-center">
      <span className="material-symbols-rounded align-middle me-2 size-30 fs-4 d-flex align-items-center justify-content-center text-primary">
      account_circle
      </span>
    <span className="flex-grow-1">Profile</span>
    </a>
    
  </div>
<div className="px-3 pb-3 d-flex align-items-center">
  <label className="form-label fw-semibold text-body-secondary me-2 mb-0" style={{ width: "120px" }}>
    Department:
  </label>
  <div className="form-control bg-light border-0 shadow-sm flex-grow-1">
    {userData.departmentName}
  </div>
</div>

<div className="px-3 pb-3 d-flex align-items-center">
  <label className="form-label fw-semibold text-body-secondary me-2 mb-0" style={{ width: "120px" }}>
    Position:
  </label>
  <div className="form-control bg-light border-0 shadow-sm flex-grow-1">
    {userData.designationName}
  </div>
</div>

<div className="px-3 pb-3 d-flex align-items-center">
  <label className="form-label fw-semibold text-body-secondary me-2 mb-0" style={{ width: "120px" }}>
    Role:
  </label>
  <div className="form-control bg-light border-0 shadow-sm flex-grow-1">
      {userData.roleName}
  </div>
</div>
</div>
<div className="offcanvas-footer border-top rounded-0 list-group p-3">
  <a href="#" onClick={() => handleLogout()} className="list-group-item-action rounded px-2 py-1 d-flex align-items-center">
    <span className="material-symbols-rounded align-middle me-2 size-30 fs-4 d-flex align-items-center justify-content-center text-primary">
    logout
    </span>
  <span className="flex-grow-1">Logout</span>
  </a>
</div>
</div>
</div>
  )
}

export default HeaderNew


