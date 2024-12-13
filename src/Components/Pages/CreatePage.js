import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Row,
  Form,
  InputGroup,
  Stack,
  Col,
  CloseButton,
} from "react-bootstrap";
import axios from "axios";
import "../CSS/CreatePage.css";

const CreatePage = () => {
  const styles = {
    detail_main_container: {
      height: "100%",
      width: "85%",
      minWidth: "600px",
      maxWidth: "900px",
      margin: "0 auto",
    },
    shadowBox: {
      backgroundColor: "#fff",
      boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.15)",
    },
    grayContainer: {
      backgroundColor: "#f0efeb",
    },
    carousel_container: {
      maxWidth: "500px",
      margin: "0 auto",
    },
  };

  const navigate = useNavigate();

  const [title, setTitle] = useState(""); // 새 플래너 제목
  const [date, setDate] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [shoppingList, setShoppingList] = useState(""); // API로 받은 재료 정보
  const [customShoppingList, setCustomShoppingList] = useState(""); // 사용자가 작성한 장 볼 리스트
  const [imageUrl, setImageUrl] = useState("");
  const [servings, setServings] = useState(1);
  const [budget, setBudget] = useState("");
  const [memo, setMemo] = useState("");
  const [mode, setMode] = useState("new"); // "new" 또는 "add" 모드
  const [plannerList, setPlannerList] = useState([]); // 기존 플래너 목록
  const [selectedPlanner, setSelectedPlanner] = useState(""); // 요리를 추가할 플래너 선택

  const menu = JSON.parse(sessionStorage.getItem("targetMenu"));

  useEffect(() => {
    // DetailPage에서 전달된 데이터 설정
    if (menu) {
      // const menu = location.state;
      setSelectedMenu(menu.RCP_NM || "");
      setShoppingList(menu.RCP_PARTS_DTLS || "");
      setImageUrl(menu.ATT_FILE_NO_MK || "");
    }

    // MockAPI에서 기존 플래너 목록 가져오기
    const fetchPlanners = async () => {
      try {
        const response = await axios.get(
          "https://672e398e229a881691ef646a.mockapi.io/Mymenu"
        );
        setPlannerList(response.data);
      } catch (error) {
        console.error("플래너 목록 불러오기 오류:", error);
      }
    };

    fetchPlanners();
  }, []);

  const handleSubmit = async () => {
    if (mode === "new") {
      // 새 플래너 생성
      if (!title || !date || !selectedMenu) {
        alert("필수 항목을 입력해주세요.");
        return;
      }

      const newPlan = {
        title,
        date,
        recipes: [
          {
            selectedMenu,
            shoppingList: shoppingList.split(","),
            customShoppingList: customShoppingList.split("\n"), // 장 볼 리스트
            imageUrl,
            servings,
            budget,
            memo,
          },
        ],
      };

      try {
        await axios.post(
          "https://672e398e229a881691ef646a.mockapi.io/Mymenu",
          newPlan
        );
        alert("새 플래너가 저장되었습니다!");
        navigate("/mypage");
      } catch (error) {
        console.error("저장 중 오류 발생:", error);
        alert("저장에 실패했습니다.");
      }
    } else if (mode === "add") {
      // 기존 플래너에 요리 추가
      if (!selectedPlanner) {
        alert("플래너를 선택해주세요.");
        return;
      }

      const newRecipe = {
        selectedMenu,
        shoppingList: shoppingList.split("\n"),
        customShoppingList: customShoppingList.split("\n"), // 장 볼 리스트
        imageUrl,
        servings,
        budget,
        memo,
      };

      try {
        const plannerToUpdate = plannerList.find(
          (planner) => planner.id === selectedPlanner
        );
        const updatedRecipes = [...plannerToUpdate.recipes, newRecipe];

        await axios.put(
          `https://672e398e229a881691ef646a.mockapi.io/Mymenu/${selectedPlanner}`,
          {
            ...plannerToUpdate,
            recipes: updatedRecipes,
          }
        );

        alert("요리가 추가되었습니다!");
        navigate("/mypage");
      } catch (error) {
        console.error("요리 추가 중 오류 발생:", error);
        alert("요리 추가에 실패했습니다.");
      }
    }
  };

  return (
    <div>
      <div style={styles.detail_main_container}>
        <h1 className="py-3 m-0 mt-3 fs-2 fw-bold">
          {mode === "new" ? "새 플래너 만들기" : "플래너에 요리 추가하기"}
        </h1>
        <hr
          className="m-0 mb-4 p-0"
          style={{ border: "0", height: "3px", background: "#6e6e6e" }}
        ></hr>

        <Row className="p-4 mb-4" style={styles.shadowBox}>
          <div className="create-page-button-container">
            {mode === "add" && (
              <Button
                className="me-3"
                variant="outline-success"
                onClick={() => setMode("new")}
              >
                새 플래너 만들기
              </Button>
            )}

            {mode === "new" && (
              <Button variant="outline-success" onClick={() => setMode("add")}>
                플래너에 요리 추가하기
              </Button>
            )}
          </div>

          {mode === "new" && (
            <Row>
              <Col>
                <Form.Label className="m-0" htmlFor="title">
                  제목:
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    id="title"
                    className="create-page-input"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="예: 친구들과의 식사"
                  />
                </InputGroup>
              </Col>
              <Col xs={3}>
                <Form.Label className="m-0" htmlFor="date">
                  날짜:
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    id="date"
                    className="create-page-input"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </InputGroup>
              </Col>
            </Row>
          )}

          {mode === "add" && (
            <>
              <Form.Label className="m-0" htmlFor="planner">
                플래너 선택:
              </Form.Label>
              <InputGroup className="mb-3">
                <Form.Select
                  id="planner"
                  className="create-page-select"
                  value={selectedPlanner}
                  onChange={(e) => setSelectedPlanner(e.target.value)}
                >
                  <option value="">플래너를 선택하세요</option>
                  {plannerList.map((planner) => (
                    <option key={planner.id} value={planner.id}>
                      {planner.title}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
            </>
          )}

          <Form.Label className="m-0" htmlFor="menu">
            정한 메뉴:
          </Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              id="text"
              className="create-page-input"
              type="text"
              value={selectedMenu}
              readOnly
            />
          </InputGroup>

          {/* 재료 정보 리스트로 표시 */}
          <Form.Label>재료 정보:</Form.Label>
          <div
            style={{
              padding: "0 12",
              margin: "0 0 16",
            }}
          >
            <div className="p-3 mb-4" style={styles.grayContainer}>
              {shoppingList}
            </div>
          </div>

          {/* 장 볼 리스트 입력란 추가 */}
          <Form.Label className="m-0" htmlFor="recipeList">
            장 볼 리스트:
          </Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              id="recipeList"
              className="create-page-input"
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                  e.preventDefault(); // 기본 Enter 동작 방지
                  const value = e.target.value.trim();
                  if (value) {
                    setCustomShoppingList((prev) =>
                      prev ? `${prev}\n${value}` : value
                    ); // 리스트에 추가
                  }
                  e.target.value = ""; // 입력창 초기화
                }
              }}
              placeholder="장 볼 리스트를 입력 후 Enter를 눌러 추가하세요."
            />
          </InputGroup>

          {/* 장 볼 리스트도 리스트 형태로 표시 */}
          <div
            style={{
              padding: "0 12",
              margin: "0 0 16",
            }}
          >
            <div className="p-3 mb-4" style={styles.grayContainer}>
              <ul className="m-0">
                {(!customShoppingList ||
                  customShoppingList.split("\n").filter((item) => item.trim())
                    .length === 0) && <li>장 볼 리스트가 없습니다</li>}

                {customShoppingList &&
                  customShoppingList
                    .split("\n")
                    .filter((item) => item.trim()) // 빈 줄 제거
                    .map((item, index) => (
                      <li key={index} className="m-0 p-0 py-1">
                        <Stack direction="horizontal">
                          <div>{item}</div>
                          <div className="ms-auto">
                            <CloseButton
                              className="p-1 m-0"
                              onClick={() => {
                                // 해당 항목 삭제
                                setCustomShoppingList((prev) =>
                                  prev
                                    .split("\n")
                                    .filter((_, i) => i !== index) // index에 해당하는 항목 제외
                                    .join("\n")
                                );
                              }}
                            ></CloseButton>
                          </div>
                        </Stack>
                      </li>
                    ))}
              </ul>
            </div>
          </div>

          <Row>
            <Col>
              <Form.Label className="m-0" htmlFor="count">
                인분 수:
              </Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  id="count"
                  className="create-page-input"
                  type="number"
                  value={servings}
                  min="1"
                  onChange={(e) => setServings(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col>
              <Form.Label className="m-0" htmlFor="price">
                예산:
              </Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  id="price"
                  className="create-page-input"
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="숫자만 입력"
                />
              </InputGroup>
            </Col>
          </Row>

          <Form.Label className="m-0" htmlFor="memo">
            메모:
          </Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              id="memo"
              className="create-page-textarea"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </InputGroup>

          <Button
            className="w-100 py-2"
            variant="success"
            onClick={handleSubmit}
            style={{ backgroundColor: "#769a73" }}
          >
            저장하기
          </Button>
        </Row>
      </div>
    </div>
  );
};

export default CreatePage;
