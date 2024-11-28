import React from "react";
import { useLocation } from "react-router-dom";
import CustomNavBar from "../Elements/CustomNavBar";
import { Row, Col } from "react-bootstrap";
import DetailTable from "../Elements/DetailTable";
import "../CSS/DetailImage.css";

export default function MenuDetailPage() {
  const styles = {
    container: {
      height: "100%",
      width: "85%", // 기본적으로 100% 너비 사용
      margin: "0 auto", // 가로 중앙 정렬
    },
    shadowBox: {
      boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.15)",
    },
    square: {
      width: "100%", // 부모의 너비를 100%로 설정
      aspectRatio: "1 / 1.5", // 정사각형 비율 유지
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

  const location = useLocation();
  const menu = location.state;

  if (menu == null) {
    return <h1>오류가 발생했습니다. 이전 페이지로 돌아가주세요.</h1>;
  }

  console.log(menu.RCP_PARTS_DTLS);

  const ingredient = menu.RCP_PARTS_DTLS.split(",").map((item) => item.trim());

  const hashTag = menu.HASH_TAG != "" ? "# " + menu.HASH_TAG : "";

  return (
    <div>
      <CustomNavBar></CustomNavBar>
      <div style={styles.container}>
        <h1 className="py-3 m-0 fs-2 fw-bold">레시피 상세</h1>
        <hr
          className="m-0 mb-4 p-0"
          style={{ border: "0", height: "3px", background: "#6e6e6e" }}
        ></hr>
        <div className="p-4 mb-4" style={styles.shadowBox}>
          <h4 className="fw-bold">{menu.RCP_NM}</h4>
          <p style={{ fontSize: "14px" }}>
            {menu.RCP_WAY2} / {menu.RCP_PAT2}
          </p>
          <hr></hr>
          <Row>
            <Col md={4}>
              <div className="menu_img_detail">
                <img src={menu.ATT_FILE_NO_MK} className="detail_image" />
              </div>
              <h4
                className="fw-bold fs-6 px-2 mb-3"
                style={{ color: "#6e6e6e" }}
              >
                {hashTag}
              </h4>
            </Col>
            <Col md={8}>
              <div className="mb-5">
                <h4 className="fw-semibold fs-5">재료 및 분량</h4>
                {ingredient.map((item, index) => {
                  return <h4 key={index}>{item}</h4>;
                })}
              </div>
              <div className="mb-3">
                <h4 className="fw-semibold fs-5">성분표</h4>
                <DetailTable menu={menu}></DetailTable>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
