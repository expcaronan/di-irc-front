import LeaveTypeModel from "./leaveTypeModel";

export default interface leaveApplicationModel {
  id: number;
  dateApplication: string;
  employeeId: number;
  startDate: string;
  endDate: string;
  leaveTypeId: number;
  leaveType?:LeaveTypeModel
  status: boolean;
  approverId: number;
  reason: string;
  totalDays: number;
}