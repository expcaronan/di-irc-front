import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MainLoader from '../../../Common/MainLoader';
import { taskDocumentAssignedDepartmentBaseModel } from '../../../../Interfaces/BaseModel/taskDocumentAssignedDepartmentBaseModel';
import { useCreateTaskDocumentStatusMutation, useUpdateTaskDocumentStatusMutation } from '../../../../Api/taskDocumentApi';
import { toast } from 'react-toastify';
import apiResponse from '../../../../Interfaces/apiResponse';
import formatMonthDayYear from '../../../../Helpers/formatMonthDayYear';

interface Props {
    isOpen: boolean; 
    closeModal: () => void; 
    documentList:taskDocumentAssignedDepartmentBaseModel[],
    accessToken:string
  }
function NotificationModal({ isOpen, closeModal,documentList,accessToken }: Props) {
const [loading, setLoading] =useState(false);

const testPushNotification = async (accessToken: string) => {
try {


const Token = accessToken
    ? JSON.parse(accessToken).replace(/^"|"$/g, "")
    : null;

    if (!Token || typeof Token !== "string") {
        alert("JWT token not found in stored login data.");
        return;
    }

    // Use the employee ID belonging to the subscribed employee.
    const employeeId = 8;

    const response = await fetch(
        `https://localhost:44341/api/PushSubscription/test/${employeeId}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${Token}`,
                "Content-Type": "application/json"
            }
        }
    );

    const responseText = await response.text();

    if (!response.ok) {
        throw new Error(
            `HTTP ${response.status}: ${responseText}`
        );
    }

    const result = responseText
        ? JSON.parse(responseText)
        : {};

    console.log("Push notification test result:", result);

    alert(
        `API response: ${result.message ?? "Request completed"}\n` +
        `Employee ID: ${result.employeeId ?? employeeId}\n` +
        `Notifications sent: ${result.sent ?? 0}`
    );
} catch (error) {
    console.error("Test push notification failed:", error);

    alert(
        error instanceof Error
            ? error.message
            : "Failed to test push notification."
    );
}


};

   
    useEffect(() => {
      if (isOpen) {
        // Manually trigger modal to open
        const modal = document.getElementById('exampleModalAddEmp');
        if (modal) {
          modal.classList.add('show');
          modal.style.display = 'block';
          document.body.classList.add('modal-open');
          //testPushNotification(accessToken);
        }
      }else{
          const modal = document.getElementById('exampleModalAddEmp');
          if (modal) {
            modal.classList.remove('show');
            modal.setAttribute('aria-modal', 'false');
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
           
          }
        }
    }, [isOpen]);

  return (
      <div className="modal fade show d-block" id="exampleModalAddEmp" 
      tabIndex={-1} role="dialog" aria-modal="true" 
      aria-labelledby="documentModalTitle" 
      //ref={modalRef} 
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} >
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" role="document" style={{ maxWidth: "95vw" }} >
              <div className="modal-content"> {/* ================================================= */} {/* HEADER */} {/* ================================================= */} 
                <div className="modal-header"> 
                    <h5 className="modal-title" id="documentModalTitle" > Document List </h5> 
                    <button 
                    //ref={closeButtonRef} 
                    type="button" className="close" aria-label="Close document list" onClick={closeModal} >
                  <span aria-hidden="true"> &times; </span>
              </button>
              </div> {/* ================================================= */} {/* BODY */} {/* ================================================= */}
                  <div className="modal-body">
                      <div className="z-1 position-relative needs-validation">
                          <div className="table-responsive w-100" style={{ overflowX: "auto", overflowY: "auto", maxWidth: "100%" }} >
                          <table
    id="example"
    className="table table-striped table-hover table-sm mb-0"
    style={{ minWidth: "1400px", width: "100%" }}
>
    <thead className="thead-light">
        <tr className="text-nowrap">
            <th scope="col">Status</th>
            <th scope="col">Due Date</th>
            <th scope="col">Section</th>
            <th scope="col">Document Ref Number</th>
            <th scope="col">Document Title</th>
            <th scope="col">Document FilePath</th>
            <th scope="col">Date Assigned</th>
            <th scope="col">Created By Remarks</th>
            <th scope="col">Approver Remarks</th>
            <th scope="col">Modified Document File Path</th>
        </tr>
    </thead>

    <tbody>
        {documentList && documentList.length > 0 ? (
            documentList.map((rowData, rowIndex) => {
                const activeStatus =
                    rowData?.taskDocumentStatus?.find(
                        (a: any) => a.isActive === true
                    );

                const taskStatusId = activeStatus?.taskStatusId;

                return (
                    <tr key={rowIndex}>
                        <td
                            style={{
                                backgroundColor:
                                    taskStatusId === 3
                                        ? "yellow"
                                        : taskStatusId === 1
                                        ? "#FFC107"
                                        : taskStatusId === 4
                                        ? "#B19CD9"
                                        : taskStatusId === 5
                                        ? "lightgreen"
                                        : taskStatusId === 7
                                        ? "green"
                                        : taskStatusId === 6
                                        ? "#FF474C"
                                        : "orange",
                                fontWeight: "bold",
                                whiteSpace: "nowrap",
                                minWidth: "150px",
                            }}
                        >
                            {(rowData?.taskDocumentStatus?.length ?? 0) <= 0
                                ? "Not Yet Started"
                                : activeStatus?.taskStatus?.documentStatus}
                        </td>

                        <td className="text-nowrap">
                            {formatMonthDayYear(
                                rowData?.taskDocument?.dueDate
                            )}
                        </td>

                        <td className="text-nowrap">
                            {rowData?.department?.departmentName}
                        </td>

                        <td className="text-nowrap">
                            {rowData?.taskDocument?.documentRefNumber}
                        </td>

                        <td
                            style={{
                                minWidth: "200px",
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                            }}
                        >
                            {rowData?.taskDocument?.documentTitle}
                        </td>

                        <td
                            style={{
                                minWidth: "250px",
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                            }}
                        >
                            {rowData?.taskDocument?.documentFilePath}
                        </td>

                        <td className="text-nowrap">
                            {formatMonthDayYear(
                                rowData?.taskDocument?.dateCreated
                            )}
                        </td>

                        <td
                            style={{
                                minWidth: "250px",
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                            }}
                        >
                            {rowData?.remarks}
                        </td>

                        <td
                            style={{
                                minWidth: "250px",
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                            }}
                        >
                            {activeStatus?.taskSupervisorComment?.remarks}
                        </td>

                        <td
                            style={{
                                minWidth: "250px",
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                            }}
                        >
                            {activeStatus?.documentFilePath}
                        </td>
                    </tr>
                )
            })
        ) : (
            <tr>
                <td
                    colSpan={10}
                    className="text-center text-muted py-4"
                >
                    No documents found.
                </td>
            </tr>
        )}
    </tbody>
</table>
                          </div>
                      </div>
                  </div> {/* ================================================= */} {/* FOOTER */} {/* ================================================= */}
                  <div className="modal-footer"> {loading && <MainLoader />}
                      <button type="button" className="btn btn-secondary" onClick={closeModal} > Close </button>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default NotificationModal