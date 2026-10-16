import { useEffect, useMemo, useState } from "react";
import { calendarEventModel } from "../../../Interfaces/calendarEventModel";
import getTodayDate from "../../../Helpers/getTodayDate";
import { eventSegmentModel } from "../../../Interfaces/eventSegmentModel";
import AddEvent from "./Actions/AddEvent";

import formatDate from "../../../Helpers/formatDate";
import toDateOnly from "../../../Helpers/toDateOnly";

interface props{
  events: calendarEventModel[]
  weekDays:any[];
  year:any;
  month:any;
}

function CalendarTable({events, weekDays, year, month}:props) {

const getCalendarDays = (year: number, month: number) => {
  
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

const calendarDays = useMemo(
    () => getCalendarDays(year, month),
    [year, month]
);

const [isModalOpen, setIsModalOpen] = useState(false);
const closeModal = () => {
      setIsModalOpen(false);
};

const handleAddEvent = async() =>{
      setIsModalOpen(true);
}

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
                  className={`calendar-cell ${!currentMonth
                    ? "outside-month"
                    : ""
                    }`}
                  key={index}
                >
                  <div
                    className={`day-number ${isToday
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
              console.log(currentMonth);
              return (
                // currentMonth &&
                <div
                  key={`${event.id}-${index}`}
                  className={`calendar-event event-${event.color}`}
                  style={{
                    gridColumn: `${segment.startIndex + 1
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

  )
}

export default CalendarTable