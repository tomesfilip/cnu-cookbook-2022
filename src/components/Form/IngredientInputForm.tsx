import React, { FC, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';

import useFetchIngredientList from '../../hooks/useFetchIngredientList';
import IIngredient from '../../models/IIngredient';
import Input from '../atoms/Input';
import OutlineSmButton from '../atoms/OutlineSmButton';
import Autocomplete from './Autocomplete';
import { normalizeText } from '../../utils/normalizeText';

interface Props {
  ingredients: IIngredient[];
  setIngredients: React.Dispatch<React.SetStateAction<IIngredient[]>>;
}

const IngredientInputForm: FC<Props> = ({ ingredients, setIngredients }) => {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [ingredient, setIngredient] = useState<IIngredient | null>(null);
  const [ingredientGroup, setIngredientGroup] = useState<IIngredient | null>(
    null,
  );

  const { data: availableIngredients } = useFetchIngredientList();

  const handleSaveIngredient = () => {
    if (ingredient) {
      ingredients.push({ ...ingredient, timestamp: Date.now() });
      setIngredient(null);
    }
  };

  const handleSaveIngredientGroup = () => {
    if (ingredientGroup) {
      ingredients.push({ ...ingredientGroup, timestamp: Date.now() });
      setIngredientGroup(null);
    }
  };

  const handleRemoveIngredient = (timestamp?: number, id?: string) => {
    if (timestamp) {
      setIngredients(
        ingredients?.filter((ingredient) => ingredient.timestamp !== timestamp),
      );
    }
    if (id) {
      setIngredients(
        ingredients?.filter((ingredient) => ingredient._id !== id),
      );
    }
  };

  const ingredientSuggestions = availableIngredients
    ? availableIngredients.filter((ingredientSuggestion) =>
        normalizeText(ingredientSuggestion).includes(
          normalizeText(ingredient?.name),
        ),
      )
    : [];

  return (
    <div className="form-group ingredients my-4">
      <label className="block mb-1" htmlFor="ingredients">
        Ingredience
      </label>
      <div className="options flex flex-wrap gap-x-8 gap-y-4">
        <div className="autocomplete relative w-48">
          <Input
            type="text"
            name="ingredientName"
            placeholder="název"
            autoComplete="off"
            onChange={({ target }) =>
              setIngredient({ ...ingredient, name: target.value })
            }
            value={ingredient?.name}
            onFocus={() => setShowSuggestions(true)}
          />
          {showSuggestions && ingredient?.name && (
            <Autocomplete
              ingredient={ingredient}
              suggestionList={ingredientSuggestions}
              noSuggestionText="Neznámá ingredience"
              setIngredient={setIngredient}
              setShowSuggestions={setShowSuggestions}
            />
          )}
        </div>
        <Input
          type="number"
          name="ingredientAmount"
          placeholder="množství"
          onChange={({ target }) =>
            setIngredient({ ...ingredient, amount: target.valueAsNumber })
          }
          value={ingredient?.amount}
        />
        <Input
          type="text"
          name="ingredientUnit"
          placeholder="jednotka"
          onChange={({ target }) =>
            setIngredient({
              ...ingredient,
              amountUnit: target.value,
            })
          }
          value={ingredient?.amountUnit}
        />
        <OutlineSmButton
          disabled={!ingredient?.name}
          onClick={handleSaveIngredient}
        >
          Přidat
        </OutlineSmButton>
      </div>
      <div className="ingredients-group mt-8">
        <label className="block mb-1" htmlFor="ingredients-group">
          Skupinová ingredience
        </label>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Input
            type="text"
            name="ingredientNameGroup"
            placeholder="název"
            autoComplete="off"
            onChange={({ target }) =>
              setIngredientGroup({
                ...ingredientGroup,
                name: target.value,
                isGroup: true,
              })
            }
            value={ingredientGroup?.name}
            onFocus={() => setShowSuggestions(true)}
          />
          <OutlineSmButton
            disabled={!ingredientGroup?.name}
            onClick={handleSaveIngredientGroup}
          >
            Přidat
          </OutlineSmButton>
        </div>
      </div>

      {ingredients.length > 0 && (
        <div className="added-ingredients md:px-4 my-6">
          {ingredients?.map(
            ({ _id, name, amount, amountUnit, isGroup, timestamp }) => (
              <div
                key={timestamp ? timestamp : _id}
                className="ingredient flex justify-between mb-2 max-w-md"
              >
                <p>
                  <span className={isGroup ? 'font-bold' : ''}>{name}</span>
                  {amount ? `: ${amount}` : ''} {amountUnit}
                </p>
                <OutlineSmButton
                  cname=" max-w-max col-span-2 h-8"
                  onClick={() => handleRemoveIngredient(timestamp, _id)}
                >
                  <MdDeleteOutline size="1.5em" />
                </OutlineSmButton>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default IngredientInputForm;
