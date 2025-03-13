import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";
const initialState = {
  enrollments: db.enrollments,
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, action) => {
      state.enrollments.push(action.payload);
    },
    unenroll: (state, action) => {
      state.enrollments = state.enrollments.filter((e: any) => e.course !== action.payload);
    },
  },
});
export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
