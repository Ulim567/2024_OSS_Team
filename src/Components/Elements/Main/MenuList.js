import React from "react";
import { Row, Container } from "react-bootstrap";
import useMenu from "../../Status/MenuStatus";
import MenuCard from "./MenuCard";

export default function MenuList() {
  const menus = useMenu((state) => state.filteredMenus);

  return (
    <Container>
      <Row sm={2} md={3} lg={3} xl={4}>
        {menus.map((menu) => {
          return <MenuCard key={menu.RCP_SEQ} menu={menu}></MenuCard>;
        })}
      </Row>
    </Container>
  );
}
