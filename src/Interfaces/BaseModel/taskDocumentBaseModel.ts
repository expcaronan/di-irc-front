import { employeeUserBaseModel } from "./employeeUserBaseModel";
import { taskDocumentAssignedDepartmentBaseModel } from "./taskDocumentAssignedDepartmentBaseModel";


export interface taskDocumentBaseModel {
  id: number;
  documentRefNumber: number;
  documentTitle?: string | null;
  documentDescription?: string | null;
  dateCreated: string;
  dueDate: string;
  createdByEmployeeId: number;
  employee?: employeeUserBaseModel | null;
  documentFilePath?: string | null;
  isActive: boolean;
  taskDocumentAssignedDepartment?: taskDocumentAssignedDepartmentBaseModel[] | null;
}