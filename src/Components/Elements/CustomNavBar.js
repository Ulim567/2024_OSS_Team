import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router";

export default function CustomNavBar() {
  return (
    <Navbar
      // bg="light"
      data-bs-theme="light"
      sticky="top"
      style={{ backgroundColor: "#fbc4ab" }}
    >
      <Container style={{ height: "70px" }}>
        <Navbar.Brand
          className="fw-bold"
          as={Link}
          to={"/"}
          onClick={() => {
            window.location.replace("/");
          }}
        >
          Menu
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            className="fw-semibold"
            as={Link}
            to={"/"}
            onClick={() => {
              window.location.replace("/");
            }}
          >
            {" "}
            Home
          </Nav.Link>
          <Nav.Link as={Link} to={"/mypage"} className="fw-semibold">
            MyPage
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
