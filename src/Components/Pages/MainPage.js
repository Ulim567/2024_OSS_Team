import React from "react";
import MenuList from "../Elements/Main/MenuList";
import SearchBar from "../Elements/Main/SearchBar";

export default function MainPage() {
  const styles = {
    container: {
      maxWidth: "1200px", // 최대 너비 (1200px 고정)
      minWidth: "600px",
      minHeight: "1000px",
      width: "100%", // 기본적으로 100% 너비 사용
      margin: "0 auto", // 가로 중앙 정렬
    },
  };

  return (
    <>
      <div style={styles.container}>
        <SearchBar></SearchBar>
        <MenuList></MenuList>
      </div>
    </>
  );
}
