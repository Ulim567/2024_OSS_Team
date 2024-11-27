import React from "react";
import { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import useMenu from "../Status/MenuStatus";

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
    <Form noValidate onSubmit={handleSubmit}>
      <InputGroup
        className="p-3 mx-auto"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <Form.Control
          placeholder="Enter menu name"
          aria-label="Menuname"
          aria-describedby="basic-addon1"
          onChange={handleChange}
          value={searchName}
          required
          style={{
            borderColor: "#7a7a7a",
            borderWidth: "2px",
            borderRight: "0px",
          }}
        />
        <Button
          type="submit"
          variant="outline-secondary"
          style={{ borderWidth: "2px" }}
        >
          @
        </Button>
      </InputGroup>
    </Form>
  );
}
