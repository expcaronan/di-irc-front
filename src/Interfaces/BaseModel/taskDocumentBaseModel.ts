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
  forChiefAction: boolean,
  isActive: boolean;
  registrySectionId:number,
  officeId:number,
  taskDocumentAssignedDepartment?: taskDocumentAssignedDepartmentBaseModel[] | null;
}