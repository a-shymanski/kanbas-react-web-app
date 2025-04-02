import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";

const initialState = {
  enrollments: db.enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enroll: (state, action) => {
      state.enrollments.push(action.payload);
    },
    unenroll: (state, action) => {
      state.enrollments = state.enrollments.filter((e: any) => e.course !== action.payload);
    },
  },
});

export const { enroll, unenroll, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;


// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Enrollment {
//   _id: string;
//   user: string;
//   course: string;
// }

// interface EnrollmentsState {
//   enrollments: Enrollment[];
// }

// const initialState: EnrollmentsState = {
//   enrollments: [],
// };

// const enrollmentsSlice = createSlice({
//   name: "enrollments",
//   initialState,
//   reducers: {
//     setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
//       state.enrollments = action.payload;
//     },
//     enroll: (state, action: PayloadAction<Enrollment>) => {
//       state.enrollments.push(action.payload);
//     },
//     unenroll: (state, action: PayloadAction<string>) => {
//       state.enrollments = state.enrollments.filter((e) => e.course !== action.payload);
//     },
//   },
// });

// export const { enroll, unenroll, setEnrollments } = enrollmentsSlice.actions;
// export default enrollmentsSlice.reducer;
