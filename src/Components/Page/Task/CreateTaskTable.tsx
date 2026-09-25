import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function CreateTaskTable() {
    const [isNotClick, setIsNotClick] = useState(false);
    const navigate = useNavigate();

    const handleAddTask = async () => {
        setIsNotClick(true);
            navigate("form");
        setIsNotClick(false);
    }
  return (
    <div>
        <div className='d-flex justify-content gap-5' >
            <div className='col-auto'>
            <button
                onClick={() => handleAddTask()}
                disabled={isNotClick}
                className="btn btn-outline-primary flex-grow-5"  style={{ width: '200px' }}
                >
                    Create Task
                </button>
            </div>
            <div className='col-auto'>
                {/* <button
                    onClick={() => handleTimeOut()}
                    disabled={isNotClick}
                    className="btn btn-outline-primary flex-grow-5"  style={{ width: '200px' }}
                    >
                        Time out
                </button> */}
            </div>
        </div>

        {/* table */}
        
        <div>

        </div>

    </div>
  )
}

export default CreateTaskTable