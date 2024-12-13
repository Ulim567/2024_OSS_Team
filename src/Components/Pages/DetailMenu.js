import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DetailMenu = () => {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get(
          "https://openapi.foodsafetykorea.go.kr/api/1a467dca462c4455aa63/COOKRCP01/json/30/30"
        );
        const data = response.data.COOKRCP01.row[0]; // 첫 번째 요리 데이터 가져오기
        setMenuData(data);
        setLoading(false);
      } catch (error) {
        console.error("OpenAPI 데이터 로드 실패:", error);
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const handleSelectMenu = () => {
    if (menuData) {
      const { RCP_NM, RCP_PARTS_DTLS, ATT_FILE_NO_MAIN } = menuData;

      // CreatePage로 데이터 전달
      navigate("/create", {
        state: {
          selectedMenu: RCP_NM,
          shoppingList: RCP_PARTS_DTLS,
          imageUrl: ATT_FILE_NO_MAIN,
        },
      });
    } else {
      alert("데이터를 불러오지 못했습니다.");
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (!menuData) {
    return <p>데이터를 불러올 수 없습니다.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>DetailMenu</h2>
      <div
        style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}
      >
        <img
          src={menuData.ATT_FILE_NO_MAIN}
          alt="요리 이미지"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <h3>{menuData.RCP_NM}</h3>
        <p>
          <strong>재료:</strong> {menuData.RCP_PARTS_DTLS}
        </p>
        <button onClick={handleSelectMenu}>이 메뉴 선택</button>
      </div>
    </div>
  );
};

export default DetailMenu;
