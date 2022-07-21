import { FC, useState } from 'react';
import { MdDeleteOutline, MdModeEditOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import MarkdownView from 'react-showdown';
import { api } from '../api';
import PlaceHolder from '../assets/img/food-placeholder.png';
import IRecipeDetail from '../models/IRecipeDetail';
import OutlineSmButton from './atoms/OutlineSmButton';
import ConfirmDialog from './ConfirmDialog';
import Timebox from './Timebox';
import '../assets/styles/Directions.scss';

const RecipeDetailCard: FC<IRecipeDetail> = ({
  title,
  preparationTime,
  ingredients,
  directions,
  slug,
  _id,
}) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleDeteleRecipe = async () => {
    setIsDeleting(true);
    try {
      const response = await api.delete(`/recipes/${_id}`);
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
      <img
        className="object-cover rounded-lg h-80 sm:h-96 w-96"
        src={PlaceHolder}
        alt={title}
      />
      <h2 className="my-2 text-2xl font-medium">{title}</h2>
      <div className="action-buttons flex gap-x-4 mb-4">
        <OutlineSmButton onClick={() => navigate(`/recept/${slug}/upravit`)}>
          <MdModeEditOutline size="1.5em" />
        </OutlineSmButton>
        <OutlineSmButton onClick={() => setIsDialogVisible(true)}>
          <MdDeleteOutline size="1.5em" />
        </OutlineSmButton>
      </div>
      <Timebox preparationTime={preparationTime} />
      {ingredients && (
        <ul className="bg-slate-100 p-4 rounded-lg">
          {ingredients?.map(({ _id, amount, amountUnit, name }) => (
            <li key={_id}>
              {amount} {amountUnit} - {name}
            </li>
          ))}
        </ul>
      )}
      {directions && (
        <MarkdownView className="directions p-6" markdown={directions} />
      )}
    </div>
  );
};

export default RecipeDetailCard;
