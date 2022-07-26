import { FC, useState } from 'react';
import { MdDeleteOutline, MdModeEditOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import IRecipeDetail from '../../models/IRecipeDetail';
import OutlineSmButton from '../atoms/OutlineSmButton';
import Input from '../atoms/Input';
import ConfirmDialog from '../ConfirmDialog';
import toast from 'react-hot-toast';
import TimeBox from './TimeBox';
import { api } from '../../api';
import { getAmount } from '../../utils/getAmount';
import { getNormalizedDirections } from '../../utils/getNormalizedDirections';

import PlaceHolder from '../../assets/img/food-placeholder.png';
import '../../assets/styles/Directions.scss';

const RecipeDetailCard: FC<IRecipeDetail> = ({
  title,
  preparationTime,
  ingredients,
  directions,
  servingCount,
  slug,
  _id,
}) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [servingCountTemp, setServingCountTemp] = useState<number>(
    servingCount ? servingCount : 1,
  );
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
      <div className="flex gap-x-12 items-center py-4">
        <TimeBox preparationTime={preparationTime} />
        <div className="serving-count-box">
          <label htmlFor="servingCount" className="block">
            Počet jídel
          </label>
          <Input
            type="number"
            value={servingCountTemp}
            onChange={({ target }) =>
              setServingCountTemp(Math.floor(target.valueAsNumber))
            }
          />
        </div>
      </div>
      {ingredients && ingredients.length > 0 && (
        <div className="ingredients bg-slate-100 p-4 mt-6 mb-12 rounded-lg md:w-4/5 max-w-sm">
          <ul>
            {ingredients?.map(({ _id, amount, amountUnit, name, isGroup }) => (
              <li key={_id} className={isGroup ? 'mt-2 mb-1' : ''}>
                {amount && (
                  <span className="mr-4">
                    {getAmount(amount, servingCount, servingCountTemp)}{' '}
                    {amountUnit}
                  </span>
                )}
                <span className={isGroup ? 'font-bold' : ''}>{name}</span>
              </li>
            ))}
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
