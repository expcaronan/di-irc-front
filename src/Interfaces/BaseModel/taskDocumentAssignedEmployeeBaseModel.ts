import { employeeUserBaseModel } from "./employeeUserBaseModel";
import { taskDocumentBaseModel } from "./taskDocumentBaseModel";
import { taskDocumentStatusBaseModel } from "./taskDocumentStatusBaseModel";

export interface taskDocumentAssignedEmployeeBaseModel {
  id: number;
  assignedToEmployeeId: number;
  employee?: employeeUserBaseModel | null;
  taskDocumentId: number;
  taskDocument:taskDocumentBaseModel;
  assignedDate: string;
  dateModified: string;
  taskDocumentStatus?: taskDocumentStatusBaseModel[] | null;
  isActive: boolean;
}