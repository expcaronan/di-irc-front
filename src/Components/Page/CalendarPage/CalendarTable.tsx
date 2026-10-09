import { useEffect, useMemo, useState } from "react";
import { calendarEventModel } from "../../../Interfaces/calendarEventModel";
import getTodayDate from "../../../Helpers/getTodayDate";
import { eventSegmentModel } from "../../../Interfaces/eventSegmentModel";
import AddEvent from "./Actions/AddEvent";
import './CalendarTable.css';


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
    color: "gray",
  },
  {
    id: 4,
    title: "Marketing site kickoff",
    dateStart: "2026-09-14",
    timeStart: "10:00 AM",
    dateEnd: "2026-09-16",
    color: "gray",
  },
  {
    id: 5,
    title: "Deep work",
    dateStart: "2026-09-16",
    dateEnd: "2026-09-16",
    timeStart: "5:00 PM",
    color: "blue",
  },
  {
    id: 6,
    title: "One-on-one",
    dateStart: "2026-09-16",
    dateEnd: "2026-09-16",
    timeStart: "6:00 PM",
    color: "pink",
  },
  {
    id: 7,
    title: "Design sync",
    dateStart: "2026-09-16",
    dateEnd: "2026-09-16",
    timeStart: "6:30 PM",
    color: "blue",
  },
  {
    id: 22,
    title: "Design sync Part II",
    dateStart: "2026-09-16",
    dateEnd: "2026-09-16",
    timeStart: "6:30 PM",
    color: "blue",
  },
  {
    id: 23,
    title: "Design sync Part III",
    dateStart: "2026-09-16",
    dateEnd: "2026-09-16",
    timeStart: "6:30 PM",
    color: "blue",
  },
  {
    id: 8,
    title: "Lunch with Olivia",
    dateStart: "2026-09-17",
    dateEnd: "2026-09-17",
    timeStart: "8:00 PM",
    color: "green",
  },
  {
    id: 9,
    title: "Friday standup",
    dateStart: "2026-09-18",
    dateEnd: "2026-09-18",
    timeStart: "5:00 PM",
    color: "gray",
  },
  {
    id: 10,
    title: "Olivia x Riley",
    dateStart: "2026-09-18",
    dateEnd: "2026-09-18",
    timeStart: "6:00 PM",
    color: "purple",
  },
  {
    id: 11,
    title: "Product demo",
    dateStart: "2026-09-18",
    dateEnd: "2026-09-18",
    timeStart: "9:30 PM",
    color: "blue",
  },
  {
    id: 12,
    title: "House inspection",
    dateStart: "2026-09-19",
    dateEnd: "2026-09-19",
    timeStart: "7:00 PM",
    color: "orange",
  },
  {
    id: 13,
    title: "Ava's engagement party",
    dateStart: "2026-09-20",
    dateEnd: "2026-09-21",
    color: "purple",
  },
  {
    id: 14,
    title: "Monday standup",
    dateStart: "2026-09-21",
    dateEnd: "2026-09-21",
    timeStart: "5:00 PM",
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
    timeStart: "6:30 PM",
    color: "blue",
  },
  {
    id: 17,
    title: "Catch up with team",
    dateStart: "2026-09-22",
    dateEnd: "2026-09-22",
    timeStart: "10:30 PM",
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
    timeStart: "6:00 PM",
    color: "pink",
  },
  {
    id: 20,
    title: "All-hands meeting",
    dateStart: "2026-09-25",
    dateEnd: "2026-09-25",
    timeStart: "12:00 AM",
    color: "gray",
  },
  {
    id: 21,
    title: "Coffee with Amélie",
    dateStart: "2026-09-25",
    dateEnd: "2026-09-25",
    timeStart: "5:30 PM",
    color: "pink",
  },
  {
    id: 22,
    title: "Design feedback",
    dateStart: "2026-09-25",
    dateEnd: "2026-09-25",
    timeStart: "10:30 PM",
    color: "pink",
  },
  {
    id: 23,
    title: "Half marathon",
    dateStart: "2026-09-26",
    dateEnd: "2026-09-26",
    timeStart: "3:00 PM",
    color: "green",
  },
  {
    id: 24,
    title: "Team lunch",
    dateStart: "2026-09-28",
    dateEnd: "2026-10-02",
    timeStart: "8:15 PM",
    color: "pink",
  },
  {
    id: 25,
    title: "Deep work",
    dateStart: "2026-09-30",
    dateEnd: "2026-09-30",
    timeStart: "5:00 PM",
    color: "blue",
  },
  {
    id: 26,
    title: "Design sync",
    dateStart: "2026-09-30",
    dateEnd: "2026-09-30",
    timeStart: "10:30 PM",
    color: "blue",
  },
  {
    id: 31,
    title: "Design sync",
    dateStart: "2026-10-01",
    dateEnd: "2026-10-3",
    timeStart: "10:30 PM",
    color: "blue",
  },
  {
    id: 32,
    title: "Design sync",
    dateStart: "2026-10-08",
    dateEnd: "2026-10-08",
    timeStart: "10:30 PM",
    color: "blue",
  },
    {
    id: 33,
    title: "Design sync",
    dateStart: "2026-10-08",
    dateEnd: "2026-10-10",
    timeStart: "10:30 PM",
    color: "blue",
  },
];

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

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const firstDayOfWeek = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const previousMonthDays = new Date(year, month, 0).getDate();
  const days = [];
  // Previous month
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, previousMonthDays - i),
      currentMonth: false,
    });
  }
  // Current month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      date: new Date(year, month, day),
      currentMonth: true,
    });
  }
  // Next month
  let nextDay = 1;
  while (days.length < 42) {
    days.push({
      date: new Date(year, month + 1, nextDay),
      currentMonth: false,
    });
    nextDay++;
  }
  return days;
}


function CalendarTable({id,title,dateStart,timeStart,color,dateEnd, timeEnd}:calendarEventModel) {

  const [currentDate, setCurrentDate] = useState(
    getTodayDate ? new Date(getTodayDate) : new Date()
  );

  const [view, setView] = useState("Month view");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendarDays = useMemo(
    () => getCalendarDays(year, month),
    [year, month]
  );

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const today = () => {
    setCurrentDate(new Date(2026, 8, 17));
  };

  const getEvents = (date: Date) => {
    const dateString = formatDate(date);
    return events.filter((event) => {
      if (event.dateEnd) {
        return dateString >= event.dateStart && dateString <= event.dateEnd;
      }
      return event.dateStart === dateString;
    });
  };

   const [isModalOpen, setIsModalOpen] = useState(false);
   const closeModal = () => {
      setIsModalOpen(false);
   };

  const handleAddEvent = async() =>{
      setIsModalOpen(true);
  }
const toDateOnly = (value: string | Date) => {
  if (value instanceof Date) {
    return new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate()
    );
  }

  const [year, month, day] = value
    .split("-")
    .map(Number);

  return new Date(year, month - 1, day);
};

const eventsOverlap = (
  first: calendarEventModel,
  second: calendarEventModel
) => {
  const firstStart = toDateOnly(first.dateStart);
  const firstEnd = toDateOnly(first.dateEnd);

  const secondStart = toDateOnly(second.dateStart);
  const secondEnd = toDateOnly(second.dateEnd);

  return (
    firstStart <= secondEnd &&
    secondStart <= firstEnd
  );
};

const assignEventLanes = (
  weekEvents: calendarEventModel[]
) => {
  const lanes: calendarEventModel[][] = [];

  const sortedEvents = [...weekEvents].sort(
    (a, b) => {
      const startA = toDateOnly(a.dateStart).getTime();
      const startB = toDateOnly(b.dateStart).getTime();

      return startA - startB;
    }
  );

  return sortedEvents.map((event) => {

    let laneIndex = 0;

    while (
      lanes[laneIndex]?.some((existingEvent) =>
        eventsOverlap(event, existingEvent)
      )
    ) {
      laneIndex++;
    }

    if (!lanes[laneIndex]) {
      lanes[laneIndex] = [];
    }

    lanes[laneIndex].push(event);

    return {
      event,
      lane: laneIndex,
    };
  });
};

const getEventSegments = (
  calendarDays: {
    date: Date;
    currentMonth: boolean;
  }[]
): eventSegmentModel[] => {
  const segments: eventSegmentModel[] = [];
  // 6 rows x 7 days
  for (let week = 0; week < 5; week++) {
    const weekStartIndex = week * 7;
    const weekEndIndex = weekStartIndex + 6;
    const weekStart =
      calendarDays[weekStartIndex].date;
    const weekEnd =
      calendarDays[weekEndIndex].date;


    //const currentMonth = calendarDays[week].currentMonth;
    /*
     * Get events that appear during this week
     */
    const weekEvents = events.filter((event) => {
      const eventStart = toDateOnly(event.dateStart);
      const eventEnd = toDateOnly(event.dateEnd);
      return (
        eventStart <= weekEnd &&
        eventEnd >= weekStart
      );
    });
    /*
     * Assign vertical lanes
     */
    const laneResults =
      assignEventLanes(weekEvents);
    laneResults.forEach(({ event, lane }) => {
      const eventStart =
        toDateOnly(event.dateStart);
      const eventEnd =
        toDateOnly(event.dateEnd);
      
      const currentMonth = new Date(event.dateStart).getMonth() === new Date().getMonth();

      /*
       * Don't allow event to extend
       * outside current calendar week.
       */
      const visibleStart =
        eventStart < weekStart
          ? weekStart
          : eventStart;
      const visibleEnd =
        eventEnd > weekEnd
          ? weekEnd
          : eventEnd;
      /*
       * Find column positions
       */
      const startIndex =
        calendarDays.findIndex(
          (day) =>
            day.date.getTime() ===
            visibleStart.getTime()
        );
      const endIndex =
        calendarDays.findIndex(
          (day) =>
            day.date.getTime() ===
            visibleEnd.getTime()
        );
      if (startIndex === -1 || endIndex === -1) {
        return;
      }
      const columnStart =
        startIndex % 7;
      const columnEnd =
        endIndex % 7;
      const span =
        columnEnd - columnStart + 1;
      segments.push({
          event,
          startIndex: columnStart,
          span,
          week,
          lane,
          currentMonth: currentMonth,
          row: 0
      });
    });
  }

  return segments;
};

   
  return (
     
    <div>
       {
        isModalOpen && <> <AddEvent isOpen={isModalOpen} closeModal={closeModal} />
       </>
       }
      <div className="calendar-container">

      {/* Header */}
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
            onChange={(e) => setView(e.target.value)}
          >
            <option>Month view</option>
            <option>Week view</option>
            <option>Day view</option>
          </select>

          <button className="add-event">
            <span>＋</span>
            Add event
          </button>

        </div>
      </div>

      {/* Week Header */}
      <div className="week-header">
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="calendar-wrapper">

  {/* Calendar cells */}
  <div className="calendar-grid">

    {calendarDays.map(
      ({ date, currentMonth }, index) => {

        const dateString = formatDate(date);

        const isToday =
          dateString === getTodayDate;

        return (
          <div
            className={`calendar-cell ${
              !currentMonth
                ? "outside-month"
                : ""
            }`}
            key={index}
          >
            <div
              className={`day-number ${
                isToday
                  ? "today-number"
                  : ""
              }`}
              onClick={() =>
                handleAddEvent()
              }
            >
              {!currentMonth ? "" : date.getDate()}
            </div>

          </div>
        );
      }
    )}

  </div>


  {/* Event layer */}


  <div className="events-layer">
    {getEventSegments(calendarDays).map(
      (segment, index) => {
        const event = segment.event;
        const currentMonth = segment.currentMonth;
        //console.log(segment+" "+index);
        return (
          currentMonth && 
          <div
            key={`${event.id}-${index}`}
            className={`calendar-event event-${event.color}`}
            style={{
              gridColumn: `${
                segment.startIndex + 1
              } / span ${segment.span}`,

              gridRow:
                segment.week + 1,

              top:
                34 +
                segment.lane * 24,
            }}
          >
            <span className="event-title">
              {event.title}
            </span>

            {event.timeStart && (
              <span className="event-time">
                {event.timeStart}
              </span>
            )}
          </div>
         

         
        );
      }
    )}

  </div>

</div>

    </div>
    </div>
  )
}

export default CalendarTable