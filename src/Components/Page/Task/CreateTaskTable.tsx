import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { taskDocumentBaseModel } from '../../../Interfaces/BaseModel/taskDocumentBaseModel';
import formatDate from '../../../Helpers/formatDate';
import HomeFileViewer from '../../../Pages/Viewer/HomeFileViewer';
import { taskDocumentAssignedDepartmentBaseModel } from '../../../Interfaces/BaseModel/taskDocumentAssignedDepartmentBaseModel';
import TaskHandleApproveModal from './Actions/TaskHandleApproveModal';
import TaskHandleDisApproveModal from './Actions/TaskHandleDisApproveModal';

import './CreateTaskTable.css';
import TaskHandleDeleteModal from './Actions/TaskHandleDeleteModal';


interface props{
    taskDocumentList:taskDocumentBaseModel[]
    employeeId:number
    empToken:string
}

function CreateTaskTable({taskDocumentList,employeeId, empToken}:props) {
    //console.log(taskDocumentList);
    const [isModalOpenA, setIsModalOpenA] = useState(false);
    const [isModalOpenD, setIsModalOpenD] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
      
     const closeModal = () => {
        setIsModalOpenA(false);
        setIsModalOpenD(false);
        setIsModalOpenDelete(false);
        setIsModalOpenEdit(false);
    };
   
    const [selectedTaskDocument, setSelectedTaskDocument] = useState<taskDocumentBaseModel>();
    const [isNotClick, setIsNotClick] = useState(false);
    const navigate = useNavigate();

    const handleAddTask = async () => {
        setIsNotClick(true);
            navigate("/task/create/form");
        setIsNotClick(false);
    }
     const handleShowModal = ((data:taskDocumentBaseModel) =>{
        setIsNotClick(true);
            navigate("/task/create/assignedDepartment", {
            state: {
                taskDocument: data,
                employeeId: employeeId,
            }
        });
        setIsNotClick(false);
    })
      const handleEdit = ((data:taskDocumentBaseModel)=>{
         setIsModalOpenEdit(true);
         
            navigate("/task/edit/taskDocument", {
            state: {
                taskDocument: data,
                employeeId: employeeId,
            }
        });
        setIsModalOpenEdit(false);

    })
   

    const [expandedRows, setExpandedRows] = useState<number[]>([]);

        const toggleRow = (id: number) => {
            setExpandedRows(prev =>
                prev.includes(id)
                    ? prev.filter(rowId => rowId !== id)
                    : [...prev, id]
            );
    };
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [taskDocumentStatusId, setTaskDocumentStatusId] = useState(0)
    const [taskDocumentId, setTaskDocumentId] = useState(0);
    const handleApproved = ((id:number)=>{
         setIsModalOpenA(true);
         setTaskDocumentStatusId(id)
    })
    const handleDisApproved = ((id:number)=>{
         setIsModalOpenD(true);
         setTaskDocumentStatusId(id)
    })
    const handleDelete = ((id:number)=>{
         setIsModalOpenDelete(true);
         setTaskDocumentId(id)
    })
  
const subscribeToPush = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;

    // Replace this with your actual VAPID PUBLIC key.
    const vapidPublicKey = "BPG8cKBv_gtCtqN6_pDCzZ9tV-uafrdB541GrRkxMhQBsgrw2JlMh6ZYWDA8CnSlGThXCU1iKITZfMV7wdzxdUY";

    const base64ToUint8Array = (base64String: string) => {
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      const rawData = window.atob(base64);

      return Uint8Array.from(rawData, (char) => char.charCodeAt(0));
    };

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(vapidPublicKey),
    });

    console.log("Push subscription created:", subscription.toJSON());
  } catch (error) {
    console.error("Push subscription failed:", error);
  }
};

const savePushSubscription = async (accessToken: string) => {

 
    const Token = accessToken
    ? JSON.parse(accessToken).replace(/^"|"$/g, "")
    : null;
    
    const registration = await navigator.serviceWorker.ready;

    // Reuse the existing subscription whenever possible.
    const subscription =
        await registration.pushManager.getSubscription();

    if (!subscription) {
        throw new Error(
            "No push subscription exists. Subscribe to push first."
        );
    }
try {
const response = await fetch(
"https://localhost:44341/api/pushsubscription",
{
method: "POST",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${Token}`
},
body: JSON.stringify(subscription.toJSON())
}
);

console.log("HTTP status:", response.status);

const responseText = await response.text();
console.log("API response:", responseText);

if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${responseText}`);
}

console.log("Push subscription saved successfully.");


} catch (error) {
console.error("Push subscription request failed:", error);
}

};


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


  return (
   <div>
       {
        isModalOpenDelete && 
            <> <TaskHandleDeleteModal 
            isOpen={isModalOpenDelete} closeModal={closeModal} 
            taskDocumentId={taskDocumentId} />
            </>
        
       }
      
        {
            isModalOpenD && taskDocumentStatusId &&
            <> <TaskHandleDisApproveModal 
            isOpen={isModalOpenD} closeModal={closeModal} 
            taskDocumentStatusId={taskDocumentStatusId} employeeId={employeeId}/>
            </>
        }
         {
            isModalOpenA && taskDocumentStatusId &&
            <> <TaskHandleApproveModal 
            isOpen={isModalOpenA} closeModal={closeModal} 
            taskDocumentStatusId={taskDocumentStatusId} employeeId={employeeId}/>
            </>
        }
      

        {/* table */}
        <div className="task-page">
        
                <div className="d-flex gap-5 mb-3">
                    <div className="col-auto">
                        <button
                            onClick={() => handleAddTask()}
                            disabled={isNotClick}
                            className="btn btn-outline-primary"
                            style={{ width: "200px" }}
                        >
                            Create Task
                        </button>
                    </div>
                </div>
                {/* <div className="d-flex gap-5 mb-3">
                    <div className="col-auto">
                        <button
                            onClick={() => subscribeToPush()}
                            disabled={isNotClick}
                            className="btn btn-outline-primary"
                            style={{ width: "200px" }}
                        >
                            Create Push
                        </button>
                    </div>
                </div>
                <div className="d-flex gap-5 mb-3">
                    <div className="col-auto">
                        <button
                            onClick={() => savePushSubscription(empToken)}
                            disabled={isNotClick}
                            className="btn btn-outline-primary"
                            style={{ width: "200px" }}
                        >
                            Create Notifications
                        </button>
                    </div>
                </div> */}
                 <div className="d-flex gap-5 mb-3">
                    <div className="col-auto">
                        <button
                            onClick={() => testPushNotification(empToken)}
                            disabled={isNotClick}
                            className="btn btn-outline-primary"
                            style={{ width: "200px" }}
                        >
                            Push Notifications
                        </button>
                    </div>
                </div>
        
         
        <table id="example" className="table table-striped table-hover">
          <thead className="thead-light text-nowrap">
            <tr >
                <th></th>
                <th>Document Ref Number</th>
                <th>Document Description</th>
                <th>Document Title</th>
                <th>Document File Path</th>
                <th>Due Date</th>
                <th>Created Date</th>
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

               <tr
                    className={
                        rowData.taskDocumentAssignedDepartment
                            ?.find(dept =>
                                dept.taskDocumentStatus?.some(status => status.isActive)
                            )
                            ?.taskDocumentStatus
                            ?.find(status => status.isActive)
                            ?.taskStatusId === 4
                            ? "action-approaching"
                            :  rowData.taskDocumentAssignedDepartment
                            ?.find(dept =>
                                dept.taskDocumentStatus?.some(status => status.isActive)
                            )
                            ?.taskDocumentStatus
                            ?.find(status => status.isActive)
                            ?.taskStatusId === 5 
                            ?""
                            :
                            "action-normal"
                    }
                >
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

                        {
                            rowData.taskDocumentAssignedDepartment
                                ?.find(dept =>
                                    dept.taskDocumentStatus?.some(status => status.isActive)
                                )
                                ?.taskDocumentStatus
                                ?.find(status => status.isActive)
                                ?.taskStatusId !== 5
                                ?    <a
                                style={{ cursor: "pointer" }}
                                onClick={() => handleDelete(rowData.id)}
                            >
                                <i className="bi bi-trash text-danger"></i>
                            </a>
                                : ""
                                
                        }

                        {
                             rowData.taskDocumentAssignedDepartment
                                ?.find(dept =>
                                    dept.taskDocumentStatus?.some(status => status.isActive)
                                )
                                ?.taskDocumentStatus
                                ?.find(status => status.isActive)
                                ?.taskStatusId !== 5
                                ?    <a
                                style={{ cursor: "pointer" }}
                                onClick={() => handleEdit(rowData)}
                            >
                                <i className="bi bi-pencil"></i>
                            </a>
                                : ""
                            
                        }
                     


                        {
                            rowData.forChiefAction &&
                             <a className="btn btn-outline-secondary"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleShowModal(rowData)}
                            >
                            <i className="bi bi-exclamation-diamond"></i>
                            </a>
                        }
                       
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
                                    Assigned Section
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
                                            <th>Modified File</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {rowData.taskDocumentAssignedDepartment?.map(
                                            (dept: taskDocumentAssignedDepartmentBaseModel) => (

                                                <tr key={dept.id}>

                                                    <td>{
                                                        (dept.taskDocumentStatus?.find(
                                                                        (a) => a.isActive === true
                                                                    )?.taskStatusId === 4) && <>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-primary me-2"
                                                            onClick={() => handleApproved(
                                                                        dept.taskDocumentStatus?.find(
                                                                        (a) => a.isActive === true)?.id ?? 0)
                                                                    }
                                                        >
                                                        <i className="bi bi-check-circle"></i>
                                                        </button>
                                                         <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => handleDisApproved(
                                                                        dept.taskDocumentStatus?.find(
                                                                        (a) => a.isActive === true)?.id ?? 0)
                                                                    }
                                                        >
                                                        <i className="bi bi-x-circle"></i>
                                                        </button>
                                                        </>
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
                                                                    )?.taskStatusId === 6
                                                                    ? "#FF474C"
                                                                    : "orange",
                                                        }}
                                                        >
                                                        {(dept.taskDocumentStatus?.length ?? 0) <= 0
                                                            ? "Not Yet Started"
                                                            : 
                                                            dept.taskDocumentStatus?.find((a) => a.isActive === true)?.taskStatus?.documentStatus  
                                                        }
                                                    </td>
                                                   <td style={{ whiteSpace: "wrap" }}>
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
                                                    <td>
                                                        {dept.taskDocumentStatus?.find((a) => a.isActive === true)?.documentFilePath && (
                                                        <a
                                                            type="button"
                                                            className="btn btn-sm btn-primary"
                                                            onClick={() =>
                                                                setSelectedFile(dept.taskDocumentStatus?.find((a) => a.isActive === true)?.documentFilePath ?? null)
                                                            }
                                                        >
                                                            {dept.taskDocumentStatus?.find((a) => a.isActive === true)?.documentFilePath}
                                                        </a>
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
    
            {selectedFile && (
            <HomeFileViewer
                filePath={selectedFile}
                onClose={() => setSelectedFile(null)}
            />
            )}
        </div>
    </div>
  )
}

export default CreateTaskTable