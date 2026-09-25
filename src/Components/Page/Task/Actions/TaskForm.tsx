import React, { useState } from 'react'
import { useCreateTaskDocumentMutation } from '../../../../Api/taskDocumentApi';
import apiResponse from '../../../../Interfaces/apiResponse';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
 interface props {
        employeeId:number
}
function TaskForm({employeeId}:props) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const[createDocument] = useCreateTaskDocumentMutation();
    const [input, setInput] = useState({
       documentRefNumber:"",
       documentTitle:"",
       documentDescription:"",
       dateCreated:new Date().toISOString().split('T')[0],
       dueDate:new Date().toISOString().split('T')[0],
       isActive:true,
       createdByEmployeeId:employeeId,
       documentFilePath:"",
      
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        
        e.preventDefault();
        if (loading) return; // Prevent multiple clicks
            setLoading(true);
        try 
        {
          
            const formData = new FormData(); 
            formData.append( "documentRefNumber", input.documentRefNumber ); 
            formData.append( "documentTitle", input.documentTitle ); 
            formData.append( "documentDescription", input.documentDescription ); 
            formData.append( "dateCreated", input.dateCreated ); 
            formData.append( "dueDate", input.dueDate ); 
            formData.append( "isActive", input.isActive.toString() ); 
            formData.append( "createdByEmployeeId", input.createdByEmployeeId.toString() );
            if (file) { 
                formData.append("file", file); 
            }

            const response:apiResponse =  await createDocument(formData) 
            console.log(response);
            if(response.data?.isSuccess == true){
                toast.success('Task Document Created Successfully!', {
                    position: "top-right", 
                    autoClose: 5000, 
                  });
                const today = new Date().toISOString().split('T')[0];
                setInput({ 
                documentRefNumber: "", 
                documentTitle: "", 
                documentDescription: "", 
                dateCreated: today, 
                dueDate: today, 
                isActive: true, 
                createdByEmployeeId: 0,
                documentFilePath: "" }); 
                setFile(null); 
                navigate("/task/create");
            }else if(response.data?.exist == true){
                toast.error('Document Already Exist', {
                    position: "top-right", 
                    autoClose: 5000, 
                });
            }
            else{
                toast.error('Something went wrong!', {
                  position: "top-right", 
                  autoClose: 5000, 
                });
            }

            
                  
        } catch (error) {
                toast.error('something went wrong catch!', {
                    position: "top-right", 
                    autoClose: 5000, 
                });
        } finally
        {
            
            setLoading(false);
        }
    }
   
    const handleFileChange = ( e: React.ChangeEvent<HTMLInputElement> ) => { 
        const selectedFile = e.target.files?.[0] ?? null; setFile(selectedFile); 
    };

   const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
     const { name, value } = e.target;
     let processedValue: any = value;
     setInput((prev) => ({
       ...prev,
       [name]: processedValue
     }));
   };
  return (
    <div>
         <h3>Document Creation</h3>
              <form onSubmit={handleSubmit} className="p-3 border rounded">
                <div className="mb-3">
                  <label className="form-label">Document Ref Number</label>
                  <input
                    type="text"
                    name="documentRefNumber"
                    className="form-control"
                    value={input.documentRefNumber}
                    onChange={handleUserInput}
                    required
                  />
                </div>
        
                <div className="mb-3">
                  <label className="form-label">Document Title</label>
                  <input
                    type="text"
                    name="documentTitle"
                    className="form-control"
                    value={input.documentTitle}
                    onChange={handleUserInput}
                    required
                  />
                </div>
        
                <div className="mb-3">
                  <label className="form-label">Document Description</label>
                  <input
                    type="documentDescription"
                    name="documentDescription"
                    className="form-control"
                    value={input.documentDescription}
                    onChange={handleUserInput}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="birthDay" className="col-form-label">Due Date</label>
                  <input
                    type="date"
                    className="form-control datepicker"
                    name="dueDate"
                    required
                    value={input.dueDate}
                    onChange={handleUserInput}
                  />
                </div>

                <div className="mb-3"> 
                    <label htmlFor="documentFile" className="form-label" > Document File </label> 
                    <input type="file" id="documentFile" name="file" className="form-control" onChange={handleFileChange} required /> 
                    {file && ( <div className="mt-2"> <small className="text-muted"> Selected file: {file.name} </small> </div> )} 
                </div>
             
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>

    </div>

  )
}

export default TaskForm