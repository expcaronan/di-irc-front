import { employeeUserBaseModel } from "./employeeUserBaseModel";
import { taskDocumentAssignedEmployeeBaseModel } from "./taskDocumentAssignedEmployeeBaseModel";

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
  taskDocumentAssignedEmployee?: taskDocumentAssignedEmployeeBaseModel[] | null;
}