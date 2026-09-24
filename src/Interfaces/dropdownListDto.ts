import departmentModel from "./BaseModel/departmentModel";
import designationModel from "./BaseModel/designationModel";
import rankModel from "./BaseModel/rankModel";
import roleModel from "./BaseModel/roleModel";

export default interface dropdownListDto {
    departments:departmentModel[],
    designations:designationModel[],
    ranks:rankModel[],
    roles:roleModel[],
}