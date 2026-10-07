import React, { useEffect, useState } from 'react'

import { AttendanceRecordModel } from '../../../Interfaces/AttendanceRecordModel';
import { useGetAttendanceListByEmpIdQuery } from '../../../Api/attendanceApi';
import { AttendanceWithHoursModel } from '../../../Interfaces/AttendanceWithHoursModel';
import AttendanceTable from './AttendanceTable';
import MainLoader from '../../Common/MainLoader';

interface props{
    empId:number,
}
function AttendanceQuery({empId}:props) {

    const [attendanceData, setAttendanceData] = useState<AttendanceWithHoursModel[]>([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput]  = useState({
        fromDate:null,
        toDate:null
       })
    const [fromInput, setFromInput]  = useState({
        fromDate:null,
        toDate:null
    })

    const{data, isLoading} = useGetAttendanceListByEmpIdQuery({
            empId:empId,
        ...(fromInput.fromDate ? {fromDate: fromInput.fromDate } : {}),
        ...(fromInput.toDate ? { toDate: fromInput.toDate } : {})
    });
    const handleFilter =() => {
        setFromInput({fromDate:input.fromDate, toDate:input.toDate})
        //console.log(fromInput.fromDate+" dfs");
    }

    useEffect(() =>{
        setLoading(true);
        if(data){
            //console.log(data.result);
            setAttendanceData(data.result);
        }
        setLoading(false);
    },[data])

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      let processedValue: any = value;
      setInput((prev) => ({
        ...prev,
        [name]: processedValue
      }));
    };
 
  return (
      <div>
          <div className="row align-items-center mb-3">
              <div className="col-md-2 text-end" onClick={() => handleFilter()}>
                <button className='btn btn-secondary'>Filter Date</button>
              </div>
              <div className="col-md-2 text-end">
                  <label htmlFor="fromDate" className="col-form-label">
                      Date From
                  </label>
              </div>
              <div className="col-md-2">
                  <input
                      type="date"
                      id="fromDate"
                      className="form-control datepicker"
                      name="fromDate"
                      value={input.fromDate ?? ""}
                      onChange={handleUserInput}
                  />
              </div>
             
          </div>

        { 
        !loading ? <AttendanceTable attendanceData={attendanceData}/>:<MainLoader/>
        }

      </div>
  )
}

export default AttendanceQuery