export interface attendanceWithEmp{
id: number;
date: string;       // ISO date string from backend
timeIn: string;     // ISO datetime string
timeOut?: string | null; // nullable in C#
employeeId: number;
employeeName:string; // reference to Employee interface
designationName:string; 
departmentName:string;
remarks:string;
isApprove:boolean;
}