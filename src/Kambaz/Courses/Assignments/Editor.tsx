import { Form, Button, Row, Col } from 'react-bootstrap';
export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label><strong>Assignment Name</strong></Form.Label>
          <Form.Control id="wd-name" value="A1 - ENV + HTML" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>Description</strong></Form.Label>
          <Form.Control
            as="textarea"
            id="wd-description"
            value="The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbaz application Links to all relevant source code repositories The Kanbaz application should include a link to navigate back to the landing page."
            rows={5}/>
        </Form.Group>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Points</Form.Label>
              <Form.Control id="wd-points" value={100} />
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
              <Form.Control type="date" id="wd-due-date" value="2024-05-13" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Assign from</Form.Label>
              <Form.Control type="date" value="2024-05-06" id="wd-available-from" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Until</Form.Label>
              <Form.Control type="date" value="2024-05-20" id="wd-available-until" />
            </Form.Group>
          </Col>
        </Row>
        <div id="wd-button" className="mt-4 d-flex justify-content-end">
          <Button variant="secondary" className="me-2">Cancel</Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}
