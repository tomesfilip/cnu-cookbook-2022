import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import PlaceHolder from '../images/food-placeholder.png';
import OutlineSmButton from './atoms/OutlineSmButton';
import ConfirmDialog from './ConfirmDialog';
import Timebox from './Timebox';

const RecipeDetailCard = ({
  title,
  preparationTime,
  ingredients,
  directions,
  slug,
  _id,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
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
      {isDialogVisible && (
        <ConfirmDialog
          confirmAction={handleDeteleRecipe}
          cancelAction={() => setIsDialogVisible(false)}
          dialogText={`Opravdu chceš zmazat recept ${title}`}
        />
      )}
      <img src={PlaceHolder} alt={title} />
      <h2 className="my-2 text-2xl font-medium">{title}</h2>
      <div className="action-buttons flex gap-x-4 mb-4">
        <OutlineSmButton
          btnText="Upravit"
          onClick={() => navigate(`/recept/${slug}/upravit`)}
        />
        <OutlineSmButton
          btnText="Zmazat"
          onClick={() => setIsDialogVisible(true)}
        />
      </div>
      <Timebox preparationTime={preparationTime} />
      {ingredients.length > 0 && (
        <ul className="bg-slate-100 p-4 rounded-lg">
          {ingredients.map(({ _id, amount, amountUnit, name }) => (
            <li key={_id}>
              {amount} {amountUnit} - {name}
            </li>
          ))}
        </ul>
      )}
      {parsedDirections.length > 0 && (
        <ol className="p-4">
          {parsedDirections.map((direction) => (
            <li className="mb-3" key={direction}>
              {direction}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default RecipeDetailCard;
