import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const { data } = await axios.post(ENROLLMENTS_API, { userId, courseId });
  return data;};
export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  const { data } = await axios.delete(ENROLLMENTS_API, {
    data: { userId, courseId },});
  return data;};