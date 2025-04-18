import { Routes, Route, Navigate } from "react-router";
import "./styles.css";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
// import * as db from "./Database";
import { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
// import * as client from "./Courses/client";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import { useSelector } from "react-redux";
import { setEnrollments } from "./Enrollments/reducer";
import { useDispatch } from "react-redux";
import { setCourses } from "./Courses/reducer";

export default function Kambaz() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const fetchEnrollments = async () => {
    try {
      const enrollments = await courseClient.fetchAllEnrollments();
      dispatch(setEnrollments(enrollments));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchEnrollments();
  }
  , [currentUser]);
  
  const handleAddEnrollment = async (course: any) => {
    const newEnrollment = await courseClient.enrollUserInCourse(currentUser, course);
    dispatch(setEnrollments([ ...enrollments, newEnrollment ]));
  };
  const handleDeleteEnrollment = async (course: any) => {
    await courseClient.unenrollUserFromCourse(currentUser, course);
    dispatch(setEnrollments(enrollments.filter((enrollment:any) => enrollment._id !== enrollment._id)));
  };

  const fetchAllUserCourses = async () => {
    try {
      const courses = await courseClient.fetchAllCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAllUserCourses();
  }, [currentUser]);
  
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });
  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    dispatch(setCourses([ ...courses, newCourse ]));
  };
  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course:any) => course._id !== courseId)));
  };
  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    dispatch(setCourses(courses.map((c : any) => {
      if (c._id === course._id) { return course; }
      else { return c; }
  })));
  };
  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="/Dashboard" element={<ProtectedRoute>
              <Dashboard
                courses={courses}
                course={course}
                setCourse={setCourse}
                addNewCourse={addNewCourse}
                deleteCourse={deleteCourse}
                updateCourse={updateCourse}
                userEnrollments={enrollments}
                addEnrollment={handleAddEnrollment}
                deleteEnrollment={handleDeleteEnrollment} /></ProtectedRoute>
            } />
            <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}