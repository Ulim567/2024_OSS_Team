import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router";

export default function CustomNavBar() {
  return (
    <Navbar bg="light" data-bs-theme="light" sticky="top">
      <Container style={{ height: "50px" }}>
        <Navbar.Brand
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
            as={Link}
            to={"/"}
            onClick={() => {
              window.location.replace("/");
            }}
          >
            {" "}
            Home
          </Nav.Link>
          <Nav.Link as={Link} to={"/mypage"}>
            MyPage
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
