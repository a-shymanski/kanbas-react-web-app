import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
export const deleteQuiz = async (quizId: any) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};

export const findQuestionsForQuizAndUser = async (quidId: string, userId: string) => {
  const response = await axios
    .get(`${QUIZZES_API}/${quidId}/questions/${userId}`);
  return response.data;
};

export const createQuestionForQuiz = async (quizId: string, question: any) => {
  const response = await axios.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return response.data;
}