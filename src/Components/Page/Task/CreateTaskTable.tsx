import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { taskDocumentBaseModel } from '../../../Interfaces/BaseModel/taskDocumentBaseModel';
import formatDate from '../../../Helpers/formatDate';
import EmployeeUserModel from '../../../Interfaces/EmployeeUserModel';
import { employeeUserBaseModel } from '../../../Interfaces/BaseModel/employeeUserBaseModel';
import { taskDocumentAssignedEmployeeBaseModel } from '../../../Interfaces/BaseModel/taskDocumentAssignedEmployeeBaseModel';
import HomeFileViewer from '../../../Pages/Viewer/HomeFileViewer';
import { taskDocumentAssignedDepartmentBaseModel } from '../../../Interfaces/BaseModel/taskDocumentAssignedDepartmentBaseModel';
interface props{
    taskDocumentList:taskDocumentBaseModel[]
}

function CreateTaskTable({taskDocumentList}:props) {
    console.log(taskDocumentList);
    const [documents, setDocuments] = useState<taskDocumentBaseModel[]>([]);
    const [isNotClick, setIsNotClick] = useState(false);
    const navigate = useNavigate();

    const handleAddTask = async () => {
        setIsNotClick(true);
            navigate("/task/create/form");
        setIsNotClick(false);
    }
    function handleDelete(id: number): void {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }

        // setDocuments((currentDocuments) =>
        //     currentDocuments.filter((document) => document.id !== id)
        // );
    }
    const [expandedRows, setExpandedRows] = useState<number[]>([]);

        const toggleRow = (id: number) => {
            setExpandedRows(prev =>
                prev.includes(id)
                    ? prev.filter(rowId => rowId !== id)
                    : [...prev, id]
            );
    };
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

  return (
    <div>
        <div className='d-flex justify-content gap-5' >
            <div className='col-auto'>
            <button
                onClick={() => handleAddTask()}
                disabled={isNotClick}
                className="btn btn-outline-primary flex-grow-5"  style={{ width: '200px' }}
                >
                    Create Task
                </button>
            </div>
            <div className='col-auto'>
                {/* <button
                    onClick={() => handleTimeOut()}
                    disabled={isNotClick}
                    className="btn btn-outline-primary flex-grow-5"  style={{ width: '200px' }}
                    >
                        Time out
                </button> */}
            </div>
        </div>

        {/* table */}
         <div>
          <table id="example" className="table table-striped table-hover">
          <thead className="thead-light text-nowrap">
            <tr>
                <th></th>
                <th>Document Ref Number</th>
                <th>Document Description</th>
                <th>Document Title</th>
                <th>Document File Path</th>
                <th>Due Date</th>
                <th>Created Date</th>
              
               
                {/* <th>Shift</th>
                <th>Time In</th>
                <th>Time Out</th> */}
                {/* <th>Under Time</th>
                <th>OT Hours</th> */}
                {/* <th>Approve</th>
                <th>Remarks</th> */}
            </tr>
        </thead>
        <tbody
    style={{ whiteSpace: "nowrap" }}
    className="position-relative"
>
    {taskDocumentList.map((rowData, rowIndex) => {

        const isExpanded = expandedRows.includes(rowData.id);

        return (
            <React.Fragment key={rowData.id}>

                {/* ============================= */}
                {/* PARENT ROW                     */}
                {/* ============================= */}

                <tr>

                    {/* Expand / Delete */}
                    <td>

                        <button
                            type="button"
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => toggleRow(rowData.id)}
                        >
                            <i
                                className={
                                    isExpanded
                                        ? "bi bi-chevron-down"
                                        : "bi bi-chevron-right"
                                }
                            ></i>
                        </button>

                        <a
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(rowData.id)}
                        >
                            <i className="bi bi-trash text-danger"></i>
                        </a>

                    </td>

                    <td>
                        {rowData?.documentRefNumber}
                    </td>

                    <td>
                        {rowData?.documentDescription}
                    </td>

                    <td>
                        {rowData?.documentTitle}
                    </td>

                    <td>
                         {rowData.documentFilePath && (
                        <a
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() =>
                                setSelectedFile(rowData.documentFilePath ?? null)
                            }
                        >
                            {rowData.documentFilePath}
                        </a>
                        )}
                    </td>

                    <td>
                        {formatDate(rowData.dueDate)}
                    </td>

                    <td>
                        {formatDate(rowData.dateCreated)}
                    </td>

                </tr>


                {/* ============================= */}
                {/* CHILD ROW                      */}
                {/* ============================= */}

                {isExpanded && (
                    <tr>

                        {/* Empty space for first column */}
                        <td></td>

                        <td colSpan={6}>

                            <div className="p-3 bg-light">

                                <h6 className="mb-3">
                                    Assigned Researchers
                                </h6>

                                <table className="table table-sm table-bordered mb-0">

                                    <thead>
                                        <tr>
                                            <th>Actions</th>
                                            <th>Department</th>
                                            <th>Status</th>
                                            <th>Remarks</th>
                                            <th>Date Assigned</th>
                                            <th>Assigned Comments</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {rowData.taskDocumentAssignedDepartment?.map(
                                            (dept: taskDocumentAssignedDepartmentBaseModel) => (

                                                <tr key={dept.id}>

                                                    <td>{
                                                        (dept.taskDocumentStatus?.find(
                                                                        (a) => a.isActive === true
                                                                    )?.taskStatusId === 4) &&
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-primary me-2"
                                                            onClick={() => toggleRow(rowData.id)}
                                                        >
                                                        <i className="bi bi-check-circle"></i>
                                                        </button>
                                                        }
                                                    </td>

                                                    <td>
                                                        {dept.department?.departmentName}
                                                    </td>

                                                  <td
                                                        style={{
                                                            backgroundColor:
                                                                dept.taskDocumentStatus?.find(
                                                                    (a) => a.isActive === true
                                                                )?.taskStatusId === 3
                                                                    ? "yellow"
                                                                    : dept.taskDocumentStatus?.find(
                                                                        (a) => a.isActive === true
                                                                    )?.taskStatusId === 1
                                                                    ? "#FFC107" // Amber
                                                                    : dept.taskDocumentStatus?.find(
                                                                        (a) => a.isActive === true
                                                                    )?.taskStatusId === 4
                                                                    ? "#B19CD9"
                                                                    : dept.taskDocumentStatus?.find(
                                                                        (a) => a.isActive === true
                                                                    )?.taskStatusId === 5
                                                                    ? "lightgreen"
                                                                    : dept.taskDocumentStatus?.find(
                                                                        (a) => a.isActive === true
                                                                    )?.taskStatusId === 7
                                                                    ? "green"
                                                                    : dept.taskDocumentStatus?.find(
                                                                        (a) => a.isActive === true
                                                                    )?.taskStatusId === 8
                                                                    ? "red"
                                                                    : "orange",
                                                        }}
                                                        >
                                                        {(dept.taskDocumentStatus?.length ?? 0) <= 0
                                                            ? "Not Yet Started"
                                                            : 
                                                            dept.taskDocumentStatus?.find((a) => a.isActive === true)?.taskStatus?.documentStatus  
                                                        }
                                                    </td>
                                                    <td>
                                                        {dept.remarks}
                                                    </td>

                                                    <td>
                                                        {formatDate(
                                                            dept.assignedDate
                                                        )}
                                                    </td>
                                                    <td>
                                                        {(dept.taskDocumentStatus?.length ?? 0) <= 0
                                                            ? ""
                                                            : 
                                                            dept.taskDocumentStatus?.find((a) => a.isActive === true)?.assignedRemarks  
                                                        }
                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </td>

                    </tr>
                )}
                
            </React.Fragment>
        );
    })}
</tbody>
         {/* <tbody style={{whiteSpace:'nowrap'}} className='position-relative'>
            {taskDocumentList.map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                    <td>
                         <a style={{cursor:'pointer'}} 
                         onClick={() => handleDelete(rowData.id)}>
                            <i className="bi bi-trash"></i></a> 
                    </td>
                    <td>{rowData?.documentRefNumber}</td>
                    <td>{rowData?.documentDescription}</td>
                    <td>{rowData?.documentTitle}</td>
                    <td>{rowData?.documentFilePath}</td>
                
                    <td>{formatDate(rowData.dueDate)}</td>
                    <td>{formatDate(rowData.dateCreated)}</td>     
                </tr>
                
                
            ))}
           
           </tbody> */}
        </table>
    </div>
            {selectedFile && (
            <HomeFileViewer
                filePath={selectedFile}
                onClose={() => setSelectedFile(null)}
            />
            )}
    </div>
  )
}

export default CreateTaskTable