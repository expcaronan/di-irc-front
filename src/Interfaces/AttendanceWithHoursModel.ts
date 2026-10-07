import EmployeeUserModel from "./EmployeeUserModel";
import { NoBioRemarksModel } from "./NoBioRemarksModel";

export interface AttendanceWithHoursModel {
  id: number;
  date: string;       // ISO date string from backend
  timeIn: string;     // ISO datetime string
  timeOut?: string | null; // nullable in C#
  employeeId: number;
  employee: EmployeeUserModel; // reference to Employee interface
  regularHours : number;
  overtimeHours:number;
  totalHours:number;
  latetimeHours:number;
  remarks:string;
//   shift:ShiftModel;
  isApprove:boolean;
//   departmentId:number;
  noBioRemarks:NoBioRemarksModel;
}