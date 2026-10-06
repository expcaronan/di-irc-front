
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrlString from "./baseUrlString";

const taskDocumentApi = createApi({
  reducerPath: "taskDocumentApi",
  baseQuery: fetchBaseQuery({

  baseUrl : baseUrlString.test 
  }),
  tagTypes:["taskDocuments"],
  endpoints: (builder) => ({
    createTaskDocument: builder.mutation({
    query: (formData: FormData) => ({
        url: "taskdocument/create/formdata",
        method: "POST",
        body: formData,
    }),
        invalidatesTags:['taskDocuments'],
    }),

    createTaskDocumentStatus: builder.mutation({
    query: (taskDocumentStatusData:FormData) => ({
        url: "taskdocumentstatus/create",
        method: "POST",
        body: taskDocumentStatusData,
    }),
        invalidatesTags:['taskDocuments'],
    }),
    updateTaskDocumentStatus: builder.mutation({
    query: (taskDocumentStatusData) => ({
        url: "taskdocumentstatus/update/status",
        method: "POST",
        body: taskDocumentStatusData,
    }),
        invalidatesTags:['taskDocuments'],
    }),

    updateTaskDocumentStatusAssingedDept: builder.mutation({
    query: (taskDocumentStatusData) => ({
        url: "taskDocumentAssignedDepartment/assign/departments",
        method: "POST",
        body: taskDocumentStatusData,
    }),
        invalidatesTags:['taskDocuments'],
    }),

    deleteTaskDocument: builder.mutation({
    query: (id:number) => ({
        url: `taskDocument/delete/${id}`,
        method: "DELETE",
       
    }),
        invalidatesTags:['taskDocuments'],
    }),

    getAllTaskDocumentsWithAssignedDepartmentCreatedBy:builder.query({
            query: (id:number)=> ({
                url:'taskdocument/documents/list',
                  params: {
                  id:id
              },
            }),
            providesTags:["taskDocuments"]
    }),

     getAllTaskDocumentsWithAssignedDepartmentById:builder.query({
            query: (id:number)=> ({
                url:'TaskDocumentStatus/assigned/list',
                  params: {
                  id:id
              },
            }),
            providesTags:["taskDocuments"]
    }),
      getDeptRrsOfficeDropdownList:builder.query({
            query: ()=> ({
                url:"taskdocument/dropdown/list",
              }),
            providesTags:["taskDocuments"]
      }),
    createNotifiedUsers: builder.mutation({
      query: (notifiedUsers) => ({
        url: "notifications/create",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: notifiedUsers,
      }),
      invalidatesTags:['taskDocuments'],
    }),
    getNotificationList:builder.query({
            query: (employeeId:number)=> ({
                url:"notifications/list",
                params: {
                  employeeId:employeeId
                },
              }),
              
            providesTags:["taskDocuments"]
    }),

  }),



});

export const {
useCreateTaskDocumentMutation,
useDeleteTaskDocumentMutation,
useCreateTaskDocumentStatusMutation,
useUpdateTaskDocumentStatusMutation,
useUpdateTaskDocumentStatusAssingedDeptMutation,
useGetAllTaskDocumentsWithAssignedDepartmentCreatedByQuery,
useGetAllTaskDocumentsWithAssignedDepartmentByIdQuery,
useGetDeptRrsOfficeDropdownListQuery,
useCreateNotifiedUsersMutation,
useGetNotificationListQuery,
} = taskDocumentApi;
export default taskDocumentApi;
