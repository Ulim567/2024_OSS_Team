import React from "react";
import { Button, Card, Row, Image, Col } from "react-bootstrap";

export default function MenuCard() {
  return (
    <Col className="px-4 py-2">
      <Card style={{ padding: "0" }}>
        <Card.Img
          variant="top"
          src="https://img.bizthenaum.co.kr/data/img/1000000869/ori/1000000869_11.jpg"
        />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
