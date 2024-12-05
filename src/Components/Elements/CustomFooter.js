import React from "react";
import { Col, Stack } from "react-bootstrap";
import { Link } from "react-router";

export default function CustomFooter() {
  return (
    <>
      <footer
        className="mt-auto p-3 pt-4"
        style={{ backgroundColor: "#eeeeee" }}
      >
        <Stack className="text-center">
          <Col>
            <Link to={"/"} style={{ color: "#000", textDecoration: "none" }}>
              <h5>TO DISH</h5>
            </Link>
          </Col>
          <hr></hr>
          <Col>
            <Link to={"/"} style={{ color: "#000", textDecoration: "none" }}>
              home
            </Link>
          </Col>
          <Col>
            <Link
              to={"/mypage"}
              style={{ color: "#000", textDecoration: "none" }}
            >
              mypage
            </Link>
          </Col>
        </Stack>
      </footer>
    </>
  );
}
