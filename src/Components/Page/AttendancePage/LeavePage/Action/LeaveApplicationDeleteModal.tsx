import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteLeaveApplicationByIdMutation } from '../../../../../Api/leaveApplicationApi';
import { MainLoader } from '../../../../Common/Index';

interface Props {
    isOpen: boolean; 
    closeModal: () => void; 
    leaveApplicationId:number,
  }
function LeaveApplicationDeleteModal({ isOpen, closeModal,leaveApplicationId }: Props) {
const [loading, setLoading] =useState(false);
const navigate = useNavigate();
const [deleteLeaveApplication] = useDeleteLeaveApplicationByIdMutation();

const [input, setInput] = useState({
    leaveApplicationId:leaveApplicationId,
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

    const response = await deleteLeaveApplication(leaveApplicationId).unwrap();
   
     if(response?.isSuccess == true){
     
        const modal = document.getElementById('exampleModalAddEmp');
        if (modal) {
            toast.success('Successfully Created!', {
                position: "top-right", 
                autoClose: 5000, 
              });

            closeModal();
             navigate("/leaveStatus/list");
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
              
                </div>
                 <h4 className="text-warning">
                      Are you sure you want to delete this leave application?
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

export default LeaveApplicationDeleteModal