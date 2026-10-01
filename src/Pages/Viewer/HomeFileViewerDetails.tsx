import React, { useState } from 'react'
import { taskDocumentAssignedEmployeeBaseModel } from '../../Interfaces/BaseModel/taskDocumentAssignedEmployeeBaseModel';
import baseUrlString from '../../Api/baseUrlString';
import formatMonthDayYear from '../../Helpers/formatMonthDayYear';
import { taskDocumentAssignedDepartmentBaseModel } from '../../Interfaces/BaseModel/taskDocumentAssignedDepartmentBaseModel';
import { taskDocumentBaseModel } from '../../Interfaces/BaseModel/taskDocumentBaseModel';
import TaskDocumentStatusModal from '../../Components/Page/Task/Actions/TaskDocumentStatusModal';
interface props {
    filePath: string;
    assignedDocument:taskDocumentAssignedDepartmentBaseModel
    employeeId:number
    onClose: () => void;
}
function HomeFileViewerDetails({filePath,assignedDocument,employeeId,onClose}:props) {
   //console.log(employeeId)
  const normalizedPath = filePath
    .replace(/\\/g, "/")
    .replace(/^\/+/, "");

    const fileUrl = `${baseUrlString.test+"/DocumentViewer"}/${normalizedPath}`;
    // Get filename
    const fileName =
        filePath.split(/[\\/]/).pop() || "DocumentViewer";
console.log(fileUrl);
    // Get extension
    const extension =
        fileName.split(".").pop()?.toLowerCase() || "";

    const imageExtensions = [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "webp",
        "bmp",
        "svg"
    ];

    const officeExtensions = [
        "doc",
        "docx",
        "xls",
        "xlsx",
        "ppt",
        "pptx"
    ];

    const isImage = imageExtensions.includes(extension);
    const isPdf = extension === "pdf";
    const isOffice = officeExtensions.includes(extension);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleStart = async () => {
    setIsModalOpen(true);
  }
return (

<div
    className="modal d-block"
    style={{
        backgroundColor: "rgba(0,0,0,0.7)"
    }}
>
{
        isModalOpen && <> <TaskDocumentStatusModal isOpen={isModalOpen} closeModal={closeModal} assignedDocument={assignedDocument} employeeId={employeeId}/>
       </>
}

    <div className="modal-dialog modal-fullscreen-lg-down modal-xl modal-dialog-centered">


        <div
            className="modal-content"
            style={{
                height: "90vh"
            }}
        >

            {/* HEADER */}
            <div className="modal-header">

                <div>
                    <h5 className="modal-title mb-0">
                        Document Preview
                    </h5>

                    <small className="text-muted">
                        {assignedDocument?.taskDocument?.documentTitle}
                    </small>
                </div>

                <button
                    type="button"
                    className="btn-close"
                    onClick={onClose}
                />

            </div>


            {/* CONTENT */}
            <div
                className="modal-body p-0"
                style={{
                    overflow: "hidden"
                }}
            >

                <div
                    className="d-flex"
                    style={{
                        height: "100%"
                    }}
                >

                    {/* =========================
                        DOCUMENT PREVIEW
                    ========================== */}
                    <div
                        className="flex-grow-1"
                        style={{
                            minWidth: 0,
                            backgroundColor: "#f1f3f5",
                            overflow: "auto"
                        }}
                    >

                        {/* PDF */}
                        {isPdf && (
                            <iframe
                                src={fileUrl}
                                title={fileName}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: "none"
                                }}
                            />
                        )}


                        {/* IMAGE */}
                        {isImage && (
                            <div
                                className="d-flex justify-content-center align-items-center h-100 p-4"
                            >
                                <img
                                    src={fileUrl}
                                    alt={fileName}
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        objectFit: "contain"
                                    }}
                                />
                            </div>
                        )}


                        {/* OFFICE DOCUMENT */}
                        {isOffice && (
                            <iframe
                                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
                                title={fileName}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: "none"
                                }}
                                allowFullScreen
                            />
                        )}


                        {/* UNSUPPORTED */}
                        {!isPdf && !isImage && !isOffice && (
                            <div
                                className="d-flex flex-column justify-content-center align-items-center h-100"
                            >

                                <i
                                    className="bi bi-file-earmark"
                                    style={{
                                        fontSize: "5rem"
                                    }}
                                />

                                <h5 className="mt-3">
                                    Preview not available
                                </h5>

                                <p className="text-muted">
                                    {fileName}
                                </p>

                                <a
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    <i className="bi bi-download me-2"></i>
                                    Download File
                                </a>

                            </div>
                        )}

                    </div>


                    {/* =========================
                        DETAILS SIDEBAR
                    ========================== */}
                    <div
                        className="border-start bg-white"
                        style={{
                            width: "320px",
                            minWidth: "320px",
                            overflowY: "auto"
                        }}
                    >

                        <div className="p-4">

                            {/* TITLE */}
                            <div className="mb-4">

                                <h5 className="mb-1">
                                    Document Remarks
                                </h5>

                                <small className="text-muted">
                                    {assignedDocument?.remarks}
                                </small>

                            </div>


                            {/* FILE INFORMATION */}
                            <div className="mb-4">

                                <h6 className="text-uppercase text-muted small mb-3">
                                    File Information
                                </h6>


                                {/* File Name */}
                                <div className="mb-3">

                                    <small className="text-muted d-block">
                                        File Name
                                    </small>

                                    <div
                                        className="fw-semibold text-break"
                                    >
                                        {fileName}
                                    </div>

                                </div>


                                {/* File Type */}
                                <div className="mb-3">

                                    <small className="text-muted d-block">
                                        File Type
                                    </small>

                                    <div>
                                        {isPdf && (
                                            <span className="badge bg-danger">
                                                PDF
                                            </span>
                                        )}

                                        {isImage && (
                                            <span className="badge bg-primary">
                                                IMAGE
                                            </span>
                                        )}

                                        {isOffice && (
                                            <span className="badge bg-success">
                                                OFFICE
                                            </span>
                                        )}

                                        {!isPdf && !isImage && !isOffice && (
                                            <span className="badge bg-secondary">
                                                FILE
                                            </span>
                                        )}
                                    </div>

                                </div>


                                {/* File URL */}
                                <div className="mb-3">

                                    <small className="text-muted d-block">
                                        File Location
                                    </small>

                                    <div
                                        className="text-break small"
                                    >
                                        {assignedDocument?.taskDocument?.documentFilePath}
                                    </div>

                                </div>

                            </div>


                            {/* DOCUMENT DETAILS */}
                            <div className="mb-4">

                                <h6 className="text-uppercase text-muted small mb-3">
                                    Document Details
                                </h6>


                                {/* Document Reference */}
                                <div className="mb-3">

                                    <small className="text-muted d-block">
                                        Document Ref Number
                                    </small>

                                    <div className="fw-semibold">
                                        {assignedDocument?.taskDocument?.documentRefNumber}
                                    </div>

                                </div>


                                {/* Created By */}
                                <div className="mb-3">

                                    <small className="text-muted d-block">
                                        Document Created By
                                    </small>

                                    <div className="fw-semibold">
                                        {/* {assignedDocument?.employee?.firstName+" "+assignedDocument?.taskDocument?.employee?.firstName} */}
                                    </div>

                                </div>


                                {/* Date Created */}
                                <div className="mb-3">

                                    <small className="text-muted d-block">
                                        Date Created
                                    </small>
                                        {formatMonthDayYear(assignedDocument?.taskDocument?.dateCreated)}
                                    <div>
                                        
                                    </div>

                                </div>


                                {/* Due Date */}
                                <div className="mb-3">

                                    <small className="text-muted d-block">
                                        Due Date
                                    </small>

                                    <div>
                                         {formatMonthDayYear(assignedDocument?.taskDocument?.dueDate)}
                                    </div>

                                </div>

                            </div>


                            {/* DESCRIPTION */}
                            {/* <div className="mb-4">

                                <h6 className="text-uppercase text-muted small mb-3">
                                    Description
                                </h6>

                                <p className="small text-muted mb-0">
                                 
                                </p>

                            </div> */}


                            {/* ACTIONS */}
                            <div>

                                <h6 className="text-uppercase text-muted small mb-3">
                                    Actions
                                </h6>

                                <div className="d-grid gap-2">
                                    
                                    <a
                                       onClick={() => handleStart()}
                                        className="btn btn-warning"
                                    >
                                        <i className="bi bi-file-earmark-plus"></i>
                                        Add Remarks
                                    </a>

                                    <a
                                        href={fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                    >
                                        <i className="bi bi-download me-2"></i>
                                        Open / Download
                                    </a>

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
</div>

  )
}

export default HomeFileViewerDetails