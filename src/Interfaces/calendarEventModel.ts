export interface calendarEventModel {
  id: number;
  title: string;
  dateStart: string;
  dateEnd: string;
  timeStart?: string;
  timeEnd?: string;
  color: EventColor;
}

type EventColor = "blue" | "pink" | "green" | "orange" | "purple" | "gray";