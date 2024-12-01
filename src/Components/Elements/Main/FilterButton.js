import React from "react";
import { Button } from "react-bootstrap";
import style from "../../CSS/FilterButton.module.css";

export default function FilterButton({ text, isSelected, onClick }) {
  if (isSelected) {
    return (
      <Button
        variant="outline-secondary"
        className={style.filterButtonSelected}
      >
        {text}
      </Button>
    );
  }
  return (
    <Button
      variant="outline-secondary"
      className={style.filterButton}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
