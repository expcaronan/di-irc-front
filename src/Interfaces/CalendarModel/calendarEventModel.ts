export default interface  calendarEventModel{
    id: number,
    title: string,
    dateStart: string,
    dateEnd: string,
    timeStart: string | null,
    timeEnd: string | null,
    color: string,
    departmentIds:number[],
    employeeIds:number[],
}


