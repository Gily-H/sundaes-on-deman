import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function ScoopOption({ name, imagePath, updateItemCount }) {
  // handler for clicking on input spinner for scoops
  const handleChange = (event) => {
    const itemCount = parseInt(event.target.value);
    // if NaN or negative value prevent update of subtotal
    if (!itemCount || itemCount < 0) {
      updateItemCount(name, "0");
    } else {
      updateItemCount(name, event.target.value);
    }
  };

  /* TODO: adjust spinner value to prevent negative number input*/
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
          <Form.Control type="number" min={0} defaultValue={0} onChange={handleChange} />
        </Col>
      </Form.Group>
    </Col>
  );
}
