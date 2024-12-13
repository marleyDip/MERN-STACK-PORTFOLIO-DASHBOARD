import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    timeline: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllTimelineRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.timeline = [];
    },
    getAllTimelineSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.timeline = action.payload;
    },
    getAllTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.timeline = state.timeline;
    },

    addTimelineRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addTimelineSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    deleteTimelineRequest(state, action) {
      state.error = null;
      state.loading = true;
      state.message = null;
    },
    deleteTimelineSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    resetTimelineSlice(state, action) {
      state.error = null;
      state.loading = false;
      state.timeline = state.timeline;
      state.message = null;
    },

    clearAllErrors(state, action) {
      state.error = null;
      state.timeline = state.timeline;
    },
  },
});

export const getAllTimeline = () => async (dispatch) => {
  dispatch(timelineSlice.actions.getAllTimelineRequest());
  try {
    const { data } = await axios.get(
      "https://mern-stack-portfolio-backend-8509.onrender.com/api/v1/timeline/getall",
      { withCredentials: true }
    );
    dispatch(timelineSlice.actions.getAllTimelineSuccess(data.timelines));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.getAllTimelineFailed(error.response.data.message)
    );
  }
};

export const addNewTimeline = (timelineData) => async (dispatch) => {
  dispatch(timelineSlice.actions.addTimelineRequest());
  try {
    const { data } = await axios.post(
      "https://mern-stack-portfolio-backend-8509.onrender.com/api/v1/timeline/add",
      timelineData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(timelineSlice.actions.addTimelineSuccess(data.message));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.addTimelineFailed(error.response.data.message)
    );
  }
};

export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(timelineSlice.actions.deleteTimelineRequest());
  try {
    const { data } = await axios.delete(
      `https://mern-stack-portfolio-backend-8509.onrender.com/api/v1/timeline/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(timelineSlice.actions.deleteTimelineSuccess(data.message));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.deleteTimelineFailed(error.response.data.message)
    );
  }
};

export const resetTimelineSlice = () => (dispatch) => {
  dispatch(timelineSlice.actions.resetTimelineSlice());
};

export const clearAllTimelineErrors = () => (dispatch) => {
  dispatch(timelineSlice.actions.clearAllErrors());
};

export default timelineSlice.reducer;