import React, { useState } from 'react'
import { taskDocumentAssignedEmployeeBaseModel } from '../../../../Interfaces/BaseModel/taskDocumentAssignedEmployeeBaseModel'

import HomeFileViewer from '../../../../Pages/Viewer/HomeFileViewer';
import formatMonthDayYear from '../../../../Helpers/formatMonthDayYear';
import HomeFileViewerDetails from '../../../../Pages/Viewer/HomeFileViewerDetails';
import { taskDocumentAssignedDepartmentBaseModel } from '../../../../Interfaces/BaseModel/taskDocumentAssignedDepartmentBaseModel';
import { taskDocumentBaseModel } from '../../../../Interfaces/BaseModel/taskDocumentBaseModel';
interface props{
    documentList:taskDocumentAssignedDepartmentBaseModel[]
    employeeId:number,
}
function DocumentAssignedTable({documentList,employeeId}:props) {
console.log(documentList);

 
const [selectedFile, setSelectedFile] = useState<string | null>(null);
//const [selectedFileDetails, setSelectedFileDetails] = useState<string | null>(null);
const [selectedData, setSelectedData] = useState<taskDocumentAssignedDepartmentBaseModel>();
const handleViewData = (data: taskDocumentAssignedDepartmentBaseModel) => {
        setSelectedData(data);
        setSelectedFile(data?.taskDocument.documentFilePath ?? null)
};





  return (
     <div>
          <table id="example" className="table table-striped table-hover">
          <thead className="thead-light text-nowrap">
            <tr>
                <th>Action</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Section</th>
                <th>Document Ref Number</th>
                <th>Document Title</th>
                <th>Document FilePath</th>
                <th>Remarks</th>
                <th>Date Assigned</th>
              
              
            
            </tr>
        </thead>
         <tbody style={{whiteSpace:'nowrap'}} className='position-relative'>
            {documentList.map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                    <td>
                        <a style={{cursor:'pointer'}} 
                            onClick={() => handleViewData(rowData)}>
                        <i className="bi bi-pencil-square"></i>
                        {/* <i className="bi bi-trash"></i> */}
                        </a> 
                    </td>
                    <td
                        style={{
                            backgroundColor:
                                rowData.taskDocumentStatus?.find(
                                    (a) => a.isActive === true
                                )?.taskStatusId === 3
                                    ? "yellow"
                                    : rowData.taskDocumentStatus?.find(
                                        (a) => a.isActive === true
                                    )?.taskStatusId === 1
                                        ? "#FFC107" // Amber
                                        : rowData.taskDocumentStatus?.find(
                                            (a) => a.isActive === true
                                        )?.taskStatusId === 4
                                            ? "#B19CD9"
                                            : rowData.taskDocumentStatus?.find(
                                                (a) => a.isActive === true
                                            )?.taskStatusId === 5
                                                ? "lightgreen"
                                                : rowData.taskDocumentStatus?.find(
                                                    (a) => a.isActive === true
                                                )?.taskStatusId === 7
                                                    ? "green"
                                                    : rowData.taskDocumentStatus?.find(
                                                        (a) => a.isActive === true
                                                    )?.taskStatusId === 8
                                                        ? "red"
                                                        : "orange",
                        }}
                    >
                        {(rowData.taskDocumentStatus?.length ?? 0) <= 0
                            ? "Not Yet Started"
                            :
                            rowData.taskDocumentStatus?.find((a) => a.isActive === true)?.taskStatus?.documentStatus
                        }
                    </td>
                    <td>{formatMonthDayYear(rowData?.taskDocument.dueDate)}</td>
                    <td>{rowData?.department?.departmentName}</td>
                    <td>{rowData?.taskDocument?.documentRefNumber}</td>
                    <td>{rowData?.taskDocument?.documentTitle}</td>
                    <td>
                        {rowData?.taskDocument?.documentFilePath && (
                        <button
                        type="button"
                        onClick={() => setSelectedFile(rowData?.taskDocument.documentFilePath ?? null)}
                        className="btn btn-link p-0 text-decoration-underline text-start"
                        >
                        {rowData?.taskDocument.documentFilePath}
                        </button>
                        )}
                        
                    </td >
                      
                    <td>{formatMonthDayYear(rowData?.taskDocument.dateCreated)}</td>
                  
                    <td style={{ whiteSpace: "wrap" }}>{rowData?.remarks}</td>
                
                    {/* <td>{formatDate(rowData.birthDay)}</td>
                    <td>{formatDate(rowData.dateHired)}</td>      */}
                </tr>
                
            ))}
           
           </tbody>
        </table>
        {selectedFile && (
            <HomeFileViewer
                filePath={selectedFile}
                onClose={() => setSelectedFile(null)}
            />
        )}
        {selectedFile && selectedData && (
            <HomeFileViewerDetails
                filePath={selectedFile}
                assignedDocument={selectedData}
                employeeId={employeeId}
                onClose={() => setSelectedFile(null)}
            />
        )}
    </div>
  )
}

export default DocumentAssignedTable