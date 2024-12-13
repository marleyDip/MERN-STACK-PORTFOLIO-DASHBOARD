import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareApplicationSlice = createSlice({
  name: "softwareApplications",
  initialState: {
    loading: false,
    softwareApplications: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllSoftwareApplicationsRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.softwareApplications = [];
    },
    getAllSoftwareApplicationsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.softwareApplications = action.payload;
    },
    getAllSoftwareApplicationsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.softwareApplications = state.softwareApplications;
    },

    addNewSoftwareApplicationsRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewSoftwareApplicationsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addNewSoftwareApplicationsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    deleteSoftwareApplicationsRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSoftwareApplicationsSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteSoftwareApplicationsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    resetSoftwareApplicationSlice(state, action) {
      state.loading = false;
      state.error = null;
      state.softwareApplications = state.softwareApplications;
      state.message = null;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.softwareApplications = state.softwareApplications;
    },
  },
});

export const getAllSoftwareApplications = () => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.getAllSoftwareApplicationsRequest()
  );
  try {
    const { data } = await axios.get(
      "https://mern-stack-portfolio-backend-8509.onrender.com/api/v1/softwareapplication/getall",
      { withCredentials: true }
    );
    dispatch(
      softwareApplicationSlice.actions.getAllSoftwareApplicationsSuccess(
        data.softwareApplications
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.getAllSoftwareApplicationsFailed(
        error.response.data.message
      )
    );
  }
};

export const addNewSoftwareApplication = (newData) => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.addNewSoftwareApplicationsRequest()
  );
  try {
    const { data } = await axios.post(
      "https://mern-stack-portfolio-backend-8509.onrender.com/api/v1/softwareapplication/add",
      newData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(
      softwareApplicationSlice.actions.addNewSoftwareApplicationsSuccess(
        data.message
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.addNewSoftwareApplicationsFailed(
        error.response.data.message
      )
    );
  }
};

export const deleteSoftwareApplication = (id) => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.deleteSoftwareApplicationsRequest()
  );
  try {
    const { data } = await axios.delete(
      `https://mern-stack-portfolio-backend-8509.onrender.com/api/v1/softwareapplication/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      softwareApplicationSlice.actions.deleteSoftwareApplicationsSuccess(
        data.message
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.deleteSoftwareApplicationsFailed(
        error.response.data.message
      )
    );
  }
};

export const clearAllSoftwareAppErrors = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.clearAllErrors());
};

export const resetSoftwareApplicationSlice = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.resetSoftwareApplicationSlice());
};

export default softwareApplicationSlice.reducer;
