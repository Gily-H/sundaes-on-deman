import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function ScoopOption({ name, imagePath, updateItemCount }) {
  const [isValid, setIsValid] = useState(true);

  // handler for clicking on input spinner for scoops
  const handleChange = (event) => {
    const currentvalue = event.target.value;

    // convert to number (potentially decimal)
    const currentValueFloat = parseFloat(currentvalue);
    // check for valid input
    const validValue =
      0 <= currentValueFloat && // check if negative
      currentValueFloat <= 10 && // check if too high
      Math.floor(currentValueFloat) === currentValueFloat; // check if decimal

    setIsValid(validValue);

    // only update option count if input is valid
    validValue ? updateItemCount(name, currentvalue) : updateItemCount(name, "0");
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: "10px" }}>
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
