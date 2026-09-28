import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { taskDocumentBaseModel } from '../../../Interfaces/BaseModel/taskDocumentBaseModel';
import formatDate from '../../../Helpers/formatDate';
import EmployeeUserModel from '../../../Interfaces/EmployeeUserModel';
import { employeeUserBaseModel } from '../../../Interfaces/BaseModel/employeeUserBaseModel';
import { taskDocumentAssignedEmployeeBaseModel } from '../../../Interfaces/BaseModel/taskDocumentAssignedEmployeeBaseModel';
import HomeFileViewer from '../../../Pages/Viewer/HomeFileViewer';
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
            navigate("form");
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
                        <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() =>
                                setSelectedFile(rowData.documentFilePath ?? null)
                            }
                        >
                            {rowData.documentFilePath}
                        </button>
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
                                            <th>ID</th>
                                            <th>Employee</th>
                                            <th>Status</th>
                                            <th>Date Assigned</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {rowData.taskDocumentAssignedEmployee?.map(
                                            (employee: taskDocumentAssignedEmployeeBaseModel) => (

                                                <tr key={employee.id}>

                                                    <td>
                                                        {employee.id}
                                                    </td>

                                                    <td>
                                                        {employee.employee?.firstName+" "+employee.employee?.lastName}
                                                    </td>

                                                    <td>
                                                        {(employee.taskDocumentStatus?.length ?? 0) <= 0 ? "Not Yet Started" : ""}
                                                    </td>

                                                    <td>
                                                        {formatDate(
                                                            employee.assignedDate
                                                        )}
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