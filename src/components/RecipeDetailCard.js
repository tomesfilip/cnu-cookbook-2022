import { List, Row } from 'reactstrap';
import PlaceHolder from '../images/food-placeholder.png';

const RecipeDetailCard = ({
  title,
  preparationTime,
  ingredients,
  directions,
}) => {
  const parsedDirections = directions
    ? directions
        .split(/([0-9])\.+ /g)
        .filter((direction) => direction.length > 1)
    : [];

  return (
    <div className="recipe-detail">
      <img src={PlaceHolder} alt={title} />
      <h2 className="my-2">{title}</h2>
      <Row>
        <h5>{preparationTime} min</h5>
      </Row>
      <Row>
        <List className="bg-light p-4 rounded-3" type="unstyled">
          {ingredients.map(({ _id, amount, amountUnit, name }) => (
            <li key={_id}>
              {amount} {amountUnit} - {name}
            </li>
          ))}
        </List>
      </Row>
      <Row>
        <ol className="p-4">
          {parsedDirections.map((direction) => (
            <li className="mb-3" key={direction}>
              {direction}
            </li>
          ))}
        </ol>
      </Row>
    </div>
  );
};

export default RecipeDetailCard;
