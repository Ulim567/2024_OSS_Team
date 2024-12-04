import React from "react";
import { Row, Col, Card, Stack, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function MyPageCard({ recipe, index, array, setRecipes }) {
  const navigate = useNavigate();
  return (
    <Row key={recipe.id}>
      <div>
        {(index === 0 ||
          new Date(array[index - 1].date).toDateString() !==
            new Date(recipe.date).toDateString()) && (
          <div className="fs-4 px-3 my-2">{recipe.date}</div>
        )}
      </div>
      <Col>
        <Card className="mb-2">
          <Card.Body>
            <Card.Title className="fw-bold">{recipe.title}</Card.Title>
            <Card.Text>
              {recipe.recipes && recipe.recipes.length > 0
                ? recipe.recipes.map((item) => item.selectedMenu).join(", ")
                : "메뉴 정보가 없습니다"}
            </Card.Text>
            <Stack direction="horizontal">
              <Button
                className="me-2 ms-auto"
                variant="outline-success"
                onClick={() => navigate(`/detail/${recipe.id}`)}
              >
                상세보기
              </Button>
              <Button
                variant="outline-success"
                onClick={async () => {
                  const confirmDelete = window.confirm(
                    `정말로 "${recipe.title}" 항목을 삭제하시겠습니까?`
                  );
                  if (confirmDelete) {
                    try {
                      await axios.delete(
                        `https://672e398e229a881691ef646a.mockapi.io/Mymenu/${recipe.id}`
                      );
                      setRecipes((prevRecipes) =>
                        prevRecipes.filter((item) => item.id !== recipe.id)
                      );
                      alert("삭제되었습니다.");
                    } catch (error) {
                      console.error("삭제 중 오류 발생:", error);
                    }
                  }
                }}
              >
                삭제
              </Button>
            </Stack>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
