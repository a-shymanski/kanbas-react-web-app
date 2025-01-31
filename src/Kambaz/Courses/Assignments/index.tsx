import { ListGroup, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import ModuleControlButtons from "./ModuleControlButtons";
import { FaSearch } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import LessonControlButtons from "./LessonControlButtons";
export default function Assignments() {
  return (
    <div>
      <div id="wd-assignments-controls" className="text-nowrap mb-3">
        <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />Assignment</Button>
        <Button variant="secondary" size="lg" className="me-2 float-end" id="wd-add-assignment-group">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />Group</Button>
        <div className="input-group w-25">
          <span className="input-group-text bg-white border-end-0">
            <FaSearch className="text-gray-500" /></span>
          <input placeholder="Search..." id="wd-search-assignment" className="form-control border-start-0" />
        </div>
      </div><br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />ASSIGNMENTS<ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {assignments.map((assignment, index) => (
              <ListGroup.Item key={index} className="wd-lesson p-3 ps-1 border-start border-success border-4 border-top-0 border-end-0 border-bottom-0 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <LuNotebookPen className="me-2 fs-3" />
                <div>
                  <a href={assignment.link} className="fw-bold text-dark text-decoration-none">
                    {assignment.title}</a>
                  <p className="text-muted mb-0">{assignment.details}</p>
                </div>
                <div className="ms-auto">
                  <LessonControlButtons />
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

const assignments = [
  {title: "A1 - ENV + HTML",
    link: "#/Kambaz/Courses/1234/Assignments/123",
    details: "Multiple Modules | Not available until May 6 at 12:00am | Due May 13 at 11:59pm | 100 pts"},
  {title: "A2 - CSS + BOOTSTRAP",
    link: "#/Kambaz/Courses/1234/Assignments/123",
    details: "Multiple Modules | Not available until May 13 at 12:00am | Due May 20 at 11:59pm | 100 pts"},
  {title: "A3 - JAVASCRIPT + REACT",
    link: "#/Kambaz/Courses/1234/Assignments/123",
    details: "Multiple Modules | Not available until May 20 at 12:00am | Due May 27 at 11:59pm | 100 pts"}];
