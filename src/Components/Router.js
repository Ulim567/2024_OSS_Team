import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import MenuDetailPage from "./Pages/MenuDetailPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/detail" element={<MenuDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
