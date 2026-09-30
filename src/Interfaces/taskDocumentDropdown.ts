import departmentModel from "./BaseModel/departmentModel";
import officeBaseModel from "./BaseModel/officeBaseModel";
import { registrySectionModel } from "./BaseModel/registrySectionModel";

export default interface taskDocumentDropdown {
    departments:departmentModel[],
    registrySections:registrySectionModel[],
    offices:officeBaseModel[],
}