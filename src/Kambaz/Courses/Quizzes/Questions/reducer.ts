import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const initialState = {
    questions: [],
};
const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        addQuestion: (state, { payload: question }) => {
            const newQuestion: any = {
                _id: uuidv4(),
                title: question.title,
                question: question.question,
                quiz: question.quiz,
                type: question.type,
                points: question.points,
                answers: question.answers,
            };
            state.questions = [...state.questions, newQuestion] as any;
        },
        deleteQuestion: (state, { payload: questionId }) => {
            state.questions = state.questions.filter(
                (q: any) => q._id !== questionId);
        },
        updateQuestion: (state, { payload: question }) => {
            state.questions = state.questions.map((q: any) =>
                q._id === question._id ? question : q
            ) as any;
        },
        editQuestion: (state, { payload: questionId }) => {
            state.questions = state.questions.map((q: any) =>
                q._id === questionId ? { ...q, editing: true } : q
            ) as any;
        },
        cancelEditQuestion: (state, { payload: questionId }) => {
            state.questions = state.questions.map((q: any) =>
                q._id === questionId ? { ...q, editing: false } : q
            ) as any;
        },
    },
});
export const { addQuestion, updateQuestion, deleteQuestion, editQuestion, cancelEditQuestion, setQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;