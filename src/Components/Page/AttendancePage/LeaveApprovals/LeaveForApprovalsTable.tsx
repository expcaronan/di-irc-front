import React, { useState } from 'react'
import leaveApplicationModel from '../../../../Interfaces/BaseModel/leaveApplicationModel'
import EmployeeUserModel from '../../../../Interfaces/EmployeeUserModel'
import formatDate from '../../../../Helpers/formatDate'
import getDifferenceInDays from '../../../../Helpers/getDifferenceInDays'
import LeaveModalForApproval from './Actions/LeaveModalForApproval'
import LeaveModalForDisApprove from './Actions/LeaveModalForDisApprove'
import LeaveModalForApprovalUpdate from './Actions/LeaveModalForApprovalUpdate'
interface props{
    leaveForApprovalsData:leaveApplicationModel[]
    userDetails:EmployeeUserModel
}
function LeaveForApprovalsTable({leaveForApprovalsData,userDetails}:props) {
    const closeModal = () => {
        setIsModalApproveOpen(false);
        setIsModalDisApproveOpen(false);
        setIsModalUpdateOpen(false);
    };
const [isModalApproveOpen, setIsModalApproveOpen] = useState(false);
const [isModalDisApproveOpen, setIsModalDisApproveOpen] = useState(false);
const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
const [getData, setGetData] = useState<leaveApplicationModel | null>(null);
const handleApproved = (rowData:leaveApplicationModel) => {
    // Implement the logic for handling approval here
    setIsModalApproveOpen(true);
    setGetData(rowData);
  }

  const handleDisApproved = (rowData:leaveApplicationModel) => {
    // Implement the logic for handling disapproval here
    setIsModalDisApproveOpen(true);
    setGetData(rowData);
  }
   const handleUpdate = (rowData:leaveApplicationModel) => {
    // Implement the logic for handling update here
    setIsModalUpdateOpen(true);
    setGetData(rowData);
  }

  return (
    <div>
 <div className="task-container">
        <div className="d-flex gap-5 mb-3">
                    <div className="col-auto">
                        {/* <button
                            onClick={() => handleAddLeave()}
                            disabled={isNotClick}
                            className="btn btn-outline-primary"
                            style={{ width: "200px" }}
                        >
                            Apply leave
                        </button> */}
                    </div>
                </div>
        <table id="example" className="table table-striped table-hover">
          <thead className="thead-light text-nowrap">
            <tr>
                <th></th>
                <th>Date</th>
                <th>Full Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Type Of Leave</th>
                <th>Reason</th>
                <th>Total Days</th>
                <th>Status</th>
              
            </tr>
        </thead>
         <tbody style={{whiteSpace:'nowrap'}} className='position-relative'>
            {leaveForApprovalsData?.map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                    <td>
                        <button
                            type="button"
                            hidden={rowData?.leaveStatus == "Approved" || rowData?.leaveStatus == "Rejected"}
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleApproved(rowData)}
                        >
                            <i className="bi bi-check-circle"></i>
                        </button>
                        <button
                            type="button"
                            hidden={rowData?.leaveStatus == "Approved" || rowData?.leaveStatus == "Rejected"}
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDisApproved(rowData)}
                        >
                            <i className="bi bi-x-circle"></i>
                        </button>
                        <button
                            type="button"
                            hidden={rowData?.leaveStatus == "Approved" || rowData?.leaveStatus == "Rejected" ? false : true}
                            className="btn btn-sm btn-outline-success"
                            onClick={() => handleUpdate(rowData)}
                        >
                            <i className="bi bi-pencil-fill"></i>
                        </button>

                    </td>
                    <td>{formatDate(rowData?.dateApplication)}</td>
                    <td>{rowData?.employee?.firstName} {rowData?.employee?.lastName}</td>
                    <td>{formatDate(rowData.startDate)}</td>
                    <td>{formatDate(rowData.endDate)}</td>
                    <td>{rowData?.leaveType?.leaveName}</td>
                    <td>{rowData.reason}</td>
                    <td>{getDifferenceInDays(formatDate(rowData.startDate),formatDate(rowData.endDate))}</td>
                    <td>{rowData?.leaveStatus == "" ? "Not Approved" : rowData?.leaveStatus}</td>
               
                   
                </tr>
                
            ))}
           
           </tbody>
        </table>
           {
                isModalApproveOpen && <> <LeaveModalForApproval isOpen={isModalApproveOpen} closeModal={closeModal} userDetails={userDetails} leaveApplicationData={getData} />
                </>
            }
            {
                isModalDisApproveOpen && <> <LeaveModalForDisApprove isOpen={isModalDisApproveOpen} closeModal={closeModal} userDetails={userDetails} leaveApplicationData={getData} />
                </>
            }
            {
                isModalUpdateOpen && <> <LeaveModalForApprovalUpdate isOpen={isModalUpdateOpen} closeModal={closeModal} userDetails={userDetails} leaveApplicationData={getData} />
                </>
            }


           
    </div>

    </div>
  )
}

export default LeaveForApprovalsTable