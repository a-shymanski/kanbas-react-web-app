import { Form, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import { v4 as uuidv4 } from "uuid";
import * as coursesClient from "../client"
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isNew = aid === "new";
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const existingAssignment = assignments.find((a: any) => a._id === aid) || {};
  const [assignment, setAssignment] = useState({
    _id: isNew ? uuidv4() : existingAssignment._id || "",
    title: existingAssignment.title || "",
    details: existingAssignment.details || "",
    points: existingAssignment.points || "",
    dueDate: existingAssignment.dueDate || "",
    availableFrom: existingAssignment.availableFrom || "",
    availableUntil: existingAssignment.availableUntil || "",
    course: cid,
  });
  useEffect(() => {
    if (!isNew && existingAssignment._id) {
      setAssignment(existingAssignment);
    }
  }, [isNew, existingAssignment]);
  const handleSave = async () => {
    if (!cid) return;
    if (isNew) {
      const newAssignment = {
        title: assignment.title,
        details: assignment.details,
        points: assignment.points,
        dueDate: assignment.dueDate,
        availableFrom: assignment.availableFrom,
        availableUntil: assignment.availableUntil,
        course: cid,
      };
      const savedAssignment = await coursesClient.createAssignmentForCourse(cid, newAssignment)
      dispatch(addAssignment(savedAssignment))
    } else {
      const updatedAssignment = await assignmentsClient.updateAssignment(assignment)
      dispatch(updateAssignment(updatedAssignment));
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };
  return (
    <div id="wd-assignments-editor">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label><strong>Assignment Name</strong></Form.Label>
          <Form.Control id="wd-name" value={assignment.title} onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>Description</strong></Form.Label>
          <Form.Control as="textarea" id="wd-description" value={assignment.details} onChange={(e) => setAssignment({ ...assignment, details: e.target.value })} rows={5}/>
        </Form.Group>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Points</Form.Label>
              <Form.Control id="wd-points" value={assignment.points} onChange={(e) => setAssignment({ ...assignment, points: e.target.value })} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Due</Form.Label>
              <Form.Control type="date" id="wd-due-date" value={assignment.dueDate} onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Assign from</Form.Label>
              <Form.Control type="date" id="wd-available-from" value={assignment.availableFrom} onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Until</Form.Label>
              <Form.Control type="date" id="wd-available-until" value={assignment.availableUntil} onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })} />
            </Form.Group>
          </Col>
        </Row>
        <div id="wd-button" className="mt-4 d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments`)}>Cancel</Button>
          {currentUser?.role === "FACULTY" && (
          <Button variant="danger" onClick={handleSave}>Save</Button>)}
        </div>
      </Form>
    </div>
  );
}
