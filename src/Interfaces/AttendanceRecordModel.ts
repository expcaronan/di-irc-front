import EmployeeUserModel from "./EmployeeUserModel";
import { NoBioRemarksModel } from "./NoBioRemarksModel";

export interface AttendanceRecordModel {
  id: number;
  date: string;       // ISO date string from backend
  timeIn: string;     // ISO datetime string
  timeOut?: string | null; // nullable in C#
  employeeId: number;
  employee: EmployeeUserModel; // reference to Employee interface
  shiftId:number;
  isApprove:boolean;
  departmentId:number;
  noBioRemarks:NoBioRemarksModel
}
