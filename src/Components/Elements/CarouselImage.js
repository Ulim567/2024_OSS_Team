import React from "react";
import { Stack } from "react-bootstrap";

export default function CarouselImage({ image }) {
  if (image == null || image == "") {
    return (
      <Stack style={{ backgroundColor: "#eeeeee", height: "300px" }}>
        <h4 className="text-center my-auto">No Image</h4>
      </Stack>
    );
  }

  return (
    <div style={{ backgroundColor: "#000", height: "300px", width: "100%" }}>
      <img
        src={image}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.6,
        }}
      ></img>
    </div>
  );
}
