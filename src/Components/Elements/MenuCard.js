import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MenuCard({ menu }) {
  const styles = {
    square: {
      width: "100%", // 부모의 너비를 100%로 설정
      aspectRatio: "1 / 1", // 정사각형 비율 유지
      position: "relative", // 정사각형 비율을 고정
      overflow: "hidden", // 이미지가 벗어나지 않도록 처리
      borderRadius: "5px",
    },
    image: {
      width: "100%", // 정사각형에 맞추기
      height: "100%", // 정사각형에 맞추기
      objectFit: "cover", // 이미지 비율을 유지하면서 정사각형에 꽉 채우기
      display: "block",
    },
  };

  return (
    <Col className="p-3">
      <Link
        to="/detail"
        state={menu}
        style={{ textDecoration: "none", color: "#000000" }}
      >
        <div style={styles.square}>
          <img
            src={menu.ATT_FILE_NO_MAIN}
            alt={menu.RCP_SEQ}
            style={styles.image}
          />
        </div>
        <div className="text-center fs-5">{menu.RCP_NM}</div>
      </Link>
    </Col>
  );
}
