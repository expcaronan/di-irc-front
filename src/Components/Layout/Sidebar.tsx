import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
interface props{
  roleId:number
}

function Sidebar({roleId}:props) {

  
  const navigate = useNavigate();
 
  return (
    <div className="d-flex flex-column flex-root">
  <div className="page d-flex flex-row flex-column-fluid">
    <aside className="page-sidebar">

        <div className="h-100 flex-column d-flex justify-content-start">
            
            <div className="aside-logo d-flex align-items-center flex-shrink-0 justify-content-start px-3 position-relative">
            <a href="" className="d-block">
                <div className="d-flex align-items-center flex-no-wrap text-truncate">
           
                <span className="sidebar-icon d-flex align-items-center justify-content-center fs-4 lh-1 text-white rounded-3 bg-gradient-primary fw-bolder"> D </span>
                <span className="sidebar-text">
                
                    <span className="sidebar-text text-truncate fs-4 fw-bold">
                        IRC-DI
                    </span>
                   
                </span>
                </div>
            </a>
            </div>

        <div className="aside-menu my-auto" data-simplebar>
          <nav className="flex-grow-1 h-100" id="page-navbar">

            <ul className="nav flex-column collapse-group collapse d-flex">

              <li className="nav-item sidebar-title text-truncate opacity-50 small">
                <i style={{color:'white'}} className="bi bi-three-dots"></i>
                 {/* Corrected closing tag */}
                {/* <span className="sidebar-text">Main</span> */}
              </li>
              
            <li className="nav-item">
                <a href="#" onClick={() => navigate("/homelogin")} className="nav-link d-flex align-items-center text-truncate ">
                  <span className="sidebar-icon">
                  
                    <span className="bi bi-house-door"></span>
                  </span>
                  <span className="sidebar-text">Web Login</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" onClick={() => navigate("/myattendance")} className="nav-link d-flex align-items-center text-truncate ">
                  <span className="sidebar-icon">
                  
                    <span className="bi bi-card-checklist"></span>
                  </span>
                  <span className="sidebar-text">My Attendance</span>
                </a>
              </li>

            

               <li className="nav-item">
                <a href="#" onClick={() => navigate("/nobio")} className="nav-link d-flex align-items-center text-truncate ">
                  <span className="sidebar-icon">
                  
                    <span className="bi bi-calendar2-check"></span>
                  </span>
                  <span className="sidebar-text">Apply NoBio</span>
                </a>
              </li>
              {
                roleId  == 1 &&<>
                 <li className="nav-item">
                <a href="#" onClick={() => navigate("/nobioapproval")} className="nav-link d-flex align-items-center text-truncate ">
                  <span className="sidebar-icon">
                  <span className="bi bi-check2-square"></span>
                  </span>
                  <span className="sidebar-text">For NoBio Approval</span>
                </a>
              </li>
                </>
              }
               <>
                 <li className="nav-item">
                <a href="#" onClick={() => navigate("/leaveapplication")} className="nav-link d-flex align-items-center text-truncate ">
                  <span className="sidebar-icon">
                  <span className="bi bi-check2-square"></span>
                  </span>
                  <span className="sidebar-text">Leave Application</span>
                </a>
              </li>
                </>
              
            {
                }
               <>
                 <li className="nav-item">
                <a href="#" onClick={() => navigate("/leaveapplication/status")} className="nav-link d-flex align-items-center text-truncate ">
                  <span className="sidebar-icon">
                  <span className="bi bi-check2-square"></span>
                  </span>
                  <span className="sidebar-text">Leave Status</span>
                </a>
              </li>
                </>
              
            {
                roleId  == 1 &&<>
                 <li className="nav-item">
                <a href="#" onClick={() => navigate("/leaveForApproval")} className="nav-link d-flex align-items-center text-truncate ">
                  <span className="sidebar-icon">
                  
                    <span className="bi bi-person-lines-fill"></span>
                  </span>
                  <span className="sidebar-text">Leave For Approval</span>
                </a>
              </li>

                <li className="nav-item">
                <a href="#" onClick={() => navigate("/homeemployee")} className="nav-link d-flex align-items-center text-truncate ">
                  <span className="sidebar-icon">
                  
                    <span className="bi bi-person-lines-fill"></span>
                  </span>
                  <span className="sidebar-text">Employees</span>
                </a>
              </li>

               <li className="nav-item">
                <a href="#" onClick={() => navigate("/attendancemaintenance")} className="nav-link d-flex align-items-center text-truncate ">
                  <span className="sidebar-icon">
                  
                    <span className="bi bi-card-list"></span>
                  </span>
                  <span className="sidebar-text">Attendance Maintenance</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" onClick={() => navigate("/calendar")} className="nav-link d-flex align-items-center text-truncate ">
                  <span className="sidebar-icon">
                  
                    <span className="bi bi-card-list"></span>
                  </span>
                  <span className="sidebar-text">Calendar</span>
                </a>
              </li>
</>

  }
   

       
            </ul>
           
          </nav>
        </div>
      </div>
    </aside>
  </div>
</div>

        
     
  )
}

export default Sidebar