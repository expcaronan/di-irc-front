import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { MainLoader } from '../Common/Index';
import baseUrlString from '../../Api/baseUrlString';

interface Props {
    isOpen: boolean; 
    closeModal: () => void; 
  
  }
function DownloadModal({ isOpen, closeModal}: Props) {
const [loading, setLoading] =useState(false);
const navigate = useNavigate();






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
              <form>
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

                 
                </div>
                 <h4 className="text-primary">
                      Are you sure you want to download this application?
                 </h4>
                   
                </div>
                 <div className="modal-footer">
                 {
                 <><a 
                    href={`${baseUrlString.test}/user/download-agent`}
                   className="btn btn-primary"
                >Yes
                </a>
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

export default DownloadModal