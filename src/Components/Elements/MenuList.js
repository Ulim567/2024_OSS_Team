import React from "react";
import { Row, Image, Container, Col } from "react-bootstrap";

export default function MenuList() {
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
    <Container className="d-flex flex-wrap">
      <Row xs={2} md={3} lg={4}>
        {Array.from({ length: 16 }).map((_, idx) => (
          <Col key={idx} className="p-3">
            <div style={styles.square}>
              <img
                src="https://img.bizthenaum.co.kr/data/img/1000000869/ori/1000000869_11.jpg"
                alt={`img-${idx}`}
                style={styles.image}
              />
            </div>
            <div className="text-center fs-5">메뉴 이름 {idx}</div>
          </Col>
        ))}
        <Col>
          <Image
            src="https://img.bizthenaum.co.kr/data/img/1000000869/ori/1000000869_11.jpg"
            rounded
            width="100%"
            height="100%"
          ></Image>
        </Col>
      </Row>
    </Container>
  );
}
