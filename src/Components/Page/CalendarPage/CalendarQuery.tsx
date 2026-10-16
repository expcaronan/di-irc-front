import React, { useMemo, useState } from 'react'
import CalendarTable from './CalendarTable'
import { eventSegmentModel } from '../../../Interfaces/eventSegmentModel';
import { calendarEventModel } from '../../../Interfaces/calendarEventModel';
import getTodayDate from '../../../Helpers/getTodayDate';
import formatDate from '../../../Helpers/formatDate';
import CalendarWeekView from './CalendarWeekView';
import './CalendarTable.css';
import calendarWeekModel from '../../../Interfaces/CalendarModel/calendarWeekModel';
import toDateOnly from '../../../Helpers/toDateOnly';

function CalendarQuery() {

const events: calendarEventModel[] = [
  {
    id: 1,
    title: "All-hands meeting",
    dateStart: "2026-09-11",
    dateEnd: "2026-09-11",
    timeStart: "12:00 AM",
    timeEnd: "1:00 AM",
    color: "gray",
  },
  {
    id: 2,
    title: "Dinner with Chris",
    dateStart: "2026-09-11",
    dateEnd : "2026-09-11",
    timeStart: "2:30 AM",
    timeEnd: "3:30 AM",
    color: "gray",
  },
  {
    id: 3,
    title: "Coffee with Ali",
    dateStart: "2026-09-14",
    dateEnd: "2026-09-15",
    timeStart: "7:30 PM",
    timeEnd: "10:30 PM",
    color: "gray",
  },
  {
    id: 4,
    title: "Marketing site kickoff",
    dateStart: "2026-09-14",
    timeStart: "10:00 AM",
    timeEnd: "10:30 PM",
    dateEnd: "2026-09-16",
    color: "gray",
  },
  {
    id: 5,
    title: "Deep work",
    dateStart: "2026-09-16",
    dateEnd: "2026-09-16",
    timeStart: "5:00 PM",
    timeEnd: "10:30 PM",
    color: "blue",
  },
  {
    id: 6,
    title: "One-on-one",
    dateStart: "2026-09-16",
    dateEnd: "2026-09-16",
    timeStart: "6:00 PM",
    timeEnd: "10:30 PM",
    color: "pink",
  },
  {
    id: 7,
    title: "Design sync",
    dateStart: "2026-09-16",
    dateEnd: "2026-09-16",
    timeStart: "6:30 PM",
    timeEnd: "10:30 PM",
    color: "blue",
  },
  {
    id: 22,
    title: "Design sync Part II",
    dateStart: "2026-09-16",
    dateEnd: "2026-09-16",
    timeStart: "6:30 PM",
    timeEnd: "10:30 PM",
    color: "blue",
  },
  {
    id: 23,
    title: "Design sync Part III",
    dateStart: "2026-09-16",
    dateEnd: "2026-09-16",
    timeStart: "6:30 PM",
    timeEnd: "10:30 PM",
    color: "blue",
  },
  {
    id: 8,
    title: "Lunch with Olivia",
    dateStart: "2026-09-17",
    dateEnd: "2026-09-17",
    timeStart: "8:00 PM",
    timeEnd: "10:30 PM",
    color: "green",
  },
  {
    id: 9,
    title: "Friday standup",
    dateStart: "2026-09-18",
    dateEnd: "2026-09-18",
    timeStart: "5:00 PM",
    timeEnd: "10:30 PM",
    color: "gray",
  },
  {
    id: 10,
    title: "Olivia x Riley",
    dateStart: "2026-09-18",
    dateEnd: "2026-09-18",
    timeStart: "6:00 PM",
    timeEnd: "10:30 PM",
    color: "purple",
  },
  {
    id: 11,
    title: "Product demo",
    dateStart: "2026-09-18",
    dateEnd: "2026-09-18",
    timeStart: "9:30 PM",
    timeEnd: "10:30 PM",
    color: "blue",
  },
  {
    id: 12,
    title: "House inspection",
    dateStart: "2026-09-19",
    dateEnd: "2026-09-19",
    timeStart: "7:00 PM",
   timeEnd: "10:30 PM",
    color: "orange",
  },
  {
    id: 13,
    title: "Ava's engagement party",
    dateStart: "2026-09-20",
    dateEnd: "2026-09-21",
     timeStart: "7:00 PM",
   timeEnd: "10:30 PM",
    color: "purple",
  },
  {
    id: 14,
    title: "Monday standup",
    dateStart: "2026-09-21",
    dateEnd: "2026-09-21",
     timeStart: "7:00 PM",
   timeEnd: "10:30 PM",
    color: "gray",
  },
  {
    id: 15,
    title: "Content planning",
    dateStart: "2026-09-21",
    dateEnd: "2026-09-21",
    timeStart: "7:00 PM",
    color: "blue",
  },
  {
    id: 16,
    title: "Product demo",
    dateStart: "2026-09-22",
    dateEnd: "2026-09-22",
    timeStart: "7:00 PM",
   timeEnd: "10:30 PM",
    color: "blue",
  },
  {
    id: 17,
    title: "Catch up with team",
    dateStart: "2026-09-22",
    dateEnd: "2026-09-22",
    timeStart: "7:00 AM",
   timeEnd: "10:30 AM",
    color: "pink",
  },
  {
    id: 18,
    title: "Product planning",
    dateStart: "2026-09-23",
    dateEnd: "2026-09-23",
    timeStart: "5:30 PM",
    color: "blue",
  },
  {
    id: 19,
    title: "Amélie's first day",
    dateStart: "2026-09-24",
    dateEnd: "2026-09-24",
     timeStart: "7:00 PM",
   timeEnd: "10:30 PM",
    color: "pink",
  },
  {
    id: 20,
    title: "All-hands meeting",
    dateStart: "2026-09-25",
    dateEnd: "2026-09-25",
    timeStart: "7:00 PM",
   timeEnd: "10:30 PM",
    color: "gray",
  },
  {
    id: 21,
    title: "Coffee with Amélie",
    dateStart: "2026-09-25",
    dateEnd: "2026-09-25",
    timeStart: "7:00 AM",
   timeEnd: "10:30 AM",
    color: "pink",
  },
  {
    id: 22,
    title: "Design feedback",
    dateStart: "2026-09-25",
    dateEnd: "2026-09-25",
     timeStart: "12:00 PM",
   timeEnd: "05:30 PM",
    color: "pink",
  },
  {
    id: 23,
    title: "Half marathon",
    dateStart: "2026-09-26",
    dateEnd: "2026-09-26",
     timeStart: "7:00 PM",
   timeEnd: "10:30 PM",
    color: "green",
  },
  {
    id: 24,
    title: "Team lunch",
    dateStart: "2026-09-28",
    dateEnd: "2026-10-02",
     timeStart: "8:00 AM",
   timeEnd: "10:30 PM",
    color: "pink",
  },
  {
    id: 25,
    title: "Deep work",
    dateStart: "2026-09-30",
    dateEnd: "2026-09-30",
    timeStart: "7:00 PM",
   timeEnd: "10:30 PM",
    color: "blue",
  },
  {
    id: 26,
    title: "Design sync",
    dateStart: "2026-09-30",
    dateEnd: "2026-09-30",
     timeStart: "7:00 AM",
   timeEnd: "10:30 AM",
    color: "blue",
  },
  {
    id: 31,
    title: "Design sync",
    dateStart: "2026-10-01",
    dateEnd: "2026-10-3",
     timeStart: "7:00 PM",
   timeEnd: "10:30 PM",
    color: "blue",
  },
  {
    id: 32,
    title: "Design sync",
    dateStart: "2026-10-08",
    dateEnd: "2026-10-08",
    timeStart: "7:00 PM",
   timeEnd: "10:30 PM",
    color: "blue",
  },
    {
    id: 33,
    title: "Design sync",
    dateStart: "2026-10-08",
    dateEnd: "2026-10-10",
    timeStart: "7:00 AM",
   timeEnd: "10:30 AM",
    color: "blue",
  },
   {
    id: 34,
    title: "Design sync",
    dateStart: "2026-10-15",
    dateEnd: "2026-10-15",
    timeStart: "7:00 PM",
   timeEnd: "10:30 PM",
    color: "blue",
  },
    {
    id: 35,
    title: "Design sync",
    dateStart: "2026-10-16",
    dateEnd: "2026-10-17",
    timeStart: "7:00 PM",
   timeEnd: "10:30 PM",
    color: "blue",
  },
   {
    id: 36,
    title: "Design sync",
    dateStart: "2026-10-18",
    dateEnd: "2026-10-20",
    timeStart: "7:00 PM",
   timeEnd: "10:30 PM",
    color: "blue",
  },
    {
    id: 37,
    title: "Design sync",
    dateStart: "2026-10-21",
    dateEnd: "2026-10-22",
    timeStart: "7:00 PM",
   timeEnd: "10:30 PM",
    color: "blue",
  },
  {
    id: 38,
    title: "Design sync",
    dateStart: "2026-11-01",
    dateEnd: "2026-11-02",
     timeStart: "7:00 PM",
   timeEnd: "10:30 PM",
    color: "blue",
  },
];

// const sampleEvents: calendarWeekModel[] = [
//   {
//     id: 1,
//     title: "Document Review",
//     start: new Date(2026, 9, 13, 9, 0),
//     end: new Date(2026, 9, 13, 10, 30),
//     color: "blue" as const,
//   },
//   {
//     id: 2,
//     title: "Department Meeting",
//     start: new Date(2026, 9, 15, 13, 0),
//     end: new Date(2026, 9, 15, 14, 0),
//     color: "purple" as const,
//   },
// ];

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
      console.log("month"+view);
    setCurrentDate(new Date(year, month + 1, 1));
    }else{
      console.log(view);
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

      
      
      {view === "week" && (
        <CalendarWeekView currentDate={currentDate} events={events}/>
      )}

      {view === "month" && (
         <CalendarTable events={events} weekDays={weekDays} year={year} month={month} /> 
      )}
        
    </div>
  )
}

export default CalendarQuery