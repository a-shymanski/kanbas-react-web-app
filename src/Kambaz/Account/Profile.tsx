import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <Form>
        <Form.Group controlId="wd-username">
          <Form.Control
            defaultValue="alice"
            placeholder="Username"
            className="wd-username" />
        </Form.Group>
        <Form.Group controlId="wd-password">
          <Form.Control
            defaultValue="123"
            placeholder="Password"
            type="password"
            className="wd-password" />
        </Form.Group>
        <Form.Group controlId="wd-firstname">
          <Form.Control
            defaultValue="Alice"
            placeholder="First Name" />
        </Form.Group>
        <Form.Group controlId="wd-lastname">
          <Form.Control
            defaultValue="Wonderland"
            placeholder="Last Name" />
        </Form.Group>
        <Form.Group controlId="wd-dob">
          <Form.Control
            defaultValue="2000-01-01"
            type="date" />
        </Form.Group>
        <Form.Group controlId="wd-email">
          <Form.Control
            defaultValue="alice@wonderland"
            type="email"
            placeholder="Email" />
        </Form.Group>
        <Form.Group controlId="wd-role">
          <Form.Control as="select" defaultValue="USER">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Control>
        </Form.Group>
        <Link id="wd-signout-btn"
          to="/Kambaz/Account/Signin"
          className="btn btn-danger w-100 mb-2">
          Signout </Link>
      </Form>
    </div>
  );
}

