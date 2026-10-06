import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrlString from "./baseUrlString";

const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({

  baseUrl : baseUrlString.test 
  }),
  tagTypes:["notifications"],
  endpoints: (builder) => ({
    // createNotifiedUsers: builder.mutation({
    //   query: (notifiedUsers) => ({
    //     url: "notifications/create",
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //     body: notifiedUsers,
    //   }),
    //   invalidatesTags:['notifications'],
    // }),
    // getNotificationList:builder.query({
    //         query: (details)=> ({
    //             url:"notifications/list",
    //               method: "GET",
    //             params: {
    //               details:details
    //           },
    //           }),
              
    //         providesTags:["notifications"]
    // }),
 
  }),
});

export const {
//useCreateNotifiedUsersMutation,
//useGetNotificationListQuery
} = notificationApi;
export default notificationApi;
