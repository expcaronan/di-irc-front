import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrlString from "./baseUrlString";

const aiApi = createApi({
  reducerPath: "aiApi",
  baseQuery: fetchBaseQuery({

  baseUrl : baseUrlString.test 
  }),
  tagTypes:["aidetails"],
  endpoints: (builder) => ({
    callAskAi: builder.mutation({
      query: (req) => ({
        url: `DocumentChatAi`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: req,
      }),
      invalidatesTags:['aidetails'],
    }),

 
  }),
});

export const {
useCallAskAiMutation,
} = aiApi;
export default aiApi;
