import React, { useEffect, useState } from 'react'

import formatDate from '../../../Helpers/formatDate';
import apiResponse from '../../../Interfaces/apiResponse';
import { toast } from 'react-toastify';
import EmployeeUserModel from '../../../Interfaces/EmployeeUserModel';
import { AttendanceRecordModel } from '../../../Interfaces/AttendanceRecordModel';
import formatTime from '../../../Helpers/formatTime';
import { useEmployeeTimeinMutation, useEmployeeTimeoutMutation } from '../../../Api/attendanceApi';
interface props{
    attendanceData:EmployeeUserModel | null,
    eId:number,
  
}
function AttendanceLoginTable({attendanceData, eId}:props) {
   
const [addTimeIn] = useEmployeeTimeinMutation();
const [addTimeOut] =useEmployeeTimeoutMutation();
const [attendance, setAttendance] = useState<AttendanceRecordModel[]>([]);
const [isNotClick, setIsNotClick] = useState(false);

  useEffect(() => {
    if (attendanceData) {
        
        setAttendance(attendanceData.attendanceRecords ?? []); // ✅ safe, only runs when 'data' changes
    }
   
  }, [attendanceData]); 

const handleTimeIn = async () => {
  setIsNotClick(true);
  const nowLocal = new Date();
  const isoLocal = nowLocal.getFullYear() + '-' 
               + (nowLocal.getMonth()+1).toString().padStart(2,'0') + '-' 
               + nowLocal.getDate().toString().padStart(2,'0') + 'T' 
               + nowLocal.getHours().toString().padStart(2,'0') + ':' 
               + nowLocal.getMinutes().toString().padStart(2,'0') + ':' 
               + nowLocal.getSeconds().toString().padStart(2,'0');

               
   const body = {
        date: isoLocal,
        timeIn: isoLocal,
        timeOut: null,
        employeeId: eId,
        isApprove: false,
        noBioReason: ""
    };
  console.log(attendanceData);
   const response:apiResponse = await addTimeIn(body);
   //console.log(response);
    if(response.data?.isSuccess == true){
          
              toast.success('Time In Successfully!', {
                  position: "top-right", 
                  autoClose: 5000, 
                });
            }
            else if(response.data?.isSuccess == false && response.data.statusCode == 400){
                toast.error(response.data?.errorMessages?.[0] ?? "Unknown error", {
                position: "top-right",
                autoClose: 5000,
                });
          
      }
          
      else{
        toast.error('Something went wrong!', {
            position: "top-right", 
            autoClose: 5000, 
          });
      }
      setIsNotClick(false);
   }
  
const handleTimeOut = async () => {
  setIsNotClick(true);
    const nowLocal = new Date();
  const isoLocal = nowLocal.getFullYear() + '-' 
               + (nowLocal.getMonth()+1).toString().padStart(2,'0') + '-' 
               + nowLocal.getDate().toString().padStart(2,'0') + 'T' 
               + nowLocal.getHours().toString().padStart(2,'0') + ':' 
               + nowLocal.getMinutes().toString().padStart(2,'0') + ':' 
               + nowLocal.getSeconds().toString().padStart(2,'0');



   const response:apiResponse = await addTimeOut({
        id:attendance[0].id,
        employeeId:eId,
        date:attendance[0].date,
        timeOut: isoLocal,
        timeIn:attendance[0].timeIn,
        //shiftId:attendance[0].shiftId,
        isApprove:true,
        //departmentId:deptId,
   });
  console.log(response);
    if(response.data?.isSuccess == true){
          
              toast.success('Time Out Successfully!', {
                  position: "top-right", 
                  autoClose: 5000, 
                });
            }
            else if(response.data?.isSuccess == false && response.data.statusCode == 400){
                toast.error(response.data?.errorMessages?.[0] ?? "Unknown error", {
                position: "top-right",
                autoClose: 5000,
                });
          
      }
          
      else{
        toast.error('Something went wrong!', {
            position: "top-right", 
            autoClose: 5000, 
          });
      }
      setIsNotClick(false);
   }
  

  return (


    <div>
        <div className='d-flex justify-content-center gap-5' >
            <div className='col-auto'>
            <button
                onClick={() => handleTimeIn()}
                disabled={isNotClick}
                className="btn btn-outline-primary flex-grow-5"  style={{ width: '200px' }}
                >
                    Time In
                </button>
            </div>
             <div className='col-auto'>
            <button
                onClick={() => handleTimeOut()}
                disabled={isNotClick}
                className="btn btn-outline-primary flex-grow-5"  style={{ width: '200px' }}
                >
                    Time out
                </button>
            </div>
        </div>
       


   <div className="table-wrapper-edited">
        <table id="example" className="table table-striped table-hover">
          <thead className="thead-light text-nowrap">
            <tr>
                <th>Date</th>
                <th>Time In</th>
                <th>Time Out</th>
            </tr>
        </thead>
        <tbody className='position-relative'>
            {attendance.map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                   {/* <td>
                        <a style={{cursor:'pointer'}} onClick={() => handleUpdate(rowData)}><i className="bi bi-pencil-square"></i></a> 
                    </td> */}
                    <td>
                        {formatDate(rowData.date)}
                    </td>
                    <td>{formatTime(rowData.timeIn)}</td>
                 
                    <td>{rowData.timeOut == null ? "": formatTime(rowData.timeOut ?? "")}</td>
                 
                </tr>
                
            ))}
           
           </tbody>
        </table>
        </div>

    </div>
  )
}

export default AttendanceLoginTable