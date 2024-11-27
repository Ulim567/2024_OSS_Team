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

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://openapi.foodsafetykorea.go.kr/api/${KEY}/COOKRCP01/json/1/1001/RCP_NM="김치찌개"`
      );
      setMenus(response.data.COOKRCP01.row);
      console.log(menus);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={getData}>
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
