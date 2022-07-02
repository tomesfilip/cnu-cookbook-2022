import { Alert } from 'bootstrap';
import { useParams } from 'react-router-dom';
import { Container, Spinner } from 'reactstrap';
import AddEditRecipeForm from '../components/AddEditRecipeForm';
import useFetchRecipe from '../hooks/useFetchRecipe';

const EditRecipePage = () => {
  const { slug } = useParams();
  const { data: recipe, isLoading, error } = useFetchRecipe(slug);

  return (
    <Container>
      {isLoading && <Spinner />}
      {error && <Alert color="danger">{error.toString()}</Alert>}
      {recipe && <AddEditRecipeForm recipe={recipe} />}
    </Container>
  );
};
export default EditRecipePage;
