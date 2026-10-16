
import React, { useMemo } from "react";
import { calendarEventModel } from "../../../Interfaces/calendarEventModel";
import toDateOnly from "../../../Helpers/toDateOnly";
import calendarWeekModel from "../../../Interfaces/CalendarModel/calendarWeekModel";


interface CalendarWeekViewProps {
  currentDate?: Date;
  events?: calendarEventModel[];
  onEventClick?: (event: calendarEventModel) => void;
}

function CalendarWeekView ({currentDate, events, onEventClick}:CalendarWeekViewProps){

const eventColors: Record<string, string> = {
  blue: "event-blue",
  pink: "event-pink",
  green: "event-green",
  orange: "event-orange",
  purple: "event-purple",
  gray: "event-gray",
};

const startOfWeek = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);

  // Monday is the first day of the week.
  const daysSinceMonday = (result.getDay() + 6) % 7;
  result.setDate(result.getDate() - daysSinceMonday);

  return result;
};

const sameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const formatTime = (date: Date): string =>
  date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const days = useMemo(() => {
    const baseDate = currentDate ?? new Date();
    const monday = startOfWeek(baseDate);

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return date;
    });
  }, [currentDate]);

  const hours = useMemo(
    () => Array.from({ length: 24 }, (_, index) => index),
    []
  );

  return (
    <div className="week-view">
      {/* WEEK HEADER */}
      <div className="week-view-header">
        <div className="week-view-header-spacer" />

        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={`week-view-day ${
              sameDay(day, new Date()) ? "today" : ""
            }`}
          >
            <span className="week-view-day-name">
              {day.toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </span>

            <span className="week-view-day-number">
              {day.getDate()}
            </span>
          </div>
        ))}
      </div>

      {/* SCROLLABLE CALENDAR */}
      <div className="week-view-scroll">
        <div className="week-view-grid">
          {/* TIME LABELS */}
          <div className="week-view-times">
            {hours.map((hour) => (
              <div className="week-view-time" key={hour}>
                {hour === 0
                  ? ""
                  : new Date(2000, 0, 1, hour).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "numeric",
                      }
                    )}
              </div>
            ))}
          </div>

          {/* DAY COLUMNS AND EVENTS */}
          <div className="week-view-body">
            {days.map((day, dayIndex) => (
              <div
                className="week-view-column"
                key={day.toISOString()}
                style={{
                  gridColumn: dayIndex + 1,
                }}
              >
                {hours.map((hour) => (
                  <div className="week-view-hour" key={hour} />
                ))}
              </div>
            ))}

            {/* EVENTS */}
            <div className="week-view-events">
              {events?.map((event) => {
                //console.log(event);
                const dayIndex = days.findIndex((day) =>
                  sameDay(day,new Date(event.dateStart))
                );

                if (dayIndex === -1) {
                  return null;
                }

                // const startMinutes =
                //   new Date(event.start).getHours() * 60 +
                //   new Date(event.start).getMinutes();
                // const endMinutes =
                //   event.end.getHours() * 60 +
                //   event.end.getMinutes();
                const startTime = new Date(event.timeStart ?? event.dateStart);
                const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();

                const endTime = new Date(event.timeEnd ?? event.dateEnd);
                const endMinutes = endTime.getHours() * 60 + endTime.getMinutes();
                 

                const duration = Math.max(
                  15,
                  endMinutes - startMinutes
                );

                return (
                  <div
                    key={event.id}
                    className={`week-view-event ${
                      eventColors[event.color ?? "blue"] ??
                      "event-blue"
                    }`}
                    style={{
                      gridColumn: dayIndex + 1,
                      gridRow: "1 / -1",
                      top: `${startMinutes}px`,
                      height: `${Math.min(
                        duration,
                        1440 - startMinutes
                      )}px`,
                    }}
                    onClick={() => onEventClick?.(event)}
                    title={event.title}
                  >
                    <span className="event-title">
                      {event.title}
                    </span>

                     <span className="event-time">
                      {formatTime(new Date(event?.timeStart ?? event.dateStart))} –{" "}
                      {formatTime(new Date(event?.timeEnd ?? event.dateEnd))}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarWeekView;
