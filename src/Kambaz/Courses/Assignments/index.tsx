import { ListGroup, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment, setAssignments } from "./reducer";
import { useEffect } from "react";
import * as coursesClient from "../client"
import * as assignmentsClient from "./client";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);
  const removeAssignment = async (assignmentId: any) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  return (
    <div>
      {currentUser?.role === "FACULTY" && (
        <div id="wd-assignments-controls" className="text-nowrap mb-3">
          <Button variant="danger" size="lg" className="me-1 float-end"
            id="wd-add-assignment"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/new`)}>
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
          </Button>
          <Button variant="secondary" size="lg" className="me-2 float-end" id="wd-add-assignment-group">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
          </Button>
          <div className="input-group w-25">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch className="text-gray-500" />
            </span>
            <input placeholder="Search..." id="wd-search-assignment" className="form-control border-start-0" />
          </div>
        </div>
      )}
      <br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />ASSIGNMENTS<ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {assignments
            // .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <ListGroup.Item key={assignment._id}
                  className="wd-lesson p-3 ps-1 border-start border-success border-4 border-top-0 border-end-0 border-bottom-0 d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <LuNotebookPen className="me-2 fs-3" />
                  <div>
                    <a href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                      className="fw-bold text-dark text-decoration-none">
                      {assignment.title}
                    </a>
                    <p className="text-muted mb-0">{assignment.details}</p>
                  </div>
                  <div className="ms-auto">
                    {currentUser?.role === "FACULTY" &&
                      <LessonControlButtons
                        assignmentId={assignment._id}
                        deleteAssignment={(assignmentId) => removeAssignment(assignmentId)}
                         />}
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}