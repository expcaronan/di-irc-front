import { employeeUserBaseModel } from "./employeeUserBaseModel";
import { taskDocumentStatusBaseModel } from "./taskDocumentStatusBaseModel";

export interface taskDocumentAssignedEmployeeBaseModel {
  id: number;
  assignedToEmployeeId: number;
  employee?: employeeUserBaseModel | null;
  taskDocumentId: number;
  assignedDate: string;
  dateModified: string;
  taskDocumentStatus?: taskDocumentStatusBaseModel[] | null;
  isActive: boolean;
}