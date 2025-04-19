import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentsReducer from "./Enrollments/reducer";
import coursesReducer from "./Courses/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer";
import questionsReducer from "./Courses/Quizzes/Questions/reducer";
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
    coursesReducer,
    quizzesReducer,
    questionsReducer,
  },
});
export default store;