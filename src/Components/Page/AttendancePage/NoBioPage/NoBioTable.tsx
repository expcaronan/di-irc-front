import React, { useState } from 'react'
import { AttendanceRecordModel } from '../../../../Interfaces/AttendanceRecordModel';
import formatDate from '../../../../Helpers/formatDate';
import formatTime from '../../../../Helpers/formatTime';
import formatShift from '../../../../Helpers/formatShift';
import ApplyNobio from './Actions/ApplyNoBio';

interface props{
    attendanceData:AttendanceRecordModel[];
}
function NoBioTable({attendanceData}:props) {
    //console.log(attendanceData);
    const [attendance, setAttendance] = useState<AttendanceRecordModel | null>();
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
     const closeModal = () => {
        setAttendance(null);
        setIsModalOpenUpdate(false);
    };
    const handleUpdate = (rowData:AttendanceRecordModel) => {
        //console.log(rowData);
        setAttendance(rowData);
        setIsModalOpenUpdate(true);
    }
  
  return (
     <div>
         {
        attendance != null && <> <ApplyNobio isOpen={isModalOpenUpdate} closeModal={closeModal} attendance={attendance}/> </>
       
        }
           <div>
           
        <table id="example" className="table table-striped table-hover">
          <thead className="thead-light text-nowrap">
            <tr>
                <th></th>
                <th>Date</th>
                <th>Shift</th>
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
                    <td>
                        {formatShift(8,17) }
                        
                    </td>
                    <td>{rowData.timeIn == null ? "" : formatTime(rowData.timeIn)}</td>
                    <td>{rowData.timeOut == null ? "" : formatTime(rowData.timeOut)}</td>
                    <td>{rowData?.noBioRemarks?.remarks}</td>
                </tr>
                
            ))}
           
           </tbody>
        </table>
        </div>

    </div>
  )
}

export default NoBioTable