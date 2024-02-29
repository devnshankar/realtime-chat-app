import React, { useRef } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Button, Container, Form } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";

export default function Login({ onIdSubmit }) {
  const idRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  }

  function createNewId() {
    onIdSubmit(uuidV4())
  }

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Enter your id</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <Button type="submit">Login</Button>
        <Button onClick={createNewId} variant="secondary">Create A new Id</Button>
      </Form>
    </Container>
  );
}

// Prop Types validation
Login.propTypes = {
  onIdSubmit: PropTypes.func.isRequired, // Validate that onIdSubmit is a required function
};
