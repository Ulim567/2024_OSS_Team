import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/MyPage.css"; // CSS 파일 임포트

const MyPage = () => {
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
  }, []);

  // 데이터 로딩 중일 때
  if (loading) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  return (
    <div className="mypage-container">
      <h2>나의 요리 플래너</h2>
      {recipes.length === 0 ? (
        <p>저장된 요리 플래너가 없습니다.</p>
      ) : (
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="recipe-item">
              <h3>{recipe.title}</h3>
              <p>
                <strong>정한 메뉴:</strong>{" "}
                {recipe.recipes && recipe.recipes.length > 0
                  ? recipe.recipes.map((item) => item.selectedMenu).join(", ") // 여러 메뉴를 쉼표로 구분
                  : "메뉴 정보가 없습니다"}
              </p>
              <button
                onClick={() => navigate(`/detail/${recipe.id}`)}
                className="button primary"
              >
                상세보기
              </button>
              <button
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
                className="button danger"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyPage;
