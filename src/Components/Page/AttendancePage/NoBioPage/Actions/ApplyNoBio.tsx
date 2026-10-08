import React, { useEffect, useState } from 'react'

import { toast } from 'react-toastify';
import { AttendanceRecordModel } from '../../../../../Interfaces/AttendanceRecordModel';
import { useEmployeeTimeoutMutation } from '../../../../../Api/attendanceApi';
import apiResponse from '../../../../../Interfaces/apiResponse';
import MainLoader from '../../../../Common/MainLoader';

interface props {
    isOpen: boolean; 
    closeModal: () => void; 
    attendance:AttendanceRecordModel;
   
  }
function ApplyNobio({isOpen,closeModal,attendance}:props) {
    const [loading, setLoading] =useState(false);
    const [applyNoBio] =useEmployeeTimeoutMutation();
      const [input, setInput]  = useState({
            id:attendance.id,
            employeeId:attendance.employeeId,
            date:attendance.date,
            timeOut: attendance.timeOut,
            timeIn:attendance.timeIn,
            isApprove:attendance.isApprove,
            noBioReason:"",
    })
      useEffect(() => {
          if (isOpen) {
            // Manually trigger modal to open
            const modal = document.getElementById('exampleModalAddEmp');
            if (modal) {
              modal.classList.add('show');
              modal.style.display = 'block';
              document.body.classList.add('modal-open');
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
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
          if (loading) return; // Prevent multiple clicks
       // if(input.invoiceNUmber == "") return;
        setLoading(true);
        try {
          // Your async operation here, e.g., adding to the database
          //console.log(input);
       const response:apiResponse = await applyNoBio({
            id:input.id,
            employeeId:input.employeeId,
            date:input.date,
            timeOut: input.timeOut,
            timeIn:input.timeIn,
            isApprove:false,
            noBioReason:input.noBioReason
          });
        //console.log(input);
        if(response.data?.isSuccess == true){
         
            const modal = document.getElementById('exampleModalAddEmp');
           
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
    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
    
      let processedValue: any = value;
    
      setInput((prev) => ({
        ...prev,
        [name]: processedValue
      }));
    };
    
  return (
    <div className={`modal fade ${isOpen ? 'show' : ''}`} id="exampleModalAddEmp" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!isOpen}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Application for No Bio</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="timeIn" className="col-form-label">Time In</label>
                    <div className='col-md-8'>
                    <input
                        type="datetime-local"
                        className="form-control"
                        name="timeIn"
                        required
                        value={input.timeIn}
                        onChange={handleUserInput}
                    />
                    </div>
                      <label htmlFor="timeOut" className="col-form-label">Time Out</label>
                    <div className='col-md-8'>
                    <input
                        type="datetime-local"
                        className="form-control"
                        name="timeOut"
                        required
                        value={input.timeOut ?? ""}
                        onChange={handleUserInput}
                    />
                    </div>
                     {/* <div className='col-md-8'>
                                        <label htmlFor="recipient-name" className="col-form-label">Select Shift</label>
                                        <select
                                          required
                                          className="form-group form-select"
                                          name='shiftId'
                                          value={input.shiftId}
                                          onChange={handleUserInput}
                                        >
                                          <option value="">-=Shift=-</option>
                    
                                          <option key={1} value={1}>
                                            {formatShift(8, 17)}
                                          </option>
                                          <option key={2} value={2}>
                                            {formatShift(15, 0)}
                                          </option>
                                          <option key={3} value={3}>
                                            {formatShift(20, 5)}
                                          </option>
                    
                                        </select>
                                      </div> */}
                  <div className='col-md-8'>
                       <label htmlFor="noBioReason" className="col-form-label">Reason</label>
                  <input type="text" className="form-control" 
                  required
                   name='noBioReason'
                   value={input.noBioReason}
                   onChange={handleUserInput}
                  />
                  </div>
                </div>
            
                 <div className="modal-footer">
                 {
                 <button type="submit" className="btn btn-primary" disabled={loading}>Submit</button>
                  
              }{
                loading && <MainLoader/>
              }
            </div>
              </form>
            </div>
           
          </div>
        </div>
      </div>
  )
}

export default ApplyNobio
