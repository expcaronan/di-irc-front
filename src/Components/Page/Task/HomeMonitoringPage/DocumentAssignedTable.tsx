import React from 'react'
import { taskDocumentAssignedEmployeeBaseModel } from '../../../../Interfaces/BaseModel/taskDocumentAssignedEmployeeBaseModel'
import formatDate from '../../../../Helpers/formatDate';
interface props{
    documentList:taskDocumentAssignedEmployeeBaseModel[]
}
function DocumentAssignedTable({documentList}:props) {
console.log(documentList);

const handleDelete = (id: number) => {

};

  return (
     <div>
          <table id="example" className="table table-striped table-hover">
          <thead className="thead-light text-nowrap">
            <tr>
                <th></th>
                <th>Employee Name</th>
                <th>Document Ref Number</th>
                <th>Document Title</th>
                <th>Document FilePath</th>
                <th>Due Date</th>
              
            
            </tr>
        </thead>
         <tbody style={{whiteSpace:'nowrap'}} className='position-relative'>
            {documentList.map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                    <td>
                        <a style={{cursor:'pointer'}} 
                        onClick={() => handleDelete(rowData.id)}>
                        <i className="bi bi-trash"></i></a> 
                    </td>
                    <td>{rowData?.employee?.firstName+" "+rowData?.employee?.lastName}</td>
                    <td>{rowData?.taskDocument?.documentRefNumber}</td>
                    <td>{rowData?.taskDocument?.documentTitle}</td>
                    <td>{rowData?.taskDocument?.documentFilePath}</td>
                    <td>{formatDate(rowData?.taskDocument?.dueDate)}</td>

                
                    {/* <td>{formatDate(rowData.birthDay)}</td>
                    <td>{formatDate(rowData.dateHired)}</td>      */}
                </tr>
                
            ))}
           
           </tbody>
        </table>
    </div>
  )
}

export default DocumentAssignedTable