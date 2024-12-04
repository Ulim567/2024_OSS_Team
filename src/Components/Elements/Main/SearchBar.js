import React from "react";
import { useState, useEffect } from "react";
import { InputGroup, Form, Stack } from "react-bootstrap";
import FilterButtons from "./FilterButtons";
import useMenu from "../../Status/MenuStatus";

export default function SearchBar() {
  const [searchName, setSearchName] = useState("");
  const getMenusByName = useMenu((state) => state.getMenusByName);
  const menus = useMenu((state) => state.filteredMenus);

  const [filter, setFilter] = useState("전체");
  const applyFilter = useMenu((state) => state.applyFilter);

  useEffect(() => {}, [filter, menus]);

  const filterMenus = (filterName) => {
    applyFilter(filterName);
    setFilter(filterName);
    sessionStorage.setItem("filterName", filterName);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchName(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (searchName.trim() !== "") {
      console.log("Search : " + searchName);
      await getMenusByName(searchName);
      applyFilter("전체");
      setFilter("전체");
      sessionStorage.setItem("searchName", searchName);
      console.log(menus);
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit} className="px-5 my-5">
      <InputGroup
        className="mx-auto mb-5"
        style={{
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0px 0px 5px #a6a6a6",
          outline: "none",
          borderColor: "#696969",
          borderWidth: "0px",
          borderRadius: "25px",
        }}
      >
        <Form.Control
          className="p-2 ps-3"
          placeholder="Enter menu name"
          aria-label="Menuname"
          aria-describedby="basic-addon1"
          onChange={handleChange}
          value={searchName}
          required
          style={{
            border: "none",
            boxShadow: "none",
            outline: "none",
            borderTopLeftRadius: "25px",
            borderBottomLeftRadius: "25px",
          }}
        ></Form.Control>
        <InputGroup.Text
          style={{
            borderTopRightRadius: "25px",
            borderBottomRightRadius: "25px",
            backgroundColor: "#fff",
            border: "none",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/2319/2319177.png"
            alt="fab"
            width={"30px"}
            height={"30px"}
          ></img>
        </InputGroup.Text>
      </InputGroup>
      <Stack direction="horizontal" gap={3}>
        <FilterButtons filter={filter} filterMenus={filterMenus} />
      </Stack>
      <hr
        className="my-3"
        style={{
          border: "0",
          height: "1.5px",
          backgroundColor: "#754f44",
        }}
      ></hr>
    </Form>
  );
}
