import React from "react";
import { Table } from "react-bootstrap";

export default function DetailTable({ menu }) {
  return (
    <Table bordered style={{ tableLayout: "fixed", width: "auto" }}>
      <thead>
        <tr>
          <th>열량 {menu.INFO_ENG} Kcal</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>탄수화물 {menu.INFO_CAR} g</td>
        </tr>
        <tr>
          <td>단백질 {menu.INFO_PRO} g</td>
        </tr>
        <tr>
          <td>지방 {menu.INFO_FAT} g</td>
        </tr>
        <tr>
          <td>나트륨 {menu.INFO_NA} mg</td>
        </tr>
      </tbody>
    </Table>
  );
}
