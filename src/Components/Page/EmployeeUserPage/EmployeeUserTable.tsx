import React from 'react'
import { employeeUserBaseModel } from '../../../Interfaces/BaseModel/employeeUserBaseModel'
import formatDate from '../../../Helpers/formatDate'
interface props{
    empUserList:employeeUserBaseModel[]
}
function EmployeeUserTable({empUserList}:props) {

 console.log(empUserList);

    function handleDelete(id: number): void {
        throw new Error('Function not implemented.')
    }

  return (
    <div>
          <table id="example" className="table table-striped table-hover">
          <thead className="thead-light text-nowrap">
            <tr>
                <th></th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Rank</th>
                <th>Role</th>
                <th>UserName</th>
                <th>Email</th>
                <th>Birth Date</th>
                <th>Date Hired</th>
               
                {/* <th>Shift</th>
                <th>Time In</th>
                <th>Time Out</th> */}
                {/* <th>Under Time</th>
                <th>OT Hours</th> */}
                {/* <th>Approve</th>
                <th>Remarks</th> */}
            </tr>
        </thead>
         <tbody style={{whiteSpace:'nowrap'}} className='position-relative'>
            {empUserList.map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                    <td>
                         <a style={{cursor:'pointer'}} 
                         onClick={() => handleDelete(rowData.id)}>
                            <i className="bi bi-trash"></i></a> 
                    </td>
                    <td>{rowData?.firstName+" "+rowData.lastName}</td>
                    <td>{rowData?.department?.departmentName}</td>
                    <td>{rowData?.designation?.designationName}</td>
                    <td>{rowData?.rank?.rankName}</td>
                    <td>{rowData?.role?.roleName}</td>

                    <td>{rowData?.user?.userName}</td>
                    <td>{rowData?.user?.email}</td>
                
                    <td>{formatDate(rowData.birthDay)}</td>
                    <td>{formatDate(rowData.dateHired)}</td>     
                </tr>
                
            ))}
           
           </tbody>
        </table>
    </div>
  )
}

export default EmployeeUserTable