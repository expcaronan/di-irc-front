import React, { useEffect, useState } from 'react'
import { useCreateCalendarEventMutation, useGetDetailsDropdownListQuery } from '../../../../Api/calendarEventApi';
import calendarDeptEmpModel from '../../../../Interfaces/CalendarModel/calendarDeptEmpModel';
import calendarEmployeeModel from '../../../../Interfaces/CalendarModel/calendarEmployeeModel';
import calendarDepartmentModel from '../../../../Interfaces/CalendarModel/calendarDepartmentModel';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
interface props{
  calendarDeptData:calendarDeptEmpModel
  onSuccess: () => void;
}
function AddEventForm({calendarDeptData,onSuccess}:props) {

const [loading, setLoading] =useState(false);

 const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
           const { name, value } = e.target;
           let processedValue: any = value;
           setInput((prev) => ({
             ...prev,
             [name]: processedValue
           }));
  };
const navigate = useNavigate();
 
const [input, setInput] = useState({
           title:"",
           color:"purple",
           dateStart:new Date().toISOString().split('T')[0],
           dateEnd:new Date().toISOString().split('T')[0],
           timeStart:"17:00",
           timeEnd:"18:00",
           departmentIds:[] as number[],
           employeedIds:[] as number[],
});
const [createCalendarEvent] = useCreateCalendarEventMutation();

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
            e.preventDefault();
              if (loading) return; // Prevent multiple clicks
           // if(input.invoiceNUmber == "") return;
            setLoading(true);
            try {
              
            const response =  await createCalendarEvent(input).unwrap(); 
           
             if(response?.isSuccess == true){
                 
                    const modal = document.getElementById('exampleModalAddEmp');
                    if (modal) {
                        toast.success('Successfully Created!', {
                            position: "top-right", 
                            autoClose: 5000, 
                          });
            
                       onSuccess();
                        navigate("/calendar");
                    }        
                    
                    }else if(response?.exist == true){
                      toast.error('Data already exist!', {
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
              console.error('Error:', error);
             
            } finally {
              setLoading(false);
            }
        }

     

  return (
    <div>
    
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                   
                  <label htmlFor="title" className="col-form-label">Title</label>
                  <input type="text" className="form-control" 
                  required
                  name='title'
                  value={input.title}
                  onChange={handleUserInput}
                  />
                <label htmlFor="recipient-name" className="col-form-label">Select Color</label>
                  <select
                    required
                    className="form-group form-select"
                    name='color'
                    value={input.color}
                    onChange={handleUserInput}
                  >
                    <option value={"purple"}>purple</option>
                    <option value={"gray"}>gray</option>
                    <option value={"orange"}>orange</option>
                    <option value={"blue"}>blue</option>
                    <option value={"pink"}>pink</option>
                    <option value={"green"}>green</option>
                  </select>
                    <label htmlFor="recipient-name" className="col-form-label">Date Start</label>
                      </div>
                      <div className='col-md-8'>
                        <input type="date" className="form-control datepicker"
                          name='dateStart'
                          required
                          value={input.dateStart}
                          onChange={handleUserInput}
                    />
                    <label htmlFor="recipient-name" className="col-form-label">Date End</label>
                      </div>
                      <div className='col-md-8'>
                        <input type="date" className="form-control datepicker"
                          name='dateEnd'
                          required
                          value={input.dateEnd}
                          onChange={handleUserInput}
                    />
                    <label htmlFor="recipient-name" className="col-form-label">Time Start</label>
                      </div>
                      <div className='col-md-8'>
                        <input type="time" className="form-control datepicker"
                          name='timeStart'
                          required
                          value={input.timeStart}
                          onChange={handleUserInput}
                    />
                     <label htmlFor="recipient-name" className="col-form-label">Time End</label>
                      </div>
                      <div className='col-md-8'>
                        <input type="time" className="form-control datepicker"
                          name='timeEnd'
                          required
                          value={input.timeEnd}
                          onChange={handleUserInput}
                        />
                      </div>

                      <div className="mb-3">
                        
                        <label
                          htmlFor="departmenIds"
                          className="col-form-label"
                        >
                          Select Sections
                        </label>
                      
                        {/* Dropdown */}
                        <select
                          id="departmentIds"
                          className="form-select"
                          value=""
                          onChange={(e) => {
                            const selectedId = Number(e.target.value);
                            if (!selectedId) return;
                      
                            setInput((prev) => ({
                              ...prev,
                              departmentIds: [
                                ...prev.departmentIds,
                                selectedId
                              ]
                            }));
                          }}
                        >
                          <option value="">Select Sections...</option>
                          {calendarDeptData?.calendarDepartments
                            ?.filter(
                              (dept: calendarDepartmentModel) =>
                                !input.departmentIds.includes(dept.departmentId)
                            )
                            .map((dept: calendarDepartmentModel) => (
                              <option
                                key={dept.departmentId}
                                value={dept.departmentId}
                              >
                                {dept.departmentName}
                              </option>
                            ))}
                        </select>
                      
                        {/* Selected departments */}
                        <div className="mt-2 d-flex flex-wrap gap-2">
                          {input.departmentIds.map((id) => {
                            const dpt = calendarDeptData?.calendarDepartments.find(
                              (dpt: calendarDepartmentModel) => dpt.departmentId === id
                            );
                      
                            if (!dpt) return null;
                      
                            return (
                              <div
                                key={dpt.departmentId}
                                className="border rounded px-2 py-1 d-flex align-items-center bg-light"
                              >
                                {/* X button */}
                                <button
                                  type="button"
                                  className="btn btn-sm p-0 me-2 text-danger"
                                  onClick={() => {
                                    setInput((prev) => ({
                                      ...prev,
                                      departmentIds:
                                        prev.departmentIds.filter(
                                          (dptId) => dptId !== id
                                        )
                                    }));
                                  }}
                                >
                                  ×
                                </button>
                                <span>
                                  {dpt.departmentName}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>


                      <div className="mb-3">
                        <label
                          htmlFor="employeedIds"
                          className="col-form-label"
                        >
                          Select Employees
                        </label>
                      
                        {/* Dropdown */}
                        <select
                          id="employeedIds"
                          className="form-select"
                          value=""
                          onChange={(e) => {
                            const selectedId = Number(e.target.value);
                            if (!selectedId) return;
                      
                            setInput((prev) => ({
                              ...prev,
                              employeedIds: [
                                ...prev.employeedIds,
                                selectedId
                              ]
                            }));
                          }}
                        >
                          <option value="">Select Employee...</option>
                          {calendarDeptData?.calendarEmployees
                            ?.filter(
                              (dept: calendarEmployeeModel) =>
                                !input.employeedIds.includes(dept.employeeId)
                            )
                            .map((dept: calendarEmployeeModel) => (
                              <option
                                key={dept.employeeId}
                                value={dept.employeeId}
                              >
                                {dept.fullName}
                              </option>
                            ))}
                        </select>
                      
                        {/* Selected departments */}
                        <div className="mt-2 d-flex flex-wrap gap-2">
                          {input.employeedIds.map((id) => {
                            const dpt = calendarDeptData?.calendarEmployees.find(
                              (dpt: calendarEmployeeModel) => dpt.employeeId === id
                            );
                      
                            if (!dpt) return null;
                      
                            return (
                              <div
                                key={dpt.employeeId}
                                className="border rounded px-2 py-1 d-flex align-items-center bg-light"
                              >
                                {/* X button */}
                                <button
                                  type="button"
                                  className="btn btn-sm p-0 me-2 text-danger"
                                  onClick={() => {
                                    setInput((prev) => ({
                                      ...prev,
                                      employeedIds:
                                        prev.employeedIds.filter(
                                          (dptId) => dptId !== id
                                        )
                                    }));
                                  }}
                                >
                                  ×
                                </button>
                                {/* Employee name */}
                                <span>
                                  {dpt.fullName}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
               
            
                 <div className="modal-footer">
                 {
                 <button type="submit" className="btn btn-primary" disabled={loading}>Submit</button>
                  
              }{
                //loading && <Loader/>
              }
            </div>
              </form>
      </div>
   
  )
}

export default AddEventForm