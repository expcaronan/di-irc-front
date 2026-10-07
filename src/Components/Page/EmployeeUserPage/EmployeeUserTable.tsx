import React, { useState } from 'react'
import { employeeUserBaseModel } from '../../../Interfaces/BaseModel/employeeUserBaseModel'
import formatDate from '../../../Helpers/formatDate'
import { useNavigate } from 'react-router-dom';
import DeleteFormModal from './Action/DeleteFormModal';
interface props{
    empUserList:employeeUserBaseModel[]
}
function EmployeeUserTable({empUserList}:props) {

 //console.log(empUserList);
    const navigate = useNavigate();
    const [userId, setUserId] = useState<number>(0);
    const [employeeId, setEmployeeId] = useState<number>(0);
    const handleDelete = (data: employeeUserBaseModel) => {
        setUserId(data?.user?.id ?? 0);
        setEmployeeId(data.id);        
        setIsModalOpenA(true);
    }
    const [isModalOpenA, setIsModalOpenA] = useState(false);
    const closeModal = () => {
        setIsModalOpenA(false);
    };
    const handleUpdate = (data: employeeUserBaseModel): void => {
        navigate("/user/update", {
            state: {
                taskDocument: data,
            }       
        });
    }

  return (
      
    //  <div className="task-form-container">
    <div>
        {
            isModalOpenA && 
            <> <DeleteFormModal 
            isOpen={isModalOpenA} closeModal={closeModal} 
            userId={userId} employeeId={employeeId}/>
            </>
        }
        <div className="task-page table-wrapper-edited">
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
                         <a  type="button" className="btn btn-sm btn-outline-danger me-2" 
                         onClick={() => handleDelete(rowData)}>
                            <i className="bi bi-trash"></i></a> 
                        
                        <a type="button" className="btn btn-sm btn-outline-primary me-2"  
                         onClick={() => handleUpdate(rowData)}>
                            <i className="bi-pencil-square"></i></a> 
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
    </div>
  )
}

export default EmployeeUserTable