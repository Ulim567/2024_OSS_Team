import React from "react";
import { useState } from "react";
import { InputGroup, Form, Row, Button, Col, Stack } from "react-bootstrap";
import useMenu from "../../Status/MenuStatus";

export default function SearchBar() {
  const [searchName, setSearchName] = useState("");
  const getMenusByName = useMenu((state) => state.getMenusByName);
  const menus = useMenu((state) => state.menus);

  const handleChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (searchName.trim() !== "") {
      console.log("Search : " + searchName);
      await getMenusByName(searchName);
      console.log(menus);
      //   window.location.reload();
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
            width={"30px"}
            height={"30px"}
          ></img>
        </InputGroup.Text>
      </InputGroup>
      <Stack direction="horizontal" gap={3}>
        <Button
          variant="outlined-secondary"
          style={{
            borderRadius: "25px",
            width: "60px",
            borderColor: "#8a8a8a",
          }}
        >
          전체
        </Button>
        <Button
          variant="outlined-secondary"
          style={{
            borderRadius: "30px",
            width: "50px",
            borderColor: "#8a8a8a",
            fontSize: "1rem",
          }}
        >
          밥
        </Button>
        <Button
          variant="outlined-secondary"
          style={{
            borderRadius: "30px",
            width: "60px",
            borderColor: "#8a8a8a",
            fontSize: "1rem",
          }}
        >
          반찬
        </Button>
        <Button
          variant="outlined-secondary"
          style={{
            borderRadius: "30px",
            borderColor: "#8a8a8a",
          }}
        >
          국&찌개
        </Button>
        <Button
          variant="outlined-secondary"
          style={{
            borderRadius: "30px",
            width: "60px",
            borderColor: "#8a8a8a",
          }}
        >
          후식
        </Button>
        <Button
          variant="outlined-secondary"
          style={{
            borderRadius: "30px",
            width: "60px",
            borderColor: "#8a8a8a",
          }}
        >
          일품
        </Button>
        <Button
          variant="outlined-secondary"
          style={{
            borderRadius: "30px",
            width: "60px",
            borderColor: "#8a8a8a",
            marginRight: "auto",
          }}
        >
          기타
        </Button>
      </Stack>
      <hr className="my-3"></hr>
    </Form>
  );
}
