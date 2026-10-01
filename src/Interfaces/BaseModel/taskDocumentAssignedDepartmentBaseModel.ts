import departmentModel from "./departmentModel";
import { employeeUserBaseModel } from "./employeeUserBaseModel";
import { taskDocumentBaseModel } from "./taskDocumentBaseModel";
import { taskDocumentStatusBaseModel } from "./taskDocumentStatusBaseModel";


export interface taskDocumentAssignedDepartmentBaseModel {
  id: number;
  assignedToDepartmentId: number;
  department?: departmentModel | null;
  taskDocumentId: number;
  taskDocument:taskDocumentBaseModel;
  assignedDate: string;
  remarks: string;
  taskDocumentAssignedDepartment?: taskDocumentAssignedDepartmentBaseModel[] | null;
  taskDocumentStatus:taskDocumentStatusBaseModel[] | null;
  isActive: boolean;
}