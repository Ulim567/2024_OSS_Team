import React from "react";
import { Stack } from "react-bootstrap";
import FilterButton from "./FilterButton";

export default function FilterButtons({ filter, filterMenus }) {
  return (
    <Stack direction="horizontal" gap={3}>
      <FilterButton
        text={"전체"}
        isSelected={filter === "전체"}
        onClick={() => filterMenus("전체")}
      />
      <FilterButton
        text={"밥"}
        isSelected={filter === "밥"}
        onClick={() => filterMenus("밥")}
      />
      <FilterButton
        text={"반찬"}
        isSelected={filter === "반찬"}
        onClick={() => filterMenus("반찬")}
      />
      <FilterButton
        text={"국&찌개"}
        isSelected={filter === "국&찌개"}
        onClick={() => filterMenus("국&찌개")}
      />
      <FilterButton
        text={"후식"}
        isSelected={filter === "후식"}
        onClick={() => filterMenus("후식")}
      />
      <FilterButton
        text={"일품"}
        isSelected={filter === "일품"}
        onClick={() => filterMenus("일품")}
      />
      <FilterButton
        text={"기타"}
        isSelected={filter === "기타"}
        onClick={() => filterMenus("기타")}
      />
    </Stack>
  );
}
