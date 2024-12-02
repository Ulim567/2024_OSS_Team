import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/DetailPage.css";

const DetailPage = () => {
  const { id } = useParams(); // URL에서 플래너 ID 가져오기
  const navigate = useNavigate();

  const [planner, setPlanner] = useState(null); // 플래너 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [activeRecipeIndex, setActiveRecipeIndex] = useState(0); // 현재 수정 중인 요리 인덱스
  const [updatedData, setUpdatedData] = useState({}); // 수정된 데이터 저장

  useEffect(() => {
    const fetchPlanner = async () => {
      try {
        const response = await axios.get(
          `https://672e398e229a881691ef646a.mockapi.io/Mymenu/${id}`
        );
        setPlanner(response.data);
        setUpdatedData(
          response.data.recipes.map((recipe) => ({
            customShoppingList: recipe.customShoppingList || [],
            servings: recipe.servings || "",
            budget: recipe.budget || "",
            memo: recipe.memo || "",
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error("플래너 데이터를 가져오는 중 오류 발생:", error);
        alert("플래너 정보를 불러올 수 없습니다.");
        navigate("/mypage");
      }
    };

    fetchPlanner();
  }, [id, navigate]);

  const handleChange = (field, value, recipeIndex) => {
    setUpdatedData((prev) =>
      prev.map((data, index) =>
        index === recipeIndex ? { ...data, [field]: value } : data
      )
    );
  };

  const handleUpdate = async () => {
    try {
      const updatedRecipes = planner.recipes.map((recipe, index) => ({
        ...recipe,
        customShoppingList: updatedData[index].customShoppingList,
        servings: updatedData[index].servings,
        budget: updatedData[index].budget,
        memo: updatedData[index].memo,
      }));

      const updatedPlanner = { ...planner, recipes: updatedRecipes };
      await axios.put(
        `https://672e398e229a881691ef646a.mockapi.io/Mymenu/${id}`,
        updatedPlanner
      );
      alert("플래너가 성공적으로 수정되었습니다.");
      setPlanner(updatedPlanner); // UI 업데이트
      setIsModalOpen(false); // 모달 닫기
    } catch (error) {
      console.error("플래너 수정 중 오류 발생:", error);
      alert("플래너를 수정하는 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return <div>상세 정보를 불러오는 중...</div>;
  }

  return (
    <div className="detail-container">
      {planner.recipes.map((recipe, index) => (
        <div key={index} className="recipe-container">
          {/* 이미지 섹션 */}
          <div className="image-section">
            {recipe.imageUrl ? (
              <img
                src={recipe.imageUrl}
                alt={`${recipe.selectedMenu} 이미지`}
                className="recipe-image"
              />
            ) : (
              <p>이미지가 없습니다.</p>
            )}
          </div>

          {/* 정보 섹션 */}
          <div className="info-section">
            <h3>{recipe.selectedMenu}</h3>
            <div>
              <strong>재료 정보:</strong>
              <ul>
                {recipe.shoppingList.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>장 볼 리스트:</strong>
              <ul>
                {recipe.customShoppingList?.length > 0 ? (
                  recipe.customShoppingList.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))
                ) : (
                  <li>장 볼 리스트가 없습니다.</li>
                )}
              </ul>
            </div>
            <p>
              <strong>인분 수:</strong> {recipe.servings}인분
            </p>
            <p>
              <strong>예산:</strong> {recipe.budget ? `${recipe.budget}원` : "미입력"}
            </p>
            <p>
              <strong>메모:</strong> {recipe.memo || "메모가 없습니다."}
            </p>
            <button
              onClick={() => {
                setActiveRecipeIndex(index);
                setIsModalOpen(true);
              }}
              className="button small"
            >
              수정하기
            </button>
          </div>
        </div>
      ))}

      {/* 수정 모달 */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{planner.recipes[activeRecipeIndex]?.selectedMenu} 수정</h3>
            <div className="form-group">
              <label>장 볼 리스트</label>
              <textarea
                value={updatedData[activeRecipeIndex]?.customShoppingList.join(
                  "\n"
                )}
                onChange={(e) =>
                  handleChange(
                    "customShoppingList",
                    e.target.value.split("\n"),
                    activeRecipeIndex
                  )
                }
              />
            </div>
            <div className="form-group">
              <label>인분</label>
              <input
                type="number"
                value={updatedData[activeRecipeIndex]?.servings}
                onChange={(e) =>
                  handleChange("servings", e.target.value, activeRecipeIndex)
                }
              />
            </div>
            <div className="form-group">
              <label>예산</label>
              <input
                type="number"
                value={updatedData[activeRecipeIndex]?.budget}
                onChange={(e) =>
                  handleChange("budget", e.target.value, activeRecipeIndex)
                }
              />
            </div>
            <div className="form-group">
              <label>메모</label>
              <textarea
                value={updatedData[activeRecipeIndex]?.memo}
                onChange={(e) =>
                  handleChange("memo", e.target.value, activeRecipeIndex)
                }
              />
            </div>
            <div className="button-group">
              <button className="button primary" onClick={handleUpdate}>
                수정 완료
              </button>
              <button
                className="button secondary"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 마이페이지 버튼 */}
      <div className="button-container">
        <button
          onClick={() => navigate("/mypage")}
          className="button secondary"
        >
          마이페이지로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
