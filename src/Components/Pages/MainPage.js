import React from "react";
import MenuList from "../Elements/Main/MenuList";
import CustomNavBar from "../Elements/CustomNavBar";
import SearchBar from "../Elements/Main/SearchBar";

export default function MainPage() {
  const styles = {
    container: {
      maxWidth: "1200px", // 최대 너비 (1200px 고정)
      minWidth: "600px",
      width: "100%", // 기본적으로 100% 너비 사용
      margin: "0 auto", // 가로 중앙 정렬
    },

    stickySearch: {
      position: "fixed", // 화면 상단에 고정
      top: "60px", // Navbar의 높이를 고려한 간격
      left: "50%", // 화면의 가운데로 배치
      transform: "translateX(-50%)", // 정확히 가운데 정렬
      maxWidth: "500px", // 최대 너비 설정
      width: "100%", // 부모 요소 너비에 맞게 설정
      zIndex: "1050", // Navbar보다 위에 위치하도록 z-index 설정
    },
  };

  return (
    <>
      <CustomNavBar></CustomNavBar>

      <div style={styles.container}>
        <SearchBar></SearchBar>
        <MenuList></MenuList>
      </div>
    </>
  );
}
