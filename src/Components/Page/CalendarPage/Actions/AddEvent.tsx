import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useGetDetailsDropdownListQuery } from '../../../../Api/calendarEventApi';
import calendarEmployeeModel from '../../../../Interfaces/CalendarModel/calendarEmployeeModel';
import departmentModel from '../../../../Interfaces/BaseModel/departmentModel';
import calendarDepartmentModel from '../../../../Interfaces/CalendarModel/calendarDepartmentModel';
import calendarDeptEmpModel from '../../../../Interfaces/CalendarModel/calendarDeptEmpModel';
import AddEventForm from './AddEventForm';
import MainLoader from '../../../Common/MainLoader';
interface Props {
    isOpen: boolean; 
    closeModal: () => void; 
  }

function AddEvent({ isOpen, closeModal }: Props) {
   const[loading, setLoading] = useState(false);
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
        const [isStatusModalOpen, setIsStatusModalOpen] =useState(false);
        const {data, isLoading} = useGetDetailsDropdownListQuery(null);
        const [calendarDeptData, setCalendarDeptData] = useState<calendarDeptEmpModel>();
        const handleStatusSuccess = () => {
            setIsStatusModalOpen(false); // Close child modal
            closeModal();                   // Close parent modal
        };
        useEffect(() =>{
          setLoading(true);
          if(data && !isLoading){
            setCalendarDeptData(data.result);
          }
          setLoading(false);
        },[data])


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
                  { calendarDeptData ? <AddEventForm calendarDeptData={calendarDeptData}  onSuccess={handleStatusSuccess} />  : <MainLoader/>}
               </div>
           
          </div>
        </div>
      </div>
  )
}

export default AddEvent