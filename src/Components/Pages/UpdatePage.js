// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/UpdatePage.css"; // CSS 파일 임포트

// const UpdatePage = () => {
//   const { id } = useParams(); // URL에서 플래너 ID 가져오기
//   const navigate = useNavigate();

//   const [planner, setPlanner] = useState(null); // 플래너 데이터
//   const [loading, setLoading] = useState(true); // 로딩 상태
//   const [updatedData, setUpdatedData] = useState({}); // 수정된 데이터 저장

//   // 플래너 데이터 불러오기
//   useEffect(() => {
//     const fetchPlanner = async () => {
//       try {
//         const response = await axios.get(
//           `https://672e398e229a881691ef646a.mockapi.io/Mymenu/${id}`
//         );
//         setPlanner(response.data);
//         setUpdatedData({
//           customShoppingList: response.data.recipes[0].customShoppingList || [],
//           servings: response.data.recipes[0].servings || "",
//           budget: response.data.recipes[0].budget || "",
//           memo: response.data.recipes[0].memo || "",
//         });
//         setLoading(false);
//       } catch (error) {
//         console.error("데이터를 가져오는 중 오류 발생:", error);
//         alert("플래너 정보를 불러올 수 없습니다.");
//         navigate("/mypage"); // 오류 발생 시 마이페이지로 이동
//       }
//     };

//     fetchPlanner();
//   }, [id, navigate]);

//   // 데이터 로딩 중일 때
//   if (loading) {
//     return <p>데이터를 불러오는 중입니다...</p>;
//   }

//   // 입력값 변경 핸들러
//   const handleChange = (field, value) => {
//     setUpdatedData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   // 플래너 수정 핸들러
//   const handleUpdate = async () => {
//     try {
//       const updatedRecipes = planner.recipes.map((recipe, index) => {
//         if (index === 0) {
//           return {
//             ...recipe,
//             customShoppingList: updatedData.customShoppingList,
//             servings: updatedData.servings,
//             budget: updatedData.budget,
//             memo: updatedData.memo,
//           };
//         }
//         return recipe;
//       });

//       const updatedPlanner = { ...planner, recipes: updatedRecipes };
//       await axios.put(
//         `https://672e398e229a881691ef646a.mockapi.io/Mymenu/${id}`,
//         updatedPlanner
//       );
//       alert("플래너가 성공적으로 수정되었습니다.");
//       navigate(`/detailpage/${id}`); // 수정 완료 후 상세 페이지로 이동
//     } catch (error) {
//       console.error("플래너 수정 중 오류 발생:", error);
//       alert("플래너를 수정하는 중 오류가 발생했습니다.");
//     }
//   };

//   return (
//     <div className="update-container">
//       <h2>플래너 수정</h2>

//       {/* 제목과 날짜는 수정 불가능 */}
//       <div className="form-group">
//         <label>제목</label>
//         <input type="text" value={planner.title} disabled />
//       </div>
//       <div className="form-group">
//         <label>날짜</label>
//         <input type="date" value={planner.date} disabled />
//       </div>

//       {/* 수정 가능한 항목 */}
//       <div className="form-group">
//         <label>장 볼 리스트</label>
//         <textarea
//           value={updatedData.customShoppingList.join("\n")}
//           onChange={(e) =>
//             handleChange("customShoppingList", e.target.value.split("\n"))
//           }
//         />
//       </div>
//       <div className="form-group">
//         <label>인분</label>
//         <input
//           type="number"
//           value={updatedData.servings}
//           onChange={(e) => handleChange("servings", e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label>예산</label>
//         <input
//           type="number"
//           value={updatedData.budget}
//           onChange={(e) => handleChange("budget", e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label>메모</label>
//         <textarea
//           value={updatedData.memo}
//           onChange={(e) => handleChange("memo", e.target.value)}
//         />
//       </div>

//       {/* 버튼 */}
//       <div className="button-group">
//         <button className="button primary" onClick={handleUpdate}>
//           수정 완료
//         </button>
//         <button
//           className="button secondary"
//           onClick={() => navigate(`/detailpage/${id}`)}
//         >
//           취소
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UpdatePage;
