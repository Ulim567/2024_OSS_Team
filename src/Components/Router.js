import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import MenuDetailPage from "./Pages/MenuDetailPage";
import DetailPage from "./Pages/DetailPage";
import CreatePage from "./Pages/CreatePage";
import MyPage from "./Pages/MyPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/detailMenu" element={<MenuDetailPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
