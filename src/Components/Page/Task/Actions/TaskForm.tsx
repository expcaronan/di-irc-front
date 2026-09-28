import React, { useEffect, useState } from 'react'
import { useCreateTaskDocumentMutation } from '../../../../Api/taskDocumentApi';
import apiResponse from '../../../../Interfaces/apiResponse';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import EmployeeUserModel from '../../../../Interfaces/EmployeeUserModel';
import { useGetEmpUserListQuery } from '../../../../Api/userEmpApi';
 interface props {
        employeeId:number,
        dropdownListData:EmployeeUserModel[]
}
function TaskForm({employeeId,dropdownListData}:props) {
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
       assignedEmployeeIds:[] as number[]
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
            // formData.append("assignedEmployeeIds", JSON.stringify(input.assignedEmployeeIds));
            input.assignedEmployeeIds.forEach((employeeId) => {
            formData.append("assignedEmployeeIds", employeeId.toString());
            });
            if (file) { 
                formData.append("file", file); 
            }
            for (const [key, value] of formData.entries()) {
            console.log(key, value);
}
            //console.log(formData);

            const response:apiResponse =  await createDocument(formData) 
            
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
                documentFilePath: "",
                assignedEmployeeIds:[]}); 
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
  <label
    htmlFor="assignedEmployeeIds"
    className="col-form-label"
  >
    Assign Researchers
  </label>

  {/* Dropdown */}
  <select
    id="assignedEmployeeIds"
    className="form-select"
    value=""
    onChange={(e) => {
      const selectedId = Number(e.target.value);

      if (!selectedId) return;

      setInput((prev) => ({
        ...prev,
        assignedEmployeeIds: [
          ...prev.assignedEmployeeIds,
          selectedId
        ]
      }));
    }}
  >
    <option value="">Select researcher...</option>

    {dropdownListData
      ?.filter(
        (employee: EmployeeUserModel) =>
          !input.assignedEmployeeIds.includes(employee.id)
      )
      .map((employee: EmployeeUserModel) => (
        <option
          key={employee.id}
          value={employee.id}
        >
          {employee.firstName} {employee.lastName}
        </option>
      ))}
  </select>

  {/* Selected researchers */}
  <div className="mt-2 d-flex flex-wrap gap-2">
    {input.assignedEmployeeIds.map((id) => {
      const employee = dropdownListData?.find(
        (employee: EmployeeUserModel) => employee.id === id
      );

      if (!employee) return null;

      return (
        <div
          key={employee.id}
          className="border rounded px-2 py-1 d-flex align-items-center bg-light"
        >
          {/* X button */}
          <button
            type="button"
            className="btn btn-sm p-0 me-2 text-danger"
            onClick={() => {
              setInput((prev) => ({
                ...prev,
                assignedEmployeeIds:
                  prev.assignedEmployeeIds.filter(
                    (employeeId) => employeeId !== id
                  )
              }));
            }}
          >
            ×
          </button>

          {/* Employee name */}
          <span>
            {employee.firstName} {employee.lastName}
          </span>
        </div>
      );
    })}
  </div>
</div>



                {/* <div className="mb-3">
                  <label htmlFor="assignedEmployeeIds" className="col-form-label">Assign Ressearchers</label>
                  <select
                      id="departments"
                      required
                      multiple
                      className="form-select"
                      name="assignedEmployeeIds"
                      value={input.assignedEmployeeIds.map(String)}
                      onChange={(e) => {
                        const selectedIds = Array.from(
                          e.target.selectedOptions,
                          option => Number(option.value)
                        );

                        setInput(prev => ({
                          ...prev,
                          assignedEmployeeIds: selectedIds
                        }));
                      }}
                    >
                      {dropdownListData?.map(
                        (option: EmployeeUserModel) => (
                          <option
                            key={option.id}
                            value={option.id}
                          >
                            {option.firstName+" "+option.lastName+" "+option.id}
                          </option>
                        )
                      )}
                  </select> 
                </div> */}



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