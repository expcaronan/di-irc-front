import React from 'react'
import CalendarQuery from '../Components/Page/CalendarPage/CalendarQuery'
import EmployeeUserModel from '../Interfaces/EmployeeUserModel'
interface props{
  userDetails:EmployeeUserModel
}

function HomeCalendar({userDetails}:props) {
  return (
    <div>
        <CalendarQuery userDetails={userDetails}/>
    </div>
  )
}

export default HomeCalendar