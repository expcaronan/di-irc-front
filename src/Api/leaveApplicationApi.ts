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

     getAllLeaveForApprovals:builder.query({
            query: ({employeeId,leaveTypeId,pageNumber, statusId, pageSize,searchString,fromDate,toDate})=> ({
                url:'leaveApplication/forApproval/list',
                params : {
                ...(employeeId && {employeeId}),
                ...(leaveTypeId && {leaveTypeId}),
                ...(statusId && { statusId }),
                ...(pageNumber && { pageNumber }),
                ...(pageSize && { pageSize }),
                ...(searchString && { searchString }),
                ...(fromDate && { fromDate }),
                ...(toDate && { toDate })
              }
            }),
            providesTags:["leaveApplication"]
    }),
    createLeaveApplicationApproved: builder.mutation({
      query: (data) => ({
        url: "leaveApplication/approved",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: data,
      }),
      invalidatesTags:['leaveApplication'],
    }),
    createLeaveApplicationDisApproved: builder.mutation({
      query: (data) => ({
        url: "leaveApplication/disapproved",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: data,
      }),
      invalidatesTags:['leaveApplication'],
    }),
    updateLeaveApplicationApprove: builder.mutation({
      query: (data) => ({
        url: "leaveApplication/approval/update",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: data,
      }),
      invalidatesTags:['leaveApplication'],
    }),


  }),
});

export const {
useCreateLeaveApplicationMutation,
useUpdateLeaveApplicationMutation,
useDeleteLeaveApplicationByIdMutation,
useGetLeaveStatusByEmpIdQuery,
useGetAllLeaveForApprovalsQuery,
useCreateLeaveApplicationApprovedMutation,
useCreateLeaveApplicationDisApprovedMutation,
useUpdateLeaveApplicationApproveMutation

} = leaveApplicationApi;
export default leaveApplicationApi;
