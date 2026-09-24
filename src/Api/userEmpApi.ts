import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrlString from "./baseUrlString";

const userEmpApi = createApi({
  reducerPath: "userEmpApi",
  baseQuery: fetchBaseQuery({

  baseUrl : baseUrlString.test 
  }),
  tagTypes:["UserEmp"],
  endpoints: (builder) => ({
      registerUserEmp: builder.mutation({
        query: (UserEmpData) => ({
          url: "employee/register",
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: UserEmpData,
        }),
        invalidatesTags:['UserEmp'],
      }),
      getEmpDetailsDropdownList:builder.query({
            query: ()=> ({
                url:"employee/dropdown/list",
              }),
            providesTags:["UserEmp"]
      }),
      getEmpUserList:builder.query({
            query: ()=> ({
                url:"employee/useremp",
              }),
            providesTags:["UserEmp"]
      }),

 
  }),
});

export const {
  useRegisterUserEmpMutation,
  useGetEmpDetailsDropdownListQuery,
  useGetEmpUserListQuery
  } = userEmpApi;

export default userEmpApi;
