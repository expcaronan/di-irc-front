import React, { useEffect, useState } from 'react'

import { toast } from 'react-toastify';
import { attendanceWithEmp } from '../../../../../../Interfaces/attendanceWithEmp';
import apiResponse from '../../../../../../Interfaces/apiResponse';
import MainLoader from '../../../../../Common/MainLoader';
import { useEmployeeTimeoutMutation } from '../../../../../../Api/attendanceApi';
interface props {
    isOpen: boolean; 
    closeModal: () => void; 
    attendance:attendanceWithEmp;
  }
function ApplyNobioApproval({isOpen,closeModal,attendance}:props) {
    const [loading, setLoading] =useState(false);
    const [applyNoBio] =useEmployeeTimeoutMutation();
      const [input, setInput]  = useState({
            id:attendance.id,
            employeeId:attendance.employeeId,
            date:attendance.date,
            timeOut: attendance.timeOut,
            timeIn:attendance.timeIn,
            isApprove:attendance.isApprove,
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
            isApprove:true,
          });
       // console.log(input);
        if(response.data?.isSuccess == true){
         
            const modal = document.getElementById('exampleModalAddEmp');
           
            if (modal) {
                toast.success('Approved Successfully!', {
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
    
     const handleClose = () =>{
     
        closeModal();
      }
  return (
    <div className={`modal fade ${isOpen ? 'show' : ''}`} id="exampleModalAddEmp" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!isOpen}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"></h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                
                    <h3>Approve No Bio?</h3>
                </div>
            
                 <div className="modal-footer">
                 {
                 <button type="submit" className="btn btn-primary" disabled={loading}>Yes</button>
              }
                {
                <button type='button' onClick={handleClose} className="btn btn-primary" disabled={loading}>No</button> 
              }
              {
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

export default ApplyNobioApproval
