import calendarDepartmentModel from "./calendarDepartmentModel";
import calendarEmployeeModel from "./calendarEmployeeModel";

export default interface calendarDeptEmpModel{
    calendarDepartments : calendarDepartmentModel[],
    calendarEmployees : calendarEmployeeModel[]
}