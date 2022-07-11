import { useEffect, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import useFetchIngredientList from '../hooks/useFetchIngredientList';
import { createRecipe } from '../utils/createRecipe';
import Input from './atoms/Input';
import OutlineSmButton from './atoms/OutlineSmButton';

const AddEditRecipeForm = ({ recipe }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(recipe ? recipe.title : '');
  const [preparationTime, setPreparationTime] = useState(
    recipe ? recipe.preparationTime : '',
  );
  const [directions, setDirections] = useState(recipe ? recipe.directions : '');
  const [servingCount, setServingCount] = useState(
    recipe ? recipe.servingCount : '',
  );
  const [sideDish, setSideDish] = useState(recipe ? recipe.sideDish : '');
  const [ingredients, setIngredients] = useState(
    recipe ? recipe.ingredients : [],
  );
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');
  const [ingredientAmountUnit, setIngredientAmountUnit] = useState('');
  const [canSaveIngredient, setCanSaveIngredient] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const {
    data: availableIngredients,
    error,
    loading,
  } = useFetchIngredientList();

  useEffect(() => {
    setCanSaveIngredient(
      [ingredientName, ingredientAmount, ingredientAmountUnit].every(
        (argument) => argument.length > 0,
      ),
    );
  }, [ingredientName, ingredientAmount, ingredientAmountUnit]);

  const handleRemoveIngredient = (timestamp, id) => {
    if (timestamp) {
      setIngredients(
        ingredients.filter((ingredient) => ingredient.timestamp !== timestamp),
      );
    }
    if (id) {
      setIngredients(ingredients.filter((ingredient) => ingredient._id !== id));
    }
  };

  const handleSaveIngredient = () => {
    ingredients.push({
      amount: ingredientAmount,
      amountUnit: ingredientAmountUnit,
      isGroup: false,
      name: ingredientName,
      timestamp: Date.now().toString(),
    });

    setIngredientName('');
    setIngredientAmount('');
    setIngredientAmountUnit('');
  };

  const handleUpdateRecipe = (e) => {
    e.preventDefault();
    setIsUploading(true);

    const newRecipe = createRecipe(
      directions,
      ingredients,
      title,
      preparationTime,
      servingCount,
      sideDish,
    );

    const updateRecipe = async (updatedRecipe) => {
      try {
        const response = await api.post(
          `/recipes/${recipe._id}`,
          updatedRecipe,
        );
        setIsUploading(false);
        if (response.status === 200) {
          navigate(`/recept/${updatedRecipe.slug}`);
        }
      } catch (err) {
        console.log(err);
        setIsUploading(false);
      }
    };

    updateRecipe(newRecipe);
  };

  const handleSaveRecipe = (e) => {
    e.preventDefault();
    setIsUploading(true);

    const newRecipe = createRecipe(
      directions,
      ingredients,
      title,
      preparationTime,
      servingCount,
      sideDish,
    );

    const addRecipe = async (recipe) => {
      try {
        const response = await api.post('/recipes', recipe);
        setIsUploading(false);
        if (response.status === 201) {
          navigate('/');
        }
      } catch (err) {
        console.log(err);
        setIsUploading(false);
      }
    };

    addRecipe(newRecipe);
  };

  return (
    <form id="recipeForm">
      <h2 className="text-xl">{recipe ? 'Upravit' : 'Přidat'} recept</h2>
      <div className="main-options my-4">
        <button
          className="border-2 border-slate-700 px-4 py-1 text-slate-700 hover:text-white rounded hover:rounded-xl hover:bg-slate-600 transition-all duration-300 ease-in-out mr-8"
          onClick={recipe ? handleUpdateRecipe : handleSaveRecipe}
          disabled={isUploading}
          form="recipeForm"
          type="submit"
        >
          Uložit recept
        </button>
        <OutlineSmButton onClick={() => navigate(-1)}>Zpátky</OutlineSmButton>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4">
        <div className="form-group">
          <label className="block mb-1" htmlFor="recipeTitle">
            Název
          </label>
          <Input
            type="text"
            name="recipeTitle"
            placeholder=""
            required
            onChange={({ target }) => setTitle(target.value)}
            value={title}
          />
        </div>
        <div className="form-group">
          <label className="block mb-1" htmlFor="recipeTitle">
            Příloha
          </label>
          <Input
            type="text"
            name="recipeSideDish"
            placeholder=""
            onChange={({ target }) => setSideDish(target.value)}
            value={sideDish}
          />
        </div>
        <div className="form-group">
          <label className="block mb-1" htmlFor="preparationTime">
            Doba přípravy (min)
          </label>
          <Input
            type="number"
            name="preparationTime"
            placeholder=""
            onChange={({ target }) => setPreparationTime(target.value)}
            value={preparationTime}
          />
        </div>
        <div className="form-group">
          <label className="block mb-1" htmlFor="preparationTime">
            Počet porcí
          </label>
          <Input
            type="number"
            name="preparationTime"
            placeholder=""
            onChange={({ target }) => setServingCount(target.value)}
            value={servingCount}
          />
        </div>
      </div>
      <div className="form-group ingredients my-4">
        <label className="block mb-1" htmlFor="ingredients">
          Ingredience
        </label>
        <div className="options flex flex-wrap gap-x-8 gap-y-4">
          <Input
            type="text"
            name="ingredientName"
            placeholder="název"
            onChange={({ target }) => setIngredientName(target.value)}
            value={ingredientName}
          />
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
            {ingredients.map(({ _id, name, amount, amountUnit, timestamp }) => (
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
      <div className="form-group mb-6">
        <label className="block my-1" htmlFor="directions">
          Postup přípravy
        </label>
        <textarea
          className="border-2 rounded-lg px-2 py-1 w-full"
          type="textarea"
          name="directions"
          placeholder=""
          onChange={({ target }) => setDirections(target.value)}
          value={directions}
        />
      </div>
    </form>
  );
};
export default AddEditRecipeForm;
