import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../CSS/Calendar.css";
import CustomNavBar from "../Elements/CustomNavBar";
import moment from "moment";
import axios from "axios";
import "../CSS/MyPage.css"; // CSS 파일 임포트

const MyPage = () => {
  const styles = {
    container: {
      maxWidth: "1200px", // 최대 너비 (1200px 고정)
      width: "100%", // 기본적으로 100% 너비 사용
      margin: "0 auto", // 가로 중앙 정렬
    },
  };

  const [date, setDate] = useState(new Date());
  const [isAll, setIsAll] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // MockAPI에서 데이터 가져오기
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://672e398e229a881691ef646a.mockapi.io/Mymenu"
        );
        console.log("API 응답 데이터:", response.data); // 응답 데이터 확인
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [date, isAll]);

  const changeModeToAll = () => {
    setIsAll(true);
  };

  const changeModeToDate = (date) => {
    setDate(date);
    setIsAll(false);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const recipeDate = new Date(recipe.date);
    const selectedDate = new Date(date);

    return (
      recipeDate.getFullYear() === selectedDate.getFullYear() &&
      recipeDate.getMonth() === selectedDate.getMonth() &&
      recipeDate.getDate() === selectedDate.getDate()
    );
  });

  const addContent = ({ date }) => {
    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    const contents = [];

    const dateString = moment(date).format("YYYY-MM-DD");

    const recipeCount = recipes.filter(
      (recipe) => moment(recipe.date).format("YYYY-MM-DD") === dateString
    ).length;

    if (recipeCount > 0) {
      contents.push(<div key="dot" className="dot" />);
    }

    return <div style={{ textAlign: "center" }}>{contents}</div>;
  };

  // 데이터 로딩 중일 때
  if (loading) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  return (
    <>
      <CustomNavBar></CustomNavBar>
      <div style={styles.container}>
        <h1 className="py-3 m-0 fs-2 fw-bold">나의 요리 플래너</h1>
        <hr
          className="m-0 mb-4 p-0"
          style={{ border: "0", height: "3px", background: "#6e6e6e" }}
        ></hr>

        <Row>
          <Col lg={4} className="p-0">
            <div className="me-4">
              <Calendar
                onChange={changeModeToDate}
                value={date}
                tileContent={addContent}
              />
            </div>
            <Button
              className="mt-3 d-flex justify-content-center"
              variant="outline-primary"
              onClick={changeModeToAll}
            >
              전체 보기
            </Button>
          </Col>
          <Col>
            <ul className="m-0 p-0">
              {isAll ? (
                recipes.length === 0 ? (
                  <h4 className="fs-4 text-center my-3">
                    날짜에 해당하는 플래너가 없습니다.
                  </h4>
                ) : (
                  recipes
                    .slice()
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((recipe, index, array) => (
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
                              <Card.Title className="fw-bold">
                                {recipe.title}
                              </Card.Title>
                              <Card.Text>
                                {recipe.recipes && recipe.recipes.length > 0
                                  ? recipe.recipes
                                      .map((item) => item.selectedMenu)
                                      .join(", ")
                                  : "메뉴 정보가 없습니다"}
                              </Card.Text>
                              <Button
                                className="me-2"
                                variant="primary"
                                onClick={() => navigate(`/detail/${recipe.id}`)}
                              >
                                상세보기
                              </Button>
                              <Button
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
                                        prevRecipes.filter(
                                          (item) => item.id !== recipe.id
                                        )
                                      );
                                      alert("삭제되었습니다.");
                                    } catch (error) {
                                      console.error(
                                        "삭제 중 오류 발생:",
                                        error
                                      );
                                    }
                                  }
                                }}
                              >
                                삭제
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    ))
                )
              ) : filteredRecipes.length === 0 ? (
                <h4 className="fs-4 text-center my-3">
                  날짜에 해당하는 계획이 없습니다.
                </h4>
              ) : (
                filteredRecipes
                  .slice()
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((recipe, index, array) => (
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
                            <Card.Title className="fw-bold">
                              {recipe.title}
                            </Card.Title>
                            <Card.Text>
                              {recipe.recipes && recipe.recipes.length > 0
                                ? recipe.recipes
                                    .map((item) => item.selectedMenu)
                                    .join(", ")
                                : "메뉴 정보가 없습니다"}
                            </Card.Text>
                            <Button
                              className="me-2"
                              variant="primary"
                              onClick={() => navigate(`/detail/${recipe.id}`)}
                            >
                              상세보기
                            </Button>
                            <Button
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
                                      prevRecipes.filter(
                                        (item) => item.id !== recipe.id
                                      )
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
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  ))
              )}
            </ul>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MyPage;
