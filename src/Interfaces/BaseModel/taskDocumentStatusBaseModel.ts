import { taskDocumentAssignedEmployeeBaseModel } from "./taskDocumentAssignedEmployeeBaseModel";
import { taskStatusBaseModel } from "./taskStatusBaseModel";

export interface taskDocumentStatusBaseModel {
  id: number;
  taskDocumentAssignedEmployeeId: number;
  taskDocumentAssignedEmployee?: taskDocumentAssignedEmployeeBaseModel | null;
  assignedComments?: string | null;
  dateUpdate: string;
  taskStatusId: number;
  taskStatus?: taskStatusBaseModel | null;
  isActive: boolean;
}