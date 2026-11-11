import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrlString from "./baseUrlString";

const calendarEventApi = createApi({
  reducerPath: "calendarEventApi",
  baseQuery: fetchBaseQuery({

  baseUrl : baseUrlString.test 
  }),
  tagTypes:["calendarEvent"],
  endpoints: (builder) => ({
      createCalendarEvent: builder.mutation({
        query: (calendarData) => ({
          url: "calendar/create",
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: calendarData,
        }),
        invalidatesTags:['calendarEvent'],
      }),
     
      getDetailsDropdownList:builder.query({
            query: ()=> ({
                url:"CalendarEventDepartment/list/dropdown",
              }),
            providesTags:["calendarEvent"]
      }),
      getCalendarEventList:builder.query({
            query: ()=> ({
                url:"Calendar/list",
              }),
            providesTags:["calendarEvent"]
      }),
      getCalendarEventFilterByEmpIdDeptIdList:builder.query({
            query: ({employeeId, departmentId})=> ({
                url:"Calendar/filterById/list",
                  params: {
                  employeeId,departmentId
                  },
              }),
            providesTags:["calendarEvent"]
      }),
     
 
  }),
});

export const {
  useCreateCalendarEventMutation,
  useGetDetailsDropdownListQuery,
  useGetCalendarEventListQuery,
  useGetCalendarEventFilterByEmpIdDeptIdListQuery,
  
  
  } = calendarEventApi;

export default calendarEventApi;
