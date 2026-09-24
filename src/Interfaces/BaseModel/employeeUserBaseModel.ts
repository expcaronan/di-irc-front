import departmentModel from "./departmentModel";
import designationModel from "./designationModel";
import rankModel from "./rankModel";
import roleModel from "./roleModel";
import { userModel } from "./userModel";

export interface employeeUserBaseModel {
  id: number;
  firstName: string;
  lastName: string;
  birthDay: string;
  dateHired: string;

  departmentId: number;
  department?: departmentModel;

  designationId: number;
  designation?: designationModel;

  roleId: number;
  role?: roleModel;

  rankId: number;
  rank?: rankModel;

  isActive: boolean;

  user?: userModel;
}