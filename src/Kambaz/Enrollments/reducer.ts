import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
    enrollments: enrollments,
};
const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        setEnrollments: (state, action) => {
            state.enrollments = action.payload;
        },
        addEnrollment: (state, { payload: enrollment }) => {
        const newEnrollment: any = {
            _id: uuidv4(),
            user: enrollment.user,
            course: enrollment.course,
            };
        state.enrollments = [...state.enrollments, newEnrollment] as any;
        },

        deleteEnrollment: (state, { payload: enrollmentId }) => {
            state.enrollments = state.enrollments.filter(
            (a: any) => a._id !== enrollmentId);
        },
        updateEnrollment: (state, { payload: enrollment }) => {
            state.enrollments = state.enrollments.map((c: any) =>
            c._id === enrollment._id ? enrollment : c
            ) as any;
        },

},
});
export const { setEnrollments, addEnrollment, deleteEnrollment, updateEnrollment } =
enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;