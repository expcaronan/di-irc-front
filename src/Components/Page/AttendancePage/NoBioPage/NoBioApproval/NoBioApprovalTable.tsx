import React, { useState } from 'react'
import { attendanceWithEmp } from '../../../../../Interfaces/attendanceWithEmp';
import formatDate from '../../../../../Helpers/formatDate';
import formatTime from '../../../../../Helpers/formatTime';
import ApplyNobioApproval from './Actions/ApplyNobioApproval';

interface props{
    attendanceData:attendanceWithEmp[];
}
function NoBioApprovalTable({attendanceData}:props) {
    const [attendance, setAttendance] = useState<attendanceWithEmp|null>();
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
     const closeModal = () => {
        setAttendance(null);
        
        setIsModalOpenUpdate(false);
    };
    const handleUpdate = (rowData:attendanceWithEmp) => {
        //console.log(rowData);
        setAttendance(rowData);
        setIsModalOpenUpdate(true);
    }
    
  return (
     <div>
         {
        attendance != null && <> <ApplyNobioApproval isOpen={isModalOpenUpdate} closeModal={closeModal} attendance={attendance}/>
       </>
       }
    <div>
        
        <table id="example" className="table table-striped table-hover">
          <thead className="thead-light text-nowrap">
            <tr>
                <th></th>
                <th>Date</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Reason</th>
             
            </tr>
        </thead>
        <tbody className='position-relative'>
            {attendanceData.map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                    <td>
                        <a style={{cursor:'pointer'}} onClick={() => handleUpdate(rowData)}><i className="bi bi-pencil-square"></i></a> 
                    </td>
                     <td>{formatDate(rowData.date)}</td>
                    <td>{rowData.employeeName}</td>
                    <td>{rowData.departmentName}</td>
                     <td>{rowData.designationName}</td>
                   
                    <td>{rowData.timeIn == null ? "" : formatTime(rowData.timeIn)}</td>
                    <td>{rowData.timeOut == null ? "" : formatTime(rowData.timeOut)}</td>
                    <td>{rowData.remarks}</td>
                    
                </tr>
                
            ))}
           
           </tbody>
        </table>
        </div>

    </div>
  )
}

export default NoBioApprovalTable