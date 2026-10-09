import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
interface Props {
    isOpen: boolean; 
    closeModal: () => void; 
  }

function AddEvent({ isOpen, closeModal }: Props) {
      const [loading, setLoading] =useState(false);
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
              
            } catch (error) {
              console.error('Error:', error);
             
            } finally {
              setLoading(false);
            }
        }


            const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
              const { name, value } = e.target;
            
              let processedValue: any = value;
            
            };
            

  return (
   <div className={`modal fade ${isOpen ? 'show' : ''}`} id="exampleModalAddEmp" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!isOpen}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Event</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                   
                  <label htmlFor="firstName" className="col-form-label">First Name</label>
                  <input type="text" className="form-control" 
                  required
                   name='firstName'
                   value={"b"}
                   onChange={handleUserInput}
                  />
                   <label htmlFor="lastName" className="col-form-label">Last Name</label>
                  <input type="text" className="form-control" 
                  required
                   name='lastName'
                   value={"c"}
                   onChange={handleUserInput}
                  />
                   <label htmlFor="serviceTypeName" className="col-form-label">Password</label>
                  <input type="text" className="form-control" 
                  required
                   name='passwordHash'
                   value={"d"}
                   onChange={handleUserInput}
                  />
                 
                    <label htmlFor="recipient-name" className="col-form-label">Birthday</label>
                      </div>
                      <div className='col-md-8'>
                        <input type="date" className="form-control datepicker"
                          name='birthDay'
                          required
                          value={"e"}
                          onChange={handleUserInput}
                    />
                    
                    <label htmlFor="recipient-name" className="col-form-label">Date Hired</label>
                      </div>
                      <div className='col-md-8'>
                        <input type="date" className="form-control datepicker"
                          name='dateHired'
                          required
                          value={"f"}
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

export default AddEvent