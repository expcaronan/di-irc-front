import { AttendanceRecordModel } from "./AttendanceRecordModel";

export default interface EmployeeUserModel {
  employeeId: number,
  lastName: string,
  firstName: string,
  roleName:string,
  roleId:number,
  departmentName:string,
  departmentId:number,
  designationName:string,
  designationId:number
  rankName:string,
  rankId:number,
  userName:string,
  email:string,
  attendanceRecords?: AttendanceRecordModel[] | null;
  }