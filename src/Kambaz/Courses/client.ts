import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const createAssignmentForCourse = async (courseId: any, assignment: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const createQuizForCourse = async (courseId: any, quiz: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

export const fetchAllEnrollments = async () => {
  const { data } = await axios.get(`${COURSES_API}/enrollments`);
  return data;
};

export const setEnrollments = async (enrollments: any[]) => {
  const { data } = await axios.post(`${COURSES_API}/enrollments`, enrollments);
  return data;
};

export const enrollUserInCourse = async (user: any, course: any) => { 
  const { data } = await axios.post(`${COURSES_API}/${course._id}/${user._id}/enrollments`, {
    user,
    course,
  });
  return data;
}
export const unenrollUserFromCourse = async (user: any, course: any) => {
  const { data } = await axios.delete(`${COURSES_API}/${course._id}/${user._id}/enrollments`, {
    data: {
      user,
      course,
    },
  });
  return data;
}
