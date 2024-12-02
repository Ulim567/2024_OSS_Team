import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMenuContext } from "../Context/MenuContext";
import axios from "axios";
import "../CSS/CreatePage.css"; // CSS 파일 경로 수정

const CreatePage = () => {
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

  const { menu } = useMenuContext();

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
  }, [menu]);

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
            customShoppingList: customShoppingList.split("/n"), // 장 볼 리스트
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

  // 재료 리스트 표시 형식
  const formatShoppingList = (item) => {
    const parts = item.split(" "); // 공백 기준으로 분리
    return (
      <li key={item}>
        {parts.map((part, index) => (
          <span key={index}>{part} </span> // 각 부분 출력
        ))}
      </li>
    );
  };

  return (
    <div className="create-page-container">
      <h2 className="create-page-title">
        {mode === "new" ? "새 플래너 만들기" : "플래너에 요리 추가하기"}
      </h2>

      <div className="create-page-button-container">
        <button className="create-page-button" onClick={() => setMode("new")}>
          새 플래너 만들기
        </button>
        <button className="create-page-button" onClick={() => setMode("add")}>
          플래너에 요리 추가하기
        </button>
      </div>

      {mode === "new" && (
        <>
          <div>
            <label className="create-page-label">제목:</label>
            <input
              className="create-page-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 친구들과의 식사"
            />
          </div>
          <div>
            <label className="create-page-label">날짜:</label>
            <input
              className="create-page-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </>
      )}

      {mode === "add" && (
        <div>
          <label className="create-page-label">플래너 선택:</label>
          <select
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
          </select>
        </div>
      )}

      <div>
        <label className="create-page-label">정한 메뉴:</label>
        <input
          className="create-page-input"
          type="text"
          value={selectedMenu}
          readOnly
        />
      </div>

      {/* 재료 정보 리스트로 표시 */}
      <div>
        <label className="create-page-label">재료 정보:</label>
        <ul className="create-page-list">
          {shoppingList &&
            shoppingList
              .split(",")
              .map((item, index) => formatShoppingList(item))}
        </ul>
      </div>

      {/* 장 볼 리스트 입력란 추가 */}
      <div>
        <label className="create-page-label">장 볼 리스트:</label>
        <input
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
      </div>

      {/* 장 볼 리스트도 리스트 형태로 표시 */}
      <div>
        <label className="create-page-label">장 볼 리스트 (입력한 것):</label>
        <ul className="create-page-list">
          {customShoppingList &&
            customShoppingList
              .split("\n")
              .filter((item) => item.trim()) // 빈 줄 제거
              .map((item, index) => (
                <li key={index} className="shopping-list-item">
                  {item}
                  <button
                    className="delete-button"
                    onClick={() => {
                      // 해당 항목 삭제
                      setCustomShoppingList((prev) =>
                        prev
                          .split("\n")
                          .filter((_, i) => i !== index) // index에 해당하는 항목 제외
                          .join("\n")
                      );
                    }}
                  >
                    삭제
                  </button>
                </li>
              ))}
        </ul>
      </div>

      <div>
        <label className="create-page-label">인분 수:</label>
        <input
          className="create-page-input"
          type="number"
          value={servings}
          min="1"
          onChange={(e) => setServings(e.target.value)}
        />
      </div>
      <div>
        <label className="create-page-label">예산:</label>
        <input
          className="create-page-input"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="숫자만 입력"
        />
      </div>
      <div>
        <label className="create-page-label">메모:</label>
        <textarea
          className="create-page-textarea"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
      </div>
      <button className="create-page-submit-button" onClick={handleSubmit}>
        저장하기
      </button>
    </div>
  );
};

export default CreatePage;
