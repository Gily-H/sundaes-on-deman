import React from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";

export default function ToppingOption({ name, imagePath, updateItemCount }) {
  // handler to update topping count when a topping checkbox is checked
  const handleChange = (event) => {
    if (event.target.checked) {
      updateItemCount(name, 1);
    } else {
      updateItemCount(name, 0);
    }
  };

  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" onChange={(event) => handleChange(event)} label={name} />
      </Form.Group>
    </Col>
  );
}
