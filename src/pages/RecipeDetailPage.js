import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner, Alert } from 'reactstrap';

import { api } from '../api';
import RecipeDetailCard from '../components/RecipeDetailCard';

const RecipeDetailPage = () => {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);

    api
      .get(`/recipes/${slug}`)
      .then((res) => setRecipe(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [slug]);

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
