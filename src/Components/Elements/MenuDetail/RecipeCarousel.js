import Carousel from "react-bootstrap/Carousel";
import CarouselImage from "./CarouselImage";
import { useState, useEffect } from "react";

export default function RecipeCarousel({ menu }) {
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    const getRecipeList = () => {
      const list = [];
      for (let i = 1; i <= 20; i++) {
        const index = i.toString().padStart(2, "0");
        const manualKey = `MANUAL${index}`;
        const manualImgKey = `MANUAL_IMG${index}`;

        // menu[manualKey]가 존재하지 않으면, break
        if (menu[manualKey] == "") {
          break;
        }

        list.push({
          step: menu[manualKey],
          image: menu[manualImgKey] || null,
        });
      }
      setRecipeList(list);
    };
    getRecipeList();
  }, [menu]);

  return (
    <Carousel>
      {recipeList.map((recipe, index) => {
        return (
          <Carousel.Item key={index}>
            <CarouselImage image={recipe.image} />
            <Carousel.Caption>
              <h5>{recipe.step}</h5>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
