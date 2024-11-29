import Carousel from "react-bootstrap/Carousel";
import CarouselImage from "./CarouselImage";

export default function RecipeCarousel({ recipeList }) {
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
