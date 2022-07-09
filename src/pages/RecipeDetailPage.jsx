import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Alert from '../components/Alert';

import RecipeDetailCard from '../components/RecipeDetailCard';
import useFetchRecipe from '../hooks/useFetchRecipe';

const RecipeDetailPage = () => {
  const { slug } = useParams();
  const { data: recipe, isLoading, error } = useFetchRecipe(slug);

  return (
    <div className="container mx-auto px-4 md:px-0">
      {isLoading && <ClipLoader />}
      {error && <Alert text={error.toString()} />}
      {recipe && (
        <div>
          <RecipeDetailCard
            title={recipe.title}
            preparationTime={recipe.preparationTime}
            ingredients={recipe.ingredients}
            directions={recipe.directions}
            slug={slug}
            _id={recipe._id}
          />
        </div>
      )}
    </div>
  );
};

export default RecipeDetailPage;
