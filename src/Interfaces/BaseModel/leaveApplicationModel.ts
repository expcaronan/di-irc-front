import EmployeeUserModel from "../EmployeeUserModel";
import LeaveTypeModel from "./leaveTypeModel";

export default interface leaveApplicationModel {
  id: number;
  dateApplication: string;
  employeeId: number;
  employee?: EmployeeUserModel;
  startDate: string;
  endDate: string;
  leaveTypeId: number;
  leaveType?:LeaveTypeModel
  leaveStatus: string;
  approverName: string;
  reason: string;
  approverComments: string;
  totalDays: number;
}