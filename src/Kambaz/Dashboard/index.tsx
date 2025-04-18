import { Link } from "react-router-dom";
import { FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
// import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
export default function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse, userEnrollments, addEnrollment, deleteEnrollment}: {
      courses: any[]; course: any; setCourse: (course: any) => void;
      addNewCourse: () => void; deleteCourse: (course: any) => void;
      updateCourse: () => void;
      userEnrollments : any[];
      addEnrollment: (course: any) => void; deleteEnrollment: (course: any) => void;
    }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [showAll, setShowAll] = useState(false);
  const isUserEnrolledInCourse = (course: any) => {
    return userEnrollments.some(enrollment => 
      enrollment.course === course._id
      && enrollment.user === currentUser._id
    );
  };

  return (
    <div id="wd-dashboard">
      <div>
        <h1 id="wd-dashboard-title">Dashboard
          {currentUser && currentUser.role === "STUDENT" && (
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" onClick={() => setShowAll(!showAll)} id="wd-enrollments-toggle">
                Enrollments
              </button>
            </div>
          )}</h1> </div><hr />
      {currentUser && currentUser.role === "FACULTY" && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h5>New Course ... </h5>
            <div>
              <button className="btn btn-warning me-2"
                onClick={updateCourse} id="wd-update-course-click">
                Update
              </button>
              <button className="btn btn-primary" id="wd-add-new-course-click" onClick={addNewCourse}> Add </button>
            </div>
          </div><br />
          <FormControl value={course.name} className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl as="textarea" value={course.description} rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>)}
        <div>
      <h2 id="wd-dashboard-published">
        {showAll ? (`All Courses (${courses.length})`) : (`Published Courses (${courses.filter((course) => {isUserEnrolledInCourse(course)}).length})`)}</h2>
        </div>
        <hr />
      <div className="row" id="wd-dashboard-courses">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {(currentUser && currentUser.role === "STUDENT" ? (showAll ? courses : courses.filter((course) => isUserEnrolledInCourse(course))) : courses)
            .map((course: any) => {
              return (
                <div key={course._id} className="col" style={{ width: "300px" }}>
                  <div className="card">
                    {currentUser && currentUser.role === "STUDENT" ? (
                      showAll ? (
                        isUserEnrolledInCourse(course) ? (
                          <div>
                            <Link to={`/Kambaz/Courses/${course._id}/Home`} className="text-decoration-none text-dark">
                              <img src={course.image.charAt(0) === "/" ? course.image : `/images/${course.image}`} alt={course.name} className="card-img-top" />
                              <div className="card-body">
                                <h5 className="card-title">{course.name}</h5>
                                <p className="card-text">{course.description}</p>
                                <button className="btn btn-primary"> Go </button>
                              </div>
                            </Link>
                            <div className="card-footer d-flex justify-content-start">
                                <button
                                  onClick={() => {
                                    deleteEnrollment(course);
                                  }}
                                  className="btn btn-danger"
                                  id="wd-unenroll-course-click"
                                >
                                  Unenroll
                                </button>
                              </div>
                            </div>
                        ) : (
                          <div className="text-decoration-none text-dark">
                            <img src={course.image.charAt(0) === "/" ? course.image : `/images/${course.image}`} alt={course.name} className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">{course.name}</h5>
                              <p className="card-text">{course.description}</p>
                              <button className="btn btn-primary"> Go </button>
                              <button onClick={ () => {
                                addEnrollment(course)
                              }
                              } className="btn btn-success float-end" id="wd-enroll-course-click">
                                Enroll
                              </button>
                            </div>
                          </div>
                        )
                      ) : (
                        <Link to={`/Kambaz/Courses/${course._id}/Home`} className="text-decoration-none text-dark">
                          <img src={course.image.charAt(0) === "/" ? course.image : `/images/${course.image}`} alt={course.name} className="card-img-top" />
                          <div className="card-body">
                            <h5 className="card-title">{course.name}</h5>
                            <p className="card-text">{course.description}</p>
                            <button className="btn btn-primary"> Go </button>
                          </div>
                        </Link>
                      )
                    ) : (
                      <Link to={`/Kambaz/Courses/${course._id}/Home`} className="text-decoration-none text-dark">
                        <img src={course.image.charAt(0) === "/" ? course.image : `/images/${course.image}`} alt={course.name} className="card-img-top" />
                        <div className="card-body">
                          <h5 className="card-title">{course.name}</h5>
                          <p className="card-text">{course.description}</p>
                          <button className="btn btn-primary"> Go </button>
                          {currentUser && currentUser.role === "FACULTY" && (
                            <>
                              <button onClick={(event) => {
                                event.preventDefault();
                                deleteCourse(course._id);
                              }} className="btn btn-danger float-end"
                                id="wd-delete-course-click">
                                Delete
                              </button>
                              <button id="wd-edit-course-click"
                                onClick={(event) => {
                                  event.preventDefault();
                                  setCourse(course);
                                }}
                                className="btn btn-warning me-2 float-end" >
                                Edit
                              </button>
                            </>
                          )}
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  );
}
