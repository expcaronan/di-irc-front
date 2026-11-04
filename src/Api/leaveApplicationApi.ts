import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrlString from "./baseUrlString";

const leaveApplicationApi = createApi({
  reducerPath: "leaveApplicationApi",
  baseQuery: fetchBaseQuery({

  baseUrl : baseUrlString.test 
  }),
  tagTypes:["leaveApplication"],
  endpoints: (builder) => ({
    createLeaveApplication: builder.mutation({
      query: (data) => ({
        url: "leaveApplication/create",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: data,
      }),
      invalidatesTags:['leaveApplication'],
    }),
    updateLeaveApplication: builder.mutation({
      query: (data) => ({
        url: "leaveApplication/update",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: data,
      }),
      invalidatesTags:['leaveApplication'],
    }),
    deleteLeaveApplicationById: builder.mutation({
      query: (id:number) => ({
        url: `leaveApplication/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:['leaveApplication'],
    }),
    getLeaveStatusByEmpId:builder.query({
            query: (employeeId:number)=> ({
                url:`leaveApplication/list/${employeeId}`,
            }),
      providesTags:["leaveApplication"]
    }),


  }),
});

export const {
useCreateLeaveApplicationMutation,
useUpdateLeaveApplicationMutation,
useDeleteLeaveApplicationByIdMutation,
useGetLeaveStatusByEmpIdQuery,

} = leaveApplicationApi;
export default leaveApplicationApi;
