import React from "react";
import { useLocation } from "react-router-dom";
import CustomNavBar from "../Elements/CustomNavBar";
import { Row, Col, Stack } from "react-bootstrap";
import DetailTable from "../Elements/DetailTable";
import "../CSS/DetailImage.css";

export default function MenuDetailPage() {
  const styles = {
    container: {
      height: "100%",
      width: "85%",
      minWidth: "450px",
      maxWidth: "900px",
      margin: "0 auto",
    },
    shadowBox: {
      boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.15)",
    },
    grayContainer: {
      backgroundColor: "#eeeeee",
    },
  };

  const location = useLocation();
  const menu = location.state;

  if (menu == null) {
    return <h1>오류가 발생했습니다. 이전 페이지로 돌아가주세요.</h1>;
  }

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
        <Row className="p-4 mb-4" style={styles.shadowBox}>
          <h4 className="fw-bold">{menu.RCP_NM}</h4>
          <p style={{ fontSize: "14px" }}>
            {menu.RCP_WAY2} / {menu.RCP_PAT2}
          </p>
          <hr></hr>
          <Col md={5}>
            <div className="menu_img_detail">
              <img src={menu.ATT_FILE_NO_MAIN} className="detail_image" />
            </div>
          </Col>
          <Col md={7}>
            <Stack>
              <div className="mb-4">
                <h4 className="fw-semibold fs-5 pb-2">재료 및 분량</h4>
                <div className="p-3" style={styles.grayContainer}>
                  {menu.RCP_PARTS_DTLS}
                </div>
              </div>
              <div>
                <h4 className="fw-semibold fs-5">성분표</h4>
                <DetailTable menu={menu}></DetailTable>
              </div>
              <h4 className="fw-bold fs-6 my-3" style={{ color: "#6e6e6e" }}>
                {hashTag}
              </h4>
            </Stack>
          </Col>
        </Row>
      </div>
    </div>
  );
}
