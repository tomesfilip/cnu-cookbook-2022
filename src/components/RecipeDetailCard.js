import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Row } from 'reactstrap';
import { api } from '../api';
import PlaceHolder from '../images/food-placeholder.png';
import DeleteRecipeButton from './DeleteRecipeButton';
import EditRecipeButton from './EditRecipeButton';

const RecipeDetailCard = ({
  title,
  preparationTime,
  ingredients,
  directions,
  slug,
  _id,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const parsedDirections = directions
    ? directions
        .split(/([0-9])\.+ /g)
        .filter((direction) => direction.length > 1)
    : [];

  const handleDeteleRecipe = async () => {
    setIsDeleting(true);
    try {
      const response = await api.delete(`/recipes/${_id}`);
      console.log(response);
      setIsDeleting(false);
      navigate('/');
    } catch (err) {
      console.log(err);
      setIsDeleting(false);
    }
  };

  return (
    <div className="recipe-detail">
      <img src={PlaceHolder} alt={title} />
      <h2 className="my-2">{title}</h2>
      <EditRecipeButton
        linkText="Upravit"
        linkTo={`/add-edit-recipe/${slug}`}
      />
      <DeleteRecipeButton handleDeleteRecipe={handleDeteleRecipe} />
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
