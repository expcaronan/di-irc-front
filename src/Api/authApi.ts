import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrlString from "./baseUrlString";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({

  baseUrl : baseUrlString.test 
  }),
  tagTypes:["Users"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userCredentials) => ({
        url: "user/login",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: userCredentials,
      }),
      invalidatesTags:['Users'],
    }),

 
  }),
});

export const {
useLoginUserMutation,
} = authApi;
export default authApi;
