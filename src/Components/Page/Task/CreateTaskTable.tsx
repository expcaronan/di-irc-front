import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { taskDocumentBaseModel } from '../../../Interfaces/BaseModel/taskDocumentBaseModel';
import formatDate from '../../../Helpers/formatDate';
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
         <tbody style={{whiteSpace:'nowrap'}} className='position-relative'>
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
           
           </tbody>
        </table>
    </div>

    </div>
  )
}

export default CreateTaskTable