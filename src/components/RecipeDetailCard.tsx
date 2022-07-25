import { FC, useState } from 'react';
import { MdDeleteOutline, MdModeEditOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { api } from '../api';
import PlaceHolder from '../assets/img/food-placeholder.png';
import IRecipeDetail from '../models/IRecipeDetail';
import OutlineSmButton from './atoms/OutlineSmButton';
import ConfirmDialog from './ConfirmDialog';
import '../assets/styles/Directions.scss';
import toast from 'react-hot-toast';
import TimeBox from './Timebox';
import { getNormalizedDirections } from '../utils/getNormalizedDirections';

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
      toast.success('Recept úspěšne zmazán.');
      navigate('/');
    } catch (err) {
      toast.error(`Chybička se vloudila: ${err}`);
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
      <TimeBox preparationTime={preparationTime} />
      {ingredients && ingredients.length > 0 && (
        <div className="ingredients bg-slate-100 p-4 mt-6 mb-12 rounded-lg w-4/5">
          <ul className="max-w-sm">
            {ingredients?.map(({ _id, amount, amountUnit, name, isGroup }) =>
              isGroup ? (
                <h2 key={_id} className="font-bold text-lg mt-2">
                  {name}
                </h2>
              ) : (
                <li key={_id} className="grid grid-cols-12">
                  <span className="col-span-4">
                    {amount} {amountUnit}
                  </span>
                  <span className="col-span-8">{name}</span>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
      {directions && (
        <ReactMarkdown
          className="directions p-4 lg:w-4/5"
          children={getNormalizedDirections(directions)}
        />
      )}
    </div>
  );
};

export default RecipeDetailCard;
