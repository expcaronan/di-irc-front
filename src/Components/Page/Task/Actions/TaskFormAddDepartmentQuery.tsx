import React, { useEffect, useState } from 'react'
import { useGetDeptRrsOfficeDropdownListQuery } from '../../../../Api/taskDocumentApi';
import taskDocumentDropdown from '../../../../Interfaces/taskDocumentDropdown';
import { useLocation } from 'react-router-dom';
import TaskFormAddDepartment from './TaskFormAddDepartment';

function TaskFormAddDepartmentQuery() {
    const{data, isLoading} = useGetDeptRrsOfficeDropdownListQuery(null);

    const location = useLocation();
    const { taskDocument, employeeId } = location.state || {}

    const[dropdownListData, setDropdownListData] = useState<taskDocumentDropdown>();
        useEffect(() =>{
            if(data && !isLoading){
                //console.log(data.result);
                setDropdownListData(data.result)
            }
    })
    
  return (
    <div>
        {taskDocument && dropdownListData && (
            <TaskFormAddDepartment
                employeeId={employeeId}
                dropdownListData={dropdownListData}
                taskDocumentData={taskDocument}
            />
        )}
    </div>
  )
}

export default TaskFormAddDepartmentQuery