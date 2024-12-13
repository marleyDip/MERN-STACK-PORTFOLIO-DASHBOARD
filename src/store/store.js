import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";

import forgotPasswordReducer from "./slices/forgotResetPasswordSlice";

import messagesReducer from "./slices/messagesSlice";

import timelineReducer from "./slices/timelineSlice";

import skillReducer from "./slices/skillSlice";

import softwareApplicationReducer from "./slices/softwareApplicationSlice";

import projectReducer from "./slices/projectSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,

    forgotPassword: forgotPasswordReducer,

    messages: messagesReducer,

    timeline: timelineReducer,

    skill: skillReducer,

    project: projectReducer,

    softwareApplications: softwareApplicationReducer,
  },
});
