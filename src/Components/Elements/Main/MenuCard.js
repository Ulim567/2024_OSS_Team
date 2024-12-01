import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "../../CSS/MainMenuImage.module.css";

export default function MenuCard({ menu }) {
  return (
    <Col className="p-3" sm={6} md={4} lg={3} xl={3}>
      <Link
        to="/detail"
        state={menu}
        style={{ textDecoration: "none", color: "#000000" }}
      >
        <div className={styles.square}>
          <img
            src={menu.ATT_FILE_NO_MAIN}
            alt={menu.RCP_SEQ}
            className={styles.image}
          />
        </div>
        <h4 className="fs-6 fw-light m-0 mt-3" style={{ color: "#4f4f4f" }}>
          분류 &gt; <span className="fw-bold">{menu.RCP_PAT2}</span>
        </h4>
        <h4 className="fs-5 fw-semibold m-0 mt-2">{menu.RCP_NM}</h4>
      </Link>
    </Col>
  );
}
