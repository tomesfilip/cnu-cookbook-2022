import React, { FC, useEffect, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import useFetchIngredientList from '../hooks/useFetchIngredientList';
import IIngredient from '../models/IIngredient';
import { normalizeText } from '../utils/normalizeText';
import Input from './atoms/Input';
import OutlineSmButton from './atoms/OutlineSmButton';
import Autocomplete from './Autocomplete';

interface Props {
  ingredients: IIngredient[];
  setIngredients: React.Dispatch<React.SetStateAction<IIngredient[]>>;
}

const IngredientInputForm: FC<Props> = ({ ingredients, setIngredients }) => {
  const [ingredientName, setIngredientName] = useState<string>('');
  const [ingredientAmount, setIngredientAmount] = useState<string>('');
  const [ingredientAmountUnit, setIngredientAmountUnit] = useState<string>('');
  const [canSaveIngredient, setCanSaveIngredient] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const { data: availableIngredients } = useFetchIngredientList();

  useEffect(() => {
    setCanSaveIngredient(
      [ingredientName, ingredientAmount, ingredientAmountUnit].every(
        (argument) => argument.length > 0,
      ),
    );
  }, [ingredientName, ingredientAmount, ingredientAmountUnit]);

  const handleSaveIngredient = () => {
    ingredients?.push({
      amount: Number(ingredientAmount),
      amountUnit: ingredientAmountUnit,
      isGroup: false,
      name: ingredientName,
      timestamp: Date.now(),
    });

    setIngredientName('');
    setIngredientAmount('');
    setIngredientAmountUnit('');
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
    ? availableIngredients.filter((ingredient) =>
        normalizeText(ingredient).includes(normalizeText(ingredientName)),
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
            onChange={({ target }) => setIngredientName(target.value)}
            value={ingredientName}
            onFocus={() => setShowSuggestions(true)}
          />
          {showSuggestions && ingredientName && (
            <Autocomplete
              suggestionList={ingredientSuggestions}
              noSuggestionText="Neznámá ingredience"
              setIngredientName={setIngredientName}
              setShowSuggestions={setShowSuggestions}
            />
          )}
        </div>
        <Input
          type="number"
          name="ingredientAmount"
          placeholder="množství"
          onChange={({ target }) => setIngredientAmount(target.value)}
          value={ingredientAmount}
        />
        <Input
          type="text"
          name="ingredientUnit"
          placeholder="jednotka"
          onChange={({ target }) => setIngredientAmountUnit(target.value)}
          value={ingredientAmountUnit}
        />
        <OutlineSmButton
          disabled={!canSaveIngredient}
          onClick={handleSaveIngredient}
        >
          Přidat
        </OutlineSmButton>
      </div>
      <div className="added-ingredients px-4 my-6">
        <ul>
          {ingredients?.map(({ _id, name, amount, amountUnit, timestamp }) => (
            <div
              key={timestamp ? timestamp : _id}
              className="ingredient flex items-center justify-between w-4/5 md:w-3/5 mb-2"
            >
              <p>
                {name}: {amount} {amountUnit}
              </p>
              <OutlineSmButton
                onClick={() => handleRemoveIngredient(timestamp, _id)}
              >
                <MdDeleteOutline size="1.5em" />
              </OutlineSmButton>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IngredientInputForm;
