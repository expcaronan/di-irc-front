import React, { useEffect, useState } from 'react'
import MainLoader from '../../../Common/MainLoader';
import { AttendanceRecordModel } from '../../../../Interfaces/AttendanceRecordModel';
import { useGetAttendanceNoBioByIdQuery } from '../../../../Api/attendanceApi';
import NoBioTable from './NoBioTable';
import NoBioApplication from './Actions/NoBioApplication';


interface props{
    empId:number,
    deptId:number,
 
}
function NoBioQuery({empId,deptId}:props) {
        const [attendanceData, setAttendanceData] = useState<AttendanceRecordModel[]>([]);
        const [loading, setLoading] = useState(false);
        const [isModalOpen, setIsModalOpen] = useState(false);

        const {data, isLoading} = useGetAttendanceNoBioByIdQuery(empId);
        
        const closeModal = () => {
                setIsModalOpen(false);
        };
    
        useEffect(() => {
            setLoading(true);
                if(data){
                setAttendanceData(data.result);
                    console.log(data.result);
                    console.log("dfsdf");
                }
            setLoading(false);
        },[data])
        
  const handleAddNoBio = async () =>{
      setIsModalOpen(true);
    }
  return (
    <div>
        <div className='col-md-2'>
        <button onClick={() => handleAddNoBio()}className='btn btn-success'>No Bio Application</button>
        </div>
            {
               !loading ? <NoBioTable attendanceData={attendanceData}/>:<MainLoader/>
            }
            {
            isModalOpen && <> <NoBioApplication isOpen={isModalOpen} 
            closeModal={closeModal} empId={empId} />
            </>
            }
    </div>
  )
}

export default NoBioQuery