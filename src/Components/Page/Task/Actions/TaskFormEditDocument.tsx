import React, { useEffect, useState } from 'react'
import { useCreateTaskDocumentMutation, useUpdateTaskDocumentStatusAssingedDeptMutation } from '../../../../Api/taskDocumentApi';
import apiResponse from '../../../../Interfaces/apiResponse';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import employeeUserModelDropDown from '../../../../Interfaces/employeeUserModelDropDown';
import taskDocumentDropdown from '../../../../Interfaces/taskDocumentDropdown';
import departmentModel from '../../../../Interfaces/BaseModel/departmentModel';
import officeBaseModel from '../../../../Interfaces/BaseModel/officeBaseModel';
import { registrySectionModel } from '../../../../Interfaces/BaseModel/registrySectionModel';
import { taskDocumentBaseModel } from '../../../../Interfaces/BaseModel/taskDocumentBaseModel';
import HomeFileViewer from '../../../../Pages/Viewer/HomeFileViewer';
 interface props {
        employeeId:number,
        dropdownListData:taskDocumentDropdown,
        taskDocumentData: taskDocumentBaseModel,
       
}
function TaskFormEditDocument({employeeId,dropdownListData,taskDocumentData}:props) {
    //console.log(employeeId);
    //console.log(dropdownListData);
    //console.log(taskDocumentData);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const[createDocument] = useUpdateTaskDocumentStatusAssingedDeptMutation();
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const [input, setInput] = useState({
       taskDocumentId:taskDocumentData.id,
       documentRefNumber:taskDocumentData.documentRefNumber,
       documentTitle:taskDocumentData.documentTitle,
       documentDescription:taskDocumentData.documentDescription,
       remarks:"",
       dateCreated:taskDocumentData.dateCreated,
       dueDate: taskDocumentData.dueDate
              ? taskDocumentData.dueDate.split("T")[0]
              : "",
       isActive:taskDocumentData.isActive,
       createdByEmployeeId:taskDocumentData.createdByEmployeeId,
       documentFilePath:taskDocumentData.documentFilePath,
       officeId:taskDocumentData.officeId,
       registrySectionId:taskDocumentData.registrySectionId,
       assignedDepartmenIds:[] as number[],
       forChiefAction:taskDocumentData.forChiefAction,
    });

   const assignedDepartmentIds = input?.assignedDepartmenIds ?? [];


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        
        e.preventDefault();
        if (loading) {return;} // Prevent multiple clicks
        setLoading(true);
        try 
        {
          
            const formData = new FormData(); 
            formData.append( "taskDocumentId", input.taskDocumentId.toString() ); 
            formData.append( "documentRefNumber", input.documentRefNumber.toString() ); 
            formData.append( "documentTitle", input.documentTitle ?? "" ); 
            formData.append( "documentDescription", input.documentDescription ?? "" ); 
            formData.append( "dateCreated", input.dateCreated ); 
            formData.append( "dueDate", input.dueDate ); 
            formData.append( "isActive", input.isActive.toString() ); 
            formData.append( "officeId", input?.officeId?.toString()); 
            formData.append( "registrySectionId", input?.registrySectionId?.toString()); 
            formData.append( "remarks", input?.remarks); 
            formData.append( "forChiefAction", input?.forChiefAction?.toString());
            formData.append( "documentFilePath", input?.documentFilePath ?? "");
            formData.append( "createdByEmployeeId", input.createdByEmployeeId.toString() );
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
                taskDocumentId:0,
                documentRefNumber: 0, 
                documentTitle: "", 
                documentDescription: "", 
                dateCreated: today, 
                dueDate: today, 
                isActive: true, 
                createdByEmployeeId: 0,
                documentFilePath: "",
                officeId:0,
                remarks:"",
                registrySectionId:0,
                forChiefAction:false,
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
    <div className='container mb-3 pb-5'>
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
                    value={input.documentTitle ?? ""}
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
                    value={input.documentDescription ?? ""}
                    onChange={handleUserInput}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dueDate" className="col-form-label">Due Date</label>
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
               value={input?.forChiefAction == true ? "true" : "false"}
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
              className={`form-select ${
                loading && input.assignedDepartmenIds.length === 0
                  ? "is-invalid"
                  : ""
              }`}
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
           {/* {loading && input.assignedDepartmenIds.length === 0 && (
            <div className="invalid-feedback">
              Please select at least one section.
            </div>
          )}
            */}
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
                    <label htmlFor="documentFile" className="form-label" > Document File :{" "}</label> 
                     {input.documentFilePath && (
                        <a
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() =>
                                setSelectedFile(input.documentFilePath ?? null)
                            }
                        >
                            {input.documentFilePath}
                        </a>
                        )}
                    <input type="file"  id="documentFile" name="file" className="form-control" onChange={handleFileChange}/> 
                    {file && ( <div className="mt-2"> <small className="text-muted"> Selected file: {file.name} </small> </div> )} 
                </div>
             
                <button type="submit" className="btn btn-primary w-100 mb-5" disabled={loading}>
                  Submit
                </button>
              </form>

            {selectedFile && (
            <HomeFileViewer
                filePath={selectedFile}
                onClose={() => setSelectedFile(null)}
            />
            )}

    </div>

  )
}

export default TaskFormEditDocument