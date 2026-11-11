import React, { useEffect, useMemo, useState } from 'react'
import CalendarTable from './CalendarTable'
import { eventSegmentModel } from '../../../Interfaces/eventSegmentModel';
import { calendarEventModel } from '../../../Interfaces/calendarEventModel';
import getTodayDate from '../../../Helpers/getTodayDate';
import formatDate from '../../../Helpers/formatDate';
import CalendarWeekView from './CalendarWeekView';
import './CalendarTable.css';
import calendarWeekModel from '../../../Interfaces/CalendarModel/calendarWeekModel';
import toDateOnly from '../../../Helpers/toDateOnly';
import { useGetCalendarEventFilterByEmpIdDeptIdListQuery, useGetCalendarEventListQuery } from '../../../Api/calendarEventApi';
import MainLoader from '../../Common/MainLoader';
import EmployeeUserModel from '../../../Interfaces/EmployeeUserModel';
interface props{
  userDetails:EmployeeUserModel
}
function CalendarQuery({userDetails}:props) {


const [loading, setLoading]= useState(false);
const { data, isLoading } =
    useGetCalendarEventFilterByEmpIdDeptIdListQuery({
        employeeId: userDetails.employeeId,
        departmentId: userDetails.departmentId
    });
const [events, setEvents] = useState<calendarEventModel[]>([]);

useEffect(() =>{
  setLoading(true);

  if(data && !isLoading){
    setEvents(data.result)
  }
  setLoading(false);
},[data])


const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
 const [currentDate, setCurrentDate] = useState(
    getTodayDate ? new Date(getTodayDate) : new Date()
  );
 const [view, setView] = useState<"month" | "week" | "day">("month");
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDay();
  const previousMonth = () => {
    if(view == "month"){
      setCurrentDate(new Date(year, month - 1, 1))
    }else{
      setCurrentDate(prev => {
      const nextDate = new Date(prev);
      nextDate.setDate(nextDate.getDate() - 6);
      return nextDate;
      });
    }
  };

  const nextMonth = () => {
    
    if(view == "month"){
      //console.log("month"+view);
    setCurrentDate(new Date(year, month + 1, 1));
    }else{
      //console.log(view);
      // setCurrentDate(new Date(year, month , day+6));
      setCurrentDate(prev => {
      const nextDate = new Date(prev);
      nextDate.setDate(nextDate.getDate() + 6);
      return nextDate;
      });
    }
  };

  const today = () => {
    setCurrentDate(new Date(getTodayDate));
  };

//console.log(view);

  return (
     <div className="calendar-container">
       <div className="calendar-header">

        <div className="calendar-title">

          <div className="date-box">
            <span className="date-month">
              {monthNames[month].substring(0, 3).toUpperCase()}
            </span>

            <span className="date-number">
              {currentDate.getDate()}
            </span>
          </div>

          <div>
            <div className="month-title">
              {monthNames[month]} {year}

              <span className="week-badge">
                Week 3
              </span>
            </div>

            <div className="date-range">
              {monthNames[month].substring(0, 3)+" 1, "+year+ " - "+
              monthNames[month].substring(0, 3)+" "+new Date(year, Number(month+1), 0).getDate()+", "+year
              }
            </div>
          </div>


        </div>

        {/* Toolbar */}
        <div className="calendar-toolbar">

          <button className="icon-button">
            🔍
          </button> 

          <div className="navigation">

            <button onClick={previousMonth}>
              ←
            </button>

            <button onClick={today}>
              Today
            </button>

            <button onClick={nextMonth}>
              →
            </button>

          </div>

          <select
            value={view}
            onChange={(e) =>setView(e.target.value as "month" | "week" | "day")}
          >
            <option value="month">Month view</option>
            <option value="week">Week view</option>
            <option value="day">Day view</option>
          </select>

          <button className="add-event">
            <span>＋</span>
            Add event
          </button>

        </div>
      </div>

      
{/*       
      {view === "week" && (
        <CalendarWeekView currentDate={currentDate} events={events}/>
      )}
*/}
      
        {!loading && events ? (
          view === "month" ? (
              <CalendarTable
                  events={events}
                  weekDays={weekDays}
                  year={year}
                  month={month}
              />
          ) : null
      ) : (
          <MainLoader />
      )}
        
    </div>
  )
}

export default CalendarQuery