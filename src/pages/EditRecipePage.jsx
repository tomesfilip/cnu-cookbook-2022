import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import AddEditRecipeForm from '../components/AddEditRecipeForm';
import Alert from '../components/Alert';
import useFetchRecipe from '../hooks/useFetchRecipe';

const EditRecipePage = () => {
  const { slug } = useParams();
  const { data: recipe, isLoading, error } = useFetchRecipe(slug);

  return (
    <div className="container mx-auto px-4 md:px-0">
      {isLoading && <ClipLoader />}
      {error && <Alert text={error.toString()} />}
      {recipe && <AddEditRecipeForm recipe={recipe} />}
    </div>
  );
};
export default EditRecipePage;
