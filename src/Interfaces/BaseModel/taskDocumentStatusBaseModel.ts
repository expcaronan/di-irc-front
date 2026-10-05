import { taskDocumentAssignedEmployeeBaseModel } from "./taskDocumentAssignedEmployeeBaseModel";
import { taskStatusBaseModel } from "./taskStatusBaseModel";
import { taskSupervisorCommentBaseModel } from "./taskSupervisorCommentBaseModel";

export interface taskDocumentStatusBaseModel {
  id: number;
  taskDocumentAssignedEmployeeId: number;
  taskDocumentAssignedEmployee?: taskDocumentAssignedEmployeeBaseModel | null;
  assignedRemarks?: string | null;
  dateUpdate: string;
  taskStatusId: number;
  taskStatus?: taskStatusBaseModel | null;
  isActive: boolean;
  taskSupervisorComment:taskSupervisorCommentBaseModel | null;
  documentFilePath?: string | null;
}