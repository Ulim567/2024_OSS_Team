import React from "react";
import { Table } from "react-bootstrap";

export default function DetailTable({ menu }) {
  return (
    <Table bordered>
      <thead>
        <tr>
          <th>열량</th>
          <th>탄수화물</th>
          <th>단백질</th>
          <th>지방</th>
          <th>나트륨</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{menu.INFO_ENG} Kcal</td>
          <td>{menu.INFO_CAR} g</td>
          <td>{menu.INFO_PRO} g</td>
          <td>{menu.INFO_FAT} g</td>
          <td>{menu.INFO_NA} mg</td>
        </tr>
      </tbody>
      {/* <thead>
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
      </tbody> */}
    </Table>
  );
}
