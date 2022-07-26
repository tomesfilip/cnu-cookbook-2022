import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import IRecipeDetail from '../models/IRecipeDetail';
import { createRecipe } from '../utils/createRecipe';
import OutlineSmButton from './atoms/OutlineSmButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../assets/styles/RecipeForm.scss';
import IngredientInputForm from './IngredientInputForm';
import IIngredient from '../models/IIngredient';
import RecipeFormValues from '../models/RecipeFormValues';

interface Props {
  recipe?: IRecipeDetail;
}

const AddEditRecipeForm: FC<Props> = ({ recipe }) => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<IIngredient[] | []>(
    recipe?.ingredients ? recipe.ingredients : [],
  );

  const [isUploading, setIsUploading] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Recept potřebuje název')
      .max(60, 'Název receptu nesmí být delší než 60 znakú.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormValues>({ resolver: yupResolver(validationSchema) });
  const onSubmit = (data: RecipeFormValues) => {
    recipe ? handleUpdateRecipe(data) : handleSaveRecipe(data);
  };

  const handleUpdateRecipe = (recipeData: RecipeFormValues) => {
    setIsUploading(true);

    const updateRecipe = async (updatedRecipe: IRecipeDetail) => {
      try {
        const response = await api.post(
          `/recipes/${recipe?._id}`,
          updatedRecipe,
        );
        setIsUploading(false);
        if (response.status === 200) {
          navigate(`/recept/${updatedRecipe.slug}`);
          toast.success('Recept byl aktualizován!');
        }
      } catch (err) {
        toast.error(`Chybička se vloudila: ${err}`);
        setIsUploading(false);
      }
    };

    updateRecipe(createRecipe({ ...recipeData, ingredients: ingredients }));
  };

  const handleSaveRecipe = (recipeData: RecipeFormValues) => {
    setIsUploading(true);

    const addRecipe = async (recipe: IRecipeDetail) => {
      try {
        const response = await api.post('/recipes', recipe);
        setIsUploading(false);
        if (response.status === 201) {
          navigate('/');
          toast.success('Recept byl vytvořen!');
        }
      } catch (err) {
        toast.error(`Chybička se vloudila: ${err}`);
        setIsUploading(false);
      }
    };

    addRecipe(createRecipe({ ...recipeData, ingredients: ingredients }));
  };

  return (
    <form id="recipeForm" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl">{recipe ? 'Upravit' : 'Přidat'} recept</h2>
      <div className="main-options my-4 flex flex-wrap gap-x-4 gap-y-2">
        <button
          className="border-2 border-slate-700 px-4 py-1 text-slate-700 hover:text-white rounded hover:rounded-xl hover:bg-slate-600 transition-all duration-300 ease-in-out"
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
          <input
            type="text"
            id="recipe-title"
            aria-invalid={errors.title ? 'true' : 'false'}
            defaultValue={recipe?.title}
            {...register('title')}
          />
          <div className="invalid-feedback">{errors.title?.message}</div>
        </div>
        <div className="form-group">
          <label className="block mb-1" htmlFor="recipeTitle">
            Příloha
          </label>
          <input
            type="text"
            id="recipeSideDish"
            placeholder=""
            defaultValue={recipe?.sideDish}
            {...register('sideDish')}
          />
        </div>
        <div className="form-group">
          <label className="block mb-1" htmlFor="preparationTime">
            Doba přípravy (min)
          </label>
          <input
            type="number"
            id="preparationTime"
            defaultValue={recipe?.preparationTime}
            aria-invalid={errors.preparationTime ? 'true' : 'false'}
            {...register('preparationTime')}
          />
          <div className="invalid-feedback">
            {errors.preparationTime?.message}
          </div>
        </div>
        <div className="form-group">
          <label className="block mb-1" htmlFor="servingCount">
            Počet porcí
          </label>
          <input
            type="number"
            id="servingCount"
            defaultValue={recipe?.servingCount}
            {...register('servingCount')}
          />
        </div>
      </div>
      <IngredientInputForm
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <div className="form-group mb-6">
        <label className="block my-1" htmlFor="directions">
          Postup přípravy
        </label>
        <textarea
          className="border-2 rounded-lg px-2 py-1 w-full"
          id="directions"
          aria-invalid={errors.directions ? 'true' : 'false'}
          {...register('directions')}
        />
        <div className="invalid-feedback">{errors.directions?.message}</div>
      </div>
    </form>
  );
};
export default AddEditRecipeForm;
