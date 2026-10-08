import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrlString from "./baseUrlString";

const attendanceApi = createApi({
  reducerPath: "attendanceApi",
  baseQuery: fetchBaseQuery({

  baseUrl : baseUrlString.test 
  }),
  tagTypes:["empAttendance"],
  endpoints: (builder) => ({
      employeeTimein: builder.mutation({
        query: (UserEmpData) => ({
          url: "employee/timein",
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: UserEmpData,
        }),
        invalidatesTags:['empAttendance'],
      }),
          employeeTimeout: builder.mutation({
        query: (UserEmpData) => ({
          url: "employee/timeout",
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: UserEmpData,
        }),
        invalidatesTags:['empAttendance'],
      }),
    
      getEmployeeByDateId:builder.query({
            query: (id:number)=> ({
                url:`employee/bydate/${id}`,
              }),
            providesTags:["empAttendance"]
      }),
        getAttendanceListByEmpId:builder.query({
            query: ({empId, fromDate, toDate})=> ({
                url:'employeeattendance/empId',
                 params: {
                  empId,
            ...(fromDate && { fromDate }),
            ...(toDate && { toDate }),
         },
            }),
            providesTags:["empAttendance"]
        }),
        getAttendanceNoBioById:builder.query({
            query: (empId)=> ({
                url:'employeeattendance/nobio/empid',
                  params: {
                  empId
              },
            }),
            providesTags:["empAttendance"]
        }),
        getAttendanceNoBio:builder.query({
            query: (deptId)=> ({
                url:'employeeattendance/nobio/deptid',
                params:{
                  deptId
              },
            }),
            providesTags:["empAttendance"]
        }),
              
  
  }),
});

export const {
  useEmployeeTimeinMutation,
  useEmployeeTimeoutMutation,
  useGetEmployeeByDateIdQuery,
  useGetAttendanceListByEmpIdQuery,
  useGetAttendanceNoBioByIdQuery,
  useGetAttendanceNoBioQuery,

  } = attendanceApi;

export default attendanceApi;
