
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
    query: (taskDocumentStatusData) => ({
        url: "taskdocumentstatus/create",
        method: "POST",
        body: taskDocumentStatusData,
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

  }),



});

export const {
useCreateTaskDocumentMutation,
useCreateTaskDocumentStatusMutation,
useGetAllTaskDocumentsWithAssignedDepartmentCreatedByQuery,
useGetAllTaskDocumentsWithAssignedDepartmentByIdQuery,
useGetDeptRrsOfficeDropdownListQuery
} = taskDocumentApi;
export default taskDocumentApi;
