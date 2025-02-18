import { Form, Row, Col } from 'react-bootstrap';
import { useParams, Link } from "react-router";
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { aid, cid } = useParams();

  const assignment = db.assignments.find(a => a._id === aid);

  return (
    <div id="wd-assignments-editor">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label><strong>Assignment Name</strong></Form.Label>
          <Form.Control id="wd-name" defaultValue={assignment.title} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>Description</strong></Form.Label>
          <Form.Control as="textarea" id="wd-description" defaultValue={assignment.details} rows={5}/>
        </Form.Group>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Points</Form.Label>
              <Form.Control id="wd-points" defaultValue={assignment.points} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Assignment Group</Form.Label>
              <Form.Control as="select" id="wd-group">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAM</option>
                <option value="PROJECT">PROJECT</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Display Grade as</Form.Label>
              <Form.Control as="select" id="wd-display-grade-as">
                <option value="PERCENTAGE">Percentage</option>
                <option value="LETTER">Letter</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Submission Type</Form.Label>
              <Form.Control as="select" id="wd-submission-type">
                <option value="ONLINE">Online</option>
                <option value="INPERSON">In-Person</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Online Entry Options</Form.Label>
              <Form.Check type="checkbox" label="Text Entry" id="wd-text-entry" />
              <Form.Check type="checkbox" label="Website URL" id="wd-website-url" />
              <Form.Check type="checkbox" label="Media Recordings" id="wd-media-recordings" />
              <Form.Check type="checkbox" label="Student Annotation" id="wd-student-annotation" />
              <Form.Check type="checkbox" label="File Uploads" id="wd-file-upload" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Assign to</Form.Label>
              <Form.Control id="wd-assign-to" value="Everyone" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Due</Form.Label>
              <Form.Control type="date" id="wd-due-date" defaultValue={assignment.dueDate} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Assign from</Form.Label>
              <Form.Control type="date" id="wd-available-from" defaultValue={assignment.availableFrom} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Until</Form.Label>
              <Form.Control type="date" id="wd-available-until" defaultValue={assignment.availableUntil} />
            </Form.Group>
          </Col>
        </Row>
        <div id="wd-button" className="mt-4 d-flex justify-content-end">
          <Link to={`/Kambaz/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">Cancel</Link>
          <Link to={`/Kambaz/Courses/${cid}/Assignments`} className="btn btn-danger">Save</Link>
        </div>
      </Form>
    </div>
  );
}