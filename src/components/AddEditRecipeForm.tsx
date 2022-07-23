import { FC, FormEvent, useState } from 'react';
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

interface Props {
  recipe?: IRecipeDetail;
}

type RecipeFormValues = {
  title: string;
  preparationTime: number;
  directions: string;
  servingCount: number;
  sideDish: string;
};

const AddEditRecipeForm: FC<Props> = ({ recipe }) => {
  const navigate = useNavigate();
  const [title] = useState<string>(recipe ? recipe.title : '');
  const [preparationTime] = useState<number | string>(
    recipe ? recipe.preparationTime : '',
  );
  const [directions] = useState(recipe ? recipe.directions : '');
  const [servingCount] = useState(recipe ? recipe.servingCount : '');
  const [sideDish] = useState(recipe ? recipe?.sideDish : '');
  const [ingredients, setIngredients] = useState<IIngredient[] | []>(
    recipe?.ingredients ? recipe.ingredients : [],
  );

  const [isUploading, setIsUploading] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Recept potřebuje název')
      .max(60, 'Název receptu nesmí být delší než 60 znakú.'),
    preparationTime: Yup.number().required('Recept musí obsahovat dobu trvání'),
    directions: Yup.string().required(
      'Aby někdo ukuchtil tvúj recept, je nutné mu dát postup',
    ),
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

    const newRecipe = createRecipe(
      recipeData.title,
      recipeData.preparationTime,
      ingredients,
      recipeData.directions,
      recipeData.servingCount,
      recipeData.sideDish,
    );

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

    updateRecipe(newRecipe);
  };

  const handleSaveRecipe = (recipeData: RecipeFormValues) => {
    setIsUploading(true);

    const newRecipe = createRecipe(
      recipeData.title,
      recipeData.preparationTime,
      ingredients,
      recipeData.directions,
      recipeData.servingCount,
      recipeData.sideDish,
    );

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

    addRecipe(newRecipe);
  };

  return (
    <form id="recipeForm" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl">{recipe ? 'Upravit' : 'Přidat'} recept</h2>
      <div className="main-options my-4">
        <button
          className="border-2 border-slate-700 px-4 py-1 text-slate-700 hover:text-white rounded hover:rounded-xl hover:bg-slate-600 transition-all duration-300 ease-in-out mr-8"
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
            defaultValue={0}
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
