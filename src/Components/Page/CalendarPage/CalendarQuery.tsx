import React from 'react'
import CalendarTable from './CalendarTable'


function CalendarQuery() {
  return (
    <div>
        <CalendarTable id={1} title="Team Meeting" dateStart="2026-08-16T09:00:00" timeStart="16T09:00:00" timeEnd="16T10:00:00" color="blue" dateEnd="2026-09-16T10:00:00"  />
    </div>
  )
}

export default CalendarQuery