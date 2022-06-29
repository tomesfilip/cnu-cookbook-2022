import { useParams } from 'react-router-dom';
import { Container, Spinner, Alert } from 'reactstrap';

import RecipeDetailCard from '../components/RecipeDetailCard';
import useFetchRecipe from '../hooks/useFetchRecipe';

const RecipeDetailPage = () => {
  const { slug } = useParams();
  const { data: recipe, isLoading, error } = useFetchRecipe(slug);

  return (
    <Container>
      {isLoading && <Spinner />}
      {error && <Alert color="danger">{error.toString()}</Alert>}
      {recipe && (
        <RecipeDetailCard
          title={recipe.title}
          preparationTime={recipe.preparationTime}
          ingredients={recipe.ingredients}
          directions={recipe.directions}
        />
      )}
    </Container>
  );
};

export default RecipeDetailPage;
