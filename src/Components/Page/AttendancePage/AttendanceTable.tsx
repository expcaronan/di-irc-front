import React from 'react'
import { AttendanceRecordModel } from '../../../Interfaces/AttendanceRecordModel'
import formatDate from '../../../Helpers/formatDate'
import { AttendanceWithHoursModel } from '../../../Interfaces/AttendanceWithHoursModel'
import formatTime from '../../../Helpers/formatTime'


interface props{
attendanceData:AttendanceWithHoursModel[]
}
function AttendanceTable({attendanceData}:props) {

//console.log(attendanceData);

  return (
     <div className="table-wrapper">
        <table id="example" className="table table-striped table-hover">
          <thead className="thead-light text-nowrap">
            <tr>
                <th>Date</th>
                <th>Shift</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Regular Hours</th>
                 <th>Late Hours</th>
                <th>OT Hours</th>
                <th>Approve</th>
                <th>Remarks</th>
            </tr>
        </thead>
         <tbody className='position-relative'>
            {attendanceData.map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                    <td>{formatDate(rowData.date)}</td>
                    {/* <td>{rowData.shift == null ? "not available" : formatShift(rowData.shift.shiftStart, rowData.shift.shiftEnd)}</td> */}
                    <td>{rowData.timeIn == null ? "" : formatTime(rowData.timeIn)}</td>
                    <td>{rowData.timeOut == null ? "" : formatTime(rowData.timeOut)}</td>
                    <td>
                        {rowData.regularHours}
                    </td>
                     <td>
                    {rowData.latetimeHours}
                    </td>
                    <td>{rowData.overtimeHours}</td>
                    <td>{rowData.isApprove == true ? "Approved" : "Not Approved"}</td>
                    <td style={{ color: rowData.remarks == "Valid" || rowData.remarks == "Rest Day" ? "inherit" : "red" }}>
                    {rowData.remarks}
                    </td>
                </tr>
                
            ))}
           
           </tbody>
        </table>
    </div>


  )
}

export default AttendanceTable