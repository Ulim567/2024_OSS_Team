import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/DetailPage.css";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [planner, setPlanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRecipeIndex, setActiveRecipeIndex] = useState(0);
  const [updatedData, setUpdatedData] = useState([]);

  useEffect(() => {
    const fetchPlanner = async () => {
      try {
        const response = await axios.get(
          `https://672e398e229a881691ef646a.mockapi.io/Mymenu/${id}`
        );
        const recipesData = response.data.recipes.map((recipe) => ({
          customShoppingList: recipe.customShoppingList || [],
          servings: recipe.servings || "",
          budget: recipe.budget || "",
          memo: recipe.memo || "",
        }));

        setPlanner(response.data);
        setUpdatedData(recipesData);
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
        ...updatedData[index],
      }));

      const updatedPlanner = { ...planner, recipes: updatedRecipes };
      await axios.put(
        `https://672e398e229a881691ef646a.mockapi.io/Mymenu/${id}`,
        updatedPlanner
      );

      alert("플래너가 성공적으로 수정되었습니다.");
      setPlanner(updatedPlanner);
      setIsModalOpen(false);
    } catch (error) {
      console.error("플래너 수정 중 오류 발생:", error);
      alert("플래너를 수정하는 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async (recipeIndex) => {
    try {
      const updatedRecipes = planner.recipes.filter((_, index) => index !== recipeIndex);

      if (updatedRecipes.length === 0) {
        await axios.delete(
          `https://672e398e229a881691ef646a.mockapi.io/Mymenu/${id}`
        );
        alert("모든 요리가 삭제되었습니다. 플래너도 삭제됩니다.");
        navigate("/mypage");
      } else {
        const updatedPlanner = { ...planner, recipes: updatedRecipes };
        await axios.put(
          `https://672e398e229a881691ef646a.mockapi.io/Mymenu/${id}`,
          updatedPlanner
        );

        alert("요리가 성공적으로 삭제되었습니다.");
        setPlanner(updatedPlanner);

        // 페이지 새로 고침
        window.location.reload();
      }
    } catch (error) {
      console.error("요리를 삭제하는 중 오류 발생:", error);
      alert("요리를 삭제하는 중 오류가 발생했습니다.");
    }
  };


  if (loading) {
    return <div>상세 정보를 불러오는 중...</div>;
  }

  return (
    <div className="detail-container">
      <div className="header">
        <h1>{planner.title}</h1>
        <span className="date">{planner.date}</span>
      </div>

      {planner.recipes.map((recipe, index) => (
        <div key={index} className="recipe-container">
          <div className="image-and-name">
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
            <div className="recipe-name">
              <h3>{recipe.selectedMenu}</h3>
            </div>
          </div>
          <div className="info-section">
            <div>
              <strong>재료 정보:</strong>
              <div>
                {recipe.shoppingList
                  .map((item) => item.trim())
                  .join(" ")
                  .split("●")
                  .filter((item) => item.trim() !== "")
                  .map((item, idx) => (
                    <div key={idx}>
                      {item}
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <strong>장 볼 리스트:</strong>
              {recipe.customShoppingList && recipe.customShoppingList.length > 0 && recipe.customShoppingList[0] !== "" ? (
                <ul className="shopping-list">
                  {recipe.customShoppingList.map((item, idx) => {
                    const lines = item.split("\n");
                    return (
                      <span key={idx} className="shopping-list-item">
                        {lines.map((line, lineIdx) => (
                          <li key={lineIdx}>{line}<br /></li>
                        ))}
                      </span>
                    );
                  })}
                </ul>
              ) : (
                <p>장 볼 리스트가 비어 있습니다.</p>
              )}
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
            <div className="button-group">
              <button
                onClick={() => {
                  setActiveRecipeIndex(index);
                  setIsModalOpen(true);
                }}
                className="button small"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="button delete"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <div className={`modal ${isModalOpen ? "open" : ""}`}>
          <div className="modal-content">
            <h3>{planner.recipes[activeRecipeIndex]?.selectedMenu} 수정</h3>
            <div>
              <label>장 볼 리스트:</label>
              <input
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    const value = e.target.value.trim();
                    if (value) {
                      handleChange(
                        "customShoppingList",
                        [
                          ...updatedData[activeRecipeIndex]?.customShoppingList,
                          value,
                        ],
                        activeRecipeIndex
                      );
                      e.target.value = "";
                    }
                  }
                }}
                placeholder="장 볼 리스트를 입력 후 Enter를 누르세요."
              />
            </div>
            <div>
              <ul>
                {updatedData[activeRecipeIndex]?.customShoppingList.map((item, idx) => (
                  <li key={idx}>
                    {item}
                    <button
                      className="delete-button"
                      onClick={() =>
                        handleChange(
                          "customShoppingList",
                          updatedData[activeRecipeIndex]?.customShoppingList.filter(
                            (_, i) => i !== idx
                          ),
                          activeRecipeIndex
                        )
                      }
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="form-group">
              <label>인분:</label>
              <input
                type="number"
                value={updatedData[activeRecipeIndex]?.servings}
                onChange={(e) =>
                  handleChange("servings", e.target.value, activeRecipeIndex)
                }
              />
            </div>
            <div className="form-group">
              <label>예산:</label>
              <input
                type="number"
                value={updatedData[activeRecipeIndex]?.budget}
                onChange={(e) =>
                  handleChange("budget", e.target.value, activeRecipeIndex)
                }
              />
            </div>
            <div className="form-group">
              <label>메모:</label>
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
      <div className="button-container">
        <button onClick={() => navigate("/mypage")} className="button">
          마이페이지로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
