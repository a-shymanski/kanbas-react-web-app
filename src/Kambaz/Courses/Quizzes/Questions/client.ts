import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

export const deleteQuestion = async (quesId: any) => {
    const response = await axios.delete(`${QUESTIONS_API}/${quesId}`);
    return response.data;
};
export const updateQuestion = async (question: any) => {
    const { data } = await axios.put(`${QUESTIONS_API}/${question._id}`, question);
    return data;
};
export const findQuestionsForQuiz = async (quizId: any) => {
    const response = await fetch(`/api/quizzes/${quizId}/questions`);
    return await response.json();
};
