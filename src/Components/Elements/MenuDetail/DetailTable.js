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
    </Table>
  );
}
