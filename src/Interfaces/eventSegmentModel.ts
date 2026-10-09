import { calendarEventModel } from "./calendarEventModel";


export interface eventSegmentModel {
  event: calendarEventModel;
  startIndex: number;
  span: number;
  row: number;
  lane: number;
  currentMonth: boolean;
  week:number;
}



