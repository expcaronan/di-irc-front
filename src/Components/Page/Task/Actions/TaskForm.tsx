import React, { useEffect, useState } from 'react'
import { useCreateTaskDocumentMutation } from '../../../../Api/taskDocumentApi';
import apiResponse from '../../../../Interfaces/apiResponse';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import employeeUserModelDropDown from '../../../../Interfaces/employeeUserModelDropDown';
import taskDocumentDropdown from '../../../../Interfaces/taskDocumentDropdown';
import departmentModel from '../../../../Interfaces/BaseModel/departmentModel';
import officeBaseModel from '../../../../Interfaces/BaseModel/officeBaseModel';
import { registrySectionModel } from '../../../../Interfaces/BaseModel/registrySectionModel';
 interface props {
        employeeId:number,
        dropdownListData:taskDocumentDropdown
}
function TaskForm({employeeId,dropdownListData}:props) {
    //console.log(dropdownListData.offices);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const[createDocument] = useCreateTaskDocumentMutation();


    const [input, setInput] = useState({
       documentRefNumber:"",
       documentTitle:"",
       documentDescription:"",
       remarks:"",
       dateCreated:new Date().toISOString().split('T')[0],
       dueDate:new Date().toISOString().split('T')[0],
       isActive:true,
       createdByEmployeeId:employeeId,
       documentFilePath:"",
       officeId:"",
       registrySectionId:"",
       assignedDepartmenIds:[] as number[],
       forChiefAction:"",
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
            formData.append( "officeId", input.officeId ); 
            formData.append( "registrySectionId", input.registrySectionId); 
            formData.append( "remarks", input.remarks); 
            formData.append( "forChiefAction", input.forChiefAction);
            formData.append( "createdByEmployeeId", input.createdByEmployeeId.toString() );
            // formData.append("assignedEmployeeIds", JSON.stringify(input.assignedEmployeeIds));
            input.assignedDepartmenIds.forEach((employeeId) => {
            formData.append("assignedDepartmenIds", employeeId.toString());
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
                officeId:"",
                remarks:"",
                registrySectionId:"",
                forChiefAction:"",
                assignedDepartmenIds:[]}); 
                setFile(null); 
                navigate("/task/document/list");
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
    <div className="task-form-container">
    
    <div className="task-form-header">
      <h3>Document Creation</h3>
    </div>

    <div className="task-page">
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
 <label htmlFor="forChiefAction" className="col-form-label">Chief Approval</label>
             <select
               required
               className="form-group form-select"
               name='forChiefAction'
               value={input.forChiefAction}
               onChange={handleUserInput}
               >
               <option value="">-=Chief Approval=-</option>
               <option value="false">No</option>
               <option value="true">Yes</option>
           </select>  
</div>

<div className="mb-3">
  

  <label
    htmlFor="assignedEmployeeIds"
    className="col-form-label"
  >
    Assign Sections
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
        assignedDepartmenIds: [
          ...prev.assignedDepartmenIds,
          selectedId
        ]
      }));
    }}
  >
    <option value="">Select Sections...</option>

    {dropdownListData.departments
      ?.filter(
        (dept: departmentModel) =>
          !input.assignedDepartmenIds.includes(dept.id)
      )
      .map((dept: departmentModel) => (
        <option
          key={dept.id}
          value={dept.id}
        >
          {dept.departmentName}
        </option>
      ))}
  </select>

  {/* Selected departments */}
  <div className="mt-2 d-flex flex-wrap gap-2">
    {input.assignedDepartmenIds.map((id) => {
      const dpt = dropdownListData.departments.find(
        (dpt: departmentModel) => dpt.id === id
      );

      if (!dpt) return null;

      return (
        <div
          key={dpt.id}
          className="border rounded px-2 py-1 d-flex align-items-center bg-light"
        >
          {/* X button */}
          <button
            type="button"
            className="btn btn-sm p-0 me-2 text-danger"
            onClick={() => {
              setInput((prev) => ({
                ...prev,
                assignedDepartmenIds:
                  prev.assignedDepartmenIds.filter(
                    (dptId) => dptId !== id
                  )
              }));
            }}
          >
            ×
          </button>

          {/* Employee name */}
          <span>
            {dpt.departmentName}
          </span>
        </div>
      );
    })}
  </div>
</div>


    <label htmlFor="recipient-name" className="col-form-label">Select Office</label>
             <select
               required
               className="form-group form-select"
               name='officeId'
               value={input.officeId}
               onChange={handleUserInput}
               >
               <option value="">-=Offices=-</option>
               {dropdownListData.offices?.map((option: officeBaseModel, index: number) => (
               <option key={option.id} value={option.id}>
                   {option.description}
               </option>
               ))}
           </select>  

    <label htmlFor="recipient-name" className="col-form-label">Select Registry Section</label>
             <select
               required
               className="form-group form-select"
               name='registrySectionId'
               value={input.registrySectionId}
               onChange={handleUserInput}
               >
               <option value="">-=Registry=-</option>
               {dropdownListData.registrySections?.map((option: registrySectionModel, index: number) => (
               <option key={option.id} value={option.id}>
                   {option.details}
               </option>
               ))}
    </select>  

  <div className="mb-3">
                  <label className="form-label">Remarks</label>
                  <textarea
                    
                    name="remarks"
                    className="form-control"
                    value={input.remarks}
                    onChange={handleUserInput}                  
                  />
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
    </div>

  )
}

export default TaskForm