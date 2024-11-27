import React from "react";
import { useState, useRef } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";

export default function Test() {
  var KEY = "06b2240508d148a6b6c6";
  var [menus, setMenus] = useState([]);

  useRef(() => {
    setMenus([]);
  }, [menus]);

  const getData = async (keyword) => {
    try {
      keyword = keyword.trim();
      console.log(keyword);
      console.log(
        `http://openapi.foodsafetykorea.go.kr/api/${KEY}/COOKRCP01/json/1/1000/RCP_NM="${keyword}"`
      );
      const response1 = await axios.get(
        `http://openapi.foodsafetykorea.go.kr/api/${KEY}/COOKRCP01/json/1/1000/RCP_NM="${keyword}"`
      );
      const firstData = response1.data.COOKRCP01.row;

      // const response2 = await axios.get(
      //   `http://openapi.foodsafetykorea.go.kr/api/${KEY}/COOKRCP01/json/1001/1136/RCP_NM="토마토"`
      // );
      // const firstData2 = response2.data.COOKRCP01.row;

      // const combinedMenus = [...firstData, ...firstData2];

      // 상태 업데이트
      setMenus(firstData);
      console.log(menus);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => getData("토마토")}>
        Test
      </Button>
      <Table striped>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody id="menus">
          {menus &&
            menus.map((menu, index) => {
              return (
                <tr key={index}>
                  <th scope="col">{menu.RCP_SEQ}</th>
                  <th scope="col">{menu.RCP_NM}</th>
                  <th scope="col">{menu.RCP_WAY2}</th>
                  <th scope="col">{menu.RCP_PAT2}</th>
                  <th scope="col">{menu.INFO_WGT}</th>
                  <th scope="col">{menu.INFO_ENG}</th>
                  <th scope="col">
                    <img
                      src={menu.ATT_FILE_NO_MAIN}
                      height="100px"
                      width="100px"
                    ></img>
                  </th>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}
