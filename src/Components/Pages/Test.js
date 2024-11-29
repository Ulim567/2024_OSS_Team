import React from "react";
import { useState, useRef } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import useMenu from "../Status/MenuStatus";

export default function Test() {
  // var KEY = "91ed8fce1361ff76af1392dd50ee1688f5a3f5d3232c97de7adfa45c6558abb7";
  // var [menus, setMenus] = useState([]);
  // var [ingredients, setIngr] = useState([]);
  // var [steps, setStep] = useState([]);

  const getMenusByIdx = useMenu((state) => state.getMenusByIndex);
  const menus = useMenu((state) => state.menus);

  const [result, setResult] = useState([]);

  useRef(() => {}, [menus]);

  const processIngredients = () => {
    console.log("Start");
    let temp = [];
    menus.forEach((menu) => {
      if (!menu.RCP_PARTS_DTLS) return;

      // 메뉴 이름 제거 (예: "황태해장국 황태(채), 15g")
      const cleanText = menu.RCP_PARTS_DTLS.replace(
        /^[^\d가-힣]*[가-힣\s]+(?=\s[가-힣\w]+\s[\d.]+[gGmlML모개컵스푼]+)/,
        ""
      );

      // 정규식: "재료, 중량" 패턴 탐지
      const regex = /([가-힣\w\s()]+?)\s+([\d.]+[gGmlML모개컵스푼]+)/g;

      let match;
      while ((match = regex.exec(cleanText)) !== null) {
        temp.push(`${match[1].trim()}, ${match[2].trim()}`);
      }
    });
    setResult(temp);
    console.log("Complete");
  };

  const handleTest = async () => {
    await getMenusByIdx(0, 1136); // 메뉴 데이터를 비동기적으로 가져옵니다.
    processIngredients(); // 데이터를 가져온 후 재료를 처리합니다.
  };

  // useRef(() => {
  //   setMenus([]);
  //   setIngr([]);
  // }, [menus, ingredients]);

  // const getData = async () => {
  //   try {
  //     const response1 = await axios.get(
  //       `/openapi/${KEY}/json/Grid_20150827000000000227_1/1/10`
  //     );

  //     // 537개
  //     const response2 = await axios.get(
  //       `/openapi/${KEY}/json/Grid_20150827000000000226_1/1/537`
  //     );

  //     const response3 = await axios.get(
  //       `/openapi/${KEY}/json/Grid_20150827000000000228_1/1/20`
  //     );

  //     const secondData = response2.data.Grid_20150827000000000226_1.row;
  //     const firstData = response1.data.Grid_20150827000000000227_1.row;
  //     const thirdData = response3.data.Grid_20150827000000000228_1.row;
  //     console.log(thirdData);

  //     // 상태 업데이트
  //     setMenus(secondData);
  //     setIngr(firstData);
  //     // console.log(menus);
  //     setStep(thirdData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <Button variant="primary" onClick={handleTest}>
        Test
      </Button>
      <Table striped>
        <thead>
          <tr>
            <th scope="col"></th>
            {/* <th scope="col">Name</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th> */}
          </tr>
        </thead>
        <tbody id="menus">
          {menus.map((menu, index) => {
            return (
              <tr key={index}>
                <th scope="col">{menu.RCP_PARTS_DTLS}</th>
              </tr>
            );
          })}
          {/* {menus &&
            menus.map((menu, index) => {
              return (
                <tr key={index}>
                  <th scope="col">{menu.ROW_NUM}</th>
                  <th scope="col">{menu.RECIPE_ID}</th>
                  <th scope="col">{menu.RECIPE_NM_KO}</th>
                  <th scope="col">{menu.SUMRY}</th>
                  <th scope="col">url : {menu.DET_URL}</th>
                </tr>
              );
            })}
          {ingredients.map((ingre, index) => {
            return (
              <tr key={index}>
                <th scope="col">{ingre.ROW_NUM}</th>
                <th scope="col">{ingre.RECIPE_ID}</th>
                <th scope="col">{ingre.IRDNT_NM}</th>
                <th scope="col">{ingre.IRDNT_CPCTY}</th>
              </tr>
            );
          })}
          {steps.map((step, index) => {
            return (
              <tr key={index}>
                <th scope="col">{step.ROW_NUM}</th>
                <th scope="col">{step.RECIPE_ID}</th>
                <th scope="col">{step.IRDNT_NM}</th>
                <th scope="col">{step.COOKING_DC}</th>
              </tr>
            );
          })} */}
        </tbody>
      </Table>
    </>
  );
}
