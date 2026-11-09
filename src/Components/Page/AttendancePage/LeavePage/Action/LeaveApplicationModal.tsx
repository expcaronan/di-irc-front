import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import EmployeeUserModel from '../../../../../Interfaces/EmployeeUserModel';
import getDifferenceInDays from '../../../../../Helpers/getDifferenceInDays';
import { useCreateLeaveApplicationMutation } from '../../../../../Api/leaveApplicationApi';
import apiResponse from '../../../../../Interfaces/apiResponse';
interface Props {
    isOpen: boolean; 
    closeModal: () => void; 
    userDetails:EmployeeUserModel
  }

function LeaveApplicationModal({ isOpen, closeModal,userDetails }: Props) {
      const [loading, setLoading] =useState(false);
       useEffect(() => {
          if (isOpen) {
            // Manually trigger modal to open
            const modal = document.getElementById('exampleModalAddLeave');
            if (modal) {
              modal.classList.add('show');
              modal.style.display = 'block';
              document.body.classList.add('modal-open');
            }
          }else{
              const modal = document.getElementById('exampleModalAddLeave');
              if (modal) {
                modal.classList.remove('show');
                modal.setAttribute('aria-modal', 'false');
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
               
              }
            }
        }, [isOpen]);

        const [creteLeave] = useCreateLeaveApplicationMutation();

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
            e.preventDefault();
            if (loading) return; 

           // if(input.invoiceNUmber == "") return;
            setLoading(true);
            try {
                  const response:apiResponse = await creteLeave({
                            employeeId:userDetails.employeeId,
                            dateApplication:new Date(),
                            startDate:input.startDate,
                            endDate:input.endDate,
                            leaveTypeId:input.leaveTypeId,
                            status:false,
                            approverId:0,
                            reason:input.reason,
                            totalDays:getDifferenceInDays(input.startDate, input.endDate),
                          });
                        //console.log(response);
                        if(response?.data?.isSuccess == true){
                         
                            const modal = document.getElementById('exampleModalAddLeave');
                           
                            if (modal) {
                                toast.success('Applied Successfully!', {
                                    position: "top-right", 
                                    autoClose: 5000, 
                                  });
                    
                                  closeModal();
                            }        
                            
                            }else if(response.data?.exist == true){
                              toast.error('already exist!', {
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

const [input, setInput] = useState({
   employeeId:userDetails.employeeId,
   dateApplication:new Date(),
   startDate:"",
   endDate:"",
   leaveTypeId:1,
   status:false,
   approverId:0,
   reason:"",
   totalDays:"",

});


const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  let processedValue: any = value;
  setInput((prev) => ({
    ...prev,
    [name]: processedValue
  }));
};
            

  return (
   <div className={`modal fade ${isOpen ? 'show' : ''}`} id="exampleModalAddLeave" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!isOpen}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Apply Leave</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                   
                  
                        <label htmlFor="leaveTypeId" className="col-form-label">Select Leave Type</label>
                        <select
                           required
                           className="form-group form-select"
                           name='leaveTypeId'
                           value={input.leaveTypeId}
                           onChange={handleUserInput}
                           >
                           <option value={1}>Vacation Leave</option>
                           <option value={2}>Sick Leave</option>
                           <option value={3}>Wellnes Leave</option>
                           <option value={4}>Paternity Leave</option>
                           <option value={5}>Maternity Leave</option>
                           <option value={6}>Solo Parent Leave</option>
                           <option value={7}>Leave Without Pay</option>
                        </select>
                 
                    <label htmlFor="startDate" className="col-form-label">Start Date</label>
                      </div>
                      <div className='col-md-8'>
                        <input type="date" className="form-control datepicker"
                          name='startDate'
                          required
                          value={input.startDate}
                          onChange={handleUserInput}
                    />
                    
                    <label htmlFor="endDate" className="col-form-label">End Date</label>
                      </div>
                      <div className='col-md-8'>
                        <input type="date" className="form-control datepicker"
                          name='endDate'
                          required
                          value={input.endDate}
                          onChange={handleUserInput}
                    />
                    <label htmlFor="reason" className="col-form-label"></label>
                    <textarea className="form-control" 
                    required
                    name='reason'
                    value={input.reason}
                    onChange={handleUserInput}
                    />
                    
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
           
          </div>
        </div>
      </div>
  )
}

export default LeaveApplicationModal