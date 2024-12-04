import React from "react";
import { Button } from "react-bootstrap";
import style from "../../CSS/FilterButton.module.css";

export default function FilterButton({ text, isSelected, onClick }) {
  if (isSelected) {
    return <Button className={style.filterButtonSelected}>{text}</Button>;
  }
  return (
    <Button className={style.filterButton} onClick={onClick}>
      {text}
    </Button>
  );
}
