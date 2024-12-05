import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollPages";
import MainPage from "./Pages/MainPage";
import MenuDetailPage from "./Pages/MenuDetailPage";
import DetailPage from "./Pages/DetailPage";
import CreatePage from "./Pages/CreatePage";
import MyPage from "./Pages/MyPage";
import CustomNavBar from "./Elements/CustomNavBar";
import CustomFooter from "./Elements/CustomFooter";

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CustomNavBar></CustomNavBar>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/detailMenu" element={<MenuDetailPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <div className="p-4"></div>
      <CustomFooter></CustomFooter>
    </BrowserRouter>
  );
}
