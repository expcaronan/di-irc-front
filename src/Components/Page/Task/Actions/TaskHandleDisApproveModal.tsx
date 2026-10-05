import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MainLoader from '../../../Common/MainLoader';
import { taskDocumentAssignedDepartmentBaseModel } from '../../../../Interfaces/BaseModel/taskDocumentAssignedDepartmentBaseModel';
import { useCreateTaskDocumentStatusMutation, useUpdateTaskDocumentStatusMutation } from '../../../../Api/taskDocumentApi';
import { toast } from 'react-toastify';
import apiResponse from '../../../../Interfaces/apiResponse';

interface Props {
    isOpen: boolean; 
    closeModal: () => void; 
    taskDocumentStatusId:number,
    employeeId:number,
  }
function TaskHandleDisApproveModal({ isOpen, closeModal,taskDocumentStatusId,employeeId }: Props) {
const [loading, setLoading] =useState(false);
const navigate = useNavigate();
const [updateTaskDocumentStatus] = useUpdateTaskDocumentStatusMutation();

const [input, setInput] = useState({
    taskDocumentStatusId:taskDocumentStatusId,
    taskStatusId:6,
    employeeId:employeeId,
    remarks:""
});
const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  let processedValue: any = value;
  setInput((prev) => ({
    ...prev,
    [name]: processedValue
  }));
};
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {

    
    const response:apiResponse = await updateTaskDocumentStatus({

        taskDocumentStatusId:taskDocumentStatusId,
        taskStatusId:6,
        employeeId:employeeId,
        remarks:input.remarks,
       
    });
     if(response.data?.isSuccess == true){
     
        const modal = document.getElementById('exampleModalAddEmp');
        if (modal) {
            toast.success('Successfully Created!', {
                position: "top-right", 
                autoClose: 5000, 
              });

            closeModal();
             navigate("/task/create/form");
        }        
        
        }else if(response.data?.exist == true){
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
   
    setLoading(false);
}


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
  return (
     <div className={`modal fade ${isOpen ? 'show' : ''}`} id="exampleModalAddEmp" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!isOpen}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h5 className="modal-title" id="exampleModalLabel">Confirm</h5> */}
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className='z-1 position-relative needs-validation'>
                <div className="form-group">
               {/* <label htmlFor="recipient-name" className="col-form-label">Select Status</label>
                    <select
                          required
                          className="form-group form-select"
                          name='taskStatusId'
                          value={input.taskStatusId}
                          onChange={handleUserInput}
                        >
                          <option value="">-=Status=-</option>
                          <option value={3}>In-Progress</option>
                          <option value={4}>For Approval</option>
                    </select> */}

                  <div className="mb-3">
                  <label htmlFor="birthDay" className="col-form-label">Remarks</label>
                  <textarea
                    
                    className="form-control"
                    name="remarks"
                    required
                    value={input.remarks}
                    onChange={handleUserInput}
                  />
                </div>
                </div>
                <h4 className="text-danger">You want to disapprove this task?
                </h4>
                </div>
                 <div className="modal-footer">
                 {
                 <><button type="submit" className="btn btn-danger" disabled={loading}>Yes</button>
                    <button className="btn btn-secondary" onClick={closeModal}>No</button>
                   </>
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

export default TaskHandleDisApproveModal