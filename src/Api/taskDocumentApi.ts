
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
    getAllTaskDocumentsWithAssignedEmployeeCreatedBy:builder.query({
            query: (id:number)=> ({
                url:'taskdocument/documents/list',
                  params: {
                  id:id
              },
            }),
            providesTags:["taskDocuments"]
    }),

     getAllTaskDocumentsWithAssignedEmployeeById:builder.query({
            query: (id:number)=> ({
                url:'TaskDocumentStatus/assigned/list',
                  params: {
                  id:id
              },
            }),
            providesTags:["taskDocuments"]
    }),

  }),



});

export const {
useCreateTaskDocumentMutation,
useGetAllTaskDocumentsWithAssignedEmployeeCreatedByQuery,
useGetAllTaskDocumentsWithAssignedEmployeeByIdQuery
} = taskDocumentApi;
export default taskDocumentApi;
