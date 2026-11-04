import React, { useState } from 'react'
import EmployeeUserModel from '../../../../Interfaces/EmployeeUserModel'
import leaveApplicationModel from '../../../../Interfaces/BaseModel/leaveApplicationModel'
import formatDate from '../../../../Helpers/formatDate'
import getDifferenceInDays from '../../../../Helpers/getDifferenceInDays'
import LeaveApplicationModal from './Action/LeaveApplicationModal'
import LeaveApplicationDeleteModal from './Action/LeaveApplicationDeleteModal'
import LeaveApplicationUpdateModal from './Action/LeaveApplicationUpdateModal'
interface props{
    userDetails:EmployeeUserModel,
    leaveData:leaveApplicationModel[]
}
function LeaveStatusTable({userDetails,leaveData}:props) {
    //console.log(leaveData);
    const[isNotClick, setIsNotClick] = useState(false);
    const[isModalOpen, setIsModalOpen] = useState(false);
    const[leaveApplicationId, setLeaveApplicationId] = useState(0);
     const[leaveApplicationUpdate, setLeaveApplicationUpdate] = useState<leaveApplicationModel>();
    const[isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const[isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
    const closeModal = () => {
      setIsModalOpen(false);
      setIsModalOpenDelete(false);
      setIsModalOpenUpdate(false);
    };
    const handleDelete = (id:number) =>{
        setIsModalOpenDelete(true);
        setLeaveApplicationId(id);
    }
    const handleAddLeave = () =>{
        setIsModalOpen(true);
    }
     const handleUpdateData = (data:leaveApplicationModel) =>{
        setIsModalOpenUpdate(true);
        setLeaveApplicationUpdate(data);
    }
    


  return (
    <div className="task-container">
        <div className="d-flex gap-5 mb-3">
                    <div className="col-auto">
                        <button
                            onClick={() => handleAddLeave()}
                            disabled={isNotClick}
                            className="btn btn-outline-primary"
                            style={{ width: "200px" }}
                        >
                            Apply leave
                        </button>
                    </div>
                </div>
        <table id="example" className="table table-striped table-hover">
          <thead className="thead-light text-nowrap">
            <tr>
                <th></th>
                <th>Date</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Type Of Leave</th>
                <th>Reason</th>
                <th>Total Days</th>
                <th>Remarks</th>
            </tr>
        </thead>
         <tbody style={{whiteSpace:'nowrap'}} className='position-relative'>
            {leaveData?.map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                    <td>
                         <a style={{cursor:'pointer'}} onClick={() => handleDelete(rowData.id)}><i className="bi bi-trash"></i></a>
                           <a style={{cursor:'pointer'}} 
                            onClick={() => handleUpdateData(rowData)}>
                            <i className="bi bi-pencil-square"></i>
                            </a> 
                    </td>
                   
                    <td>{formatDate(rowData?.dateApplication)}</td>
                    <td>{formatDate(rowData.startDate)}</td>
                    <td>{formatDate(rowData.endDate)}</td>
                    <td>{rowData?.leaveType?.leaveName}</td>
                    <td>{rowData.reason}</td>
                    <td>{getDifferenceInDays(formatDate(rowData.startDate),formatDate(rowData.endDate))}</td>
                    <td>{rowData?.status == false ? "Not Approved" : "Approved" }</td>
                   
                </tr>
                
            ))}
           
           </tbody>
        </table>
            {
                isModalOpen && <> <LeaveApplicationModal isOpen={isModalOpen} closeModal={closeModal} userDetails={userDetails} />
                </>
            }
            {
                isModalOpenDelete && <> <LeaveApplicationDeleteModal isOpen={isModalOpenDelete} closeModal={closeModal} leaveApplicationId={leaveApplicationId} />
                </>
            }
            {
                isModalOpenUpdate && leaveApplicationUpdate && <> <LeaveApplicationUpdateModal isOpen={isModalOpenUpdate} closeModal={closeModal} leaveData={leaveApplicationUpdate} />
                </>
            }
    </div>
  )
}

export default LeaveStatusTable