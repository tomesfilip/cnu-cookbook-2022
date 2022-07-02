import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
} from 'reactstrap';
import { api } from '../api';
import useFetchRecipe from '../hooks/useFetchRecipe';
import { createRecipe } from '../utils/createRecipe';

const AddEditRecipePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [directions, setDirections] = useState('');
  const [servingCount, setServingCount] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');
  const [ingredientAmountUnit, setIngredientAmountUnit] = useState('');
  const [canSaveIngredient, setCanSaveIngredient] = useState(false);
  const [isUloading, setIsUploading] = useState(false);

  const { data: recipe, isLoading, error } = useFetchRecipe(slug);

  useEffect(() => {
    if (recipe) {
      console.log('asdasdasd');
      setTitle(recipe.title);
      setPreparationTime(recipe.preparationTime);
      setDirections(recipe.directions);
      setServingCount(recipe.servingCount);
      setIngredients(recipe.ingredients);
    }
  }, [recipe]);

  useEffect(() => {
    setCanSaveIngredient(
      [ingredientName, ingredientAmount, ingredientAmountUnit].every(
        (argument) => argument.length > 0,
      ),
    );
  }, [ingredientName, ingredientAmount, ingredientAmountUnit]);

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

  const handleSaveRecipe = useCallback(
    (shouldCreateRecipe = false, shouldUpdateRecipe = false) => {
      return async (e) => {
        e.preventDefault();
        setIsUploading(true);
        const newRecipe = recipe
          ? createRecipe(
              directions,
              ingredients,
              title,
              preparationTime,
              servingCount,
              recipe._id,
            )
          : createRecipe(
              directions,
              ingredients,
              title,
              preparationTime,
              servingCount,
            );

        const addRecipe = async (recipe) => {
          try {
            const response = await api.post('/recipes', recipe);
            setIsUploading(false);
            console.log(response.status);
            if (response.status === 201) {
              navigate('/');
            }
          } catch (err) {
            console.log(err);
            setIsUploading(false);
          }
        };

        const updateRecipe = async (recipe) => {
          try {
            console.log(recipe);
            const response = await api.post(`/recipes/${recipe._id}`, recipe);
            setIsUploading(false);
            console.log(response);
            if (response.status === 200) {
              navigate(`/recipe/${slug}`);
            }
          } catch (err) {
            console.log(err);
            setIsUploading(false);
          }
        };

        if (shouldCreateRecipe) {
          console.log('adding recipe');
          addRecipe(newRecipe);
        } else if (shouldUpdateRecipe) {
          console.log('updating recipe');
          updateRecipe(newRecipe);
        }
      };
    },
  );

  return (
    <Container>
      <Row>
        <Col>
          <h2>{recipe ? 'Editovat recept' : 'Přidat recept'}</h2>
        </Col>
        <Col>
          <Button
            outline
            color="dark"
            onClick={
              recipe
                ? handleSaveRecipe(false, true)
                : handleSaveRecipe(true, false)
            }
            disabled={isUloading}
            form="recipeForm"
            type="submit"
          >
            {recipe ? 'Uložit změny' : 'Uložit recept'}
          </Button>
        </Col>
        <Col>
          <Button outline color="dark" onClick={() => navigate(-1)}>
            Zpátky
          </Button>
        </Col>
      </Row>
      <Form id="recipeForm">
        <FormGroup>
          <Label for="recipeTitle">Název</Label>
          <Input
            type="text"
            name="recipeTitle"
            placeholder=""
            required
            onChange={({ target }) => setTitle(target.value)}
            value={title}
          />
        </FormGroup>
        <FormGroup>
          <Row>
            <Col>
              <Label for="preparationTime">Doba přípravy (min)</Label>
              <Input
                type="number"
                name="preparationTime"
                placeholder=""
                onChange={({ target }) => setPreparationTime(target.value)}
                value={preparationTime}
              />
            </Col>
            <Col>
              <Label for="preparationTime">Počet porcí</Label>
              <Input
                type="number"
                name="preparationTime"
                placeholder=""
                onChange={({ target }) => setServingCount(target.value)}
                value={servingCount}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Label for="ingredients">Ingredience</Label>
          <Row>
            <Col>
              <Input
                type="text"
                name="ingredientName"
                placeholder="název"
                onChange={({ target }) => setIngredientName(target.value)}
                value={ingredientName}
              />
            </Col>
            <Col>
              <Input
                type="number"
                name="ingredientAmount"
                placeholder="množství"
                onChange={({ target }) => setIngredientAmount(target.value)}
                value={ingredientAmount}
              />
            </Col>
            <Col>
              <Input
                type="text"
                name="ingredientUnit"
                placeholder="jednotka"
                onChange={({ target }) => setIngredientAmountUnit(target.value)}
                value={ingredientAmountUnit}
              />
            </Col>
            <Col>
              <Button
                disabled={!canSaveIngredient}
                onClick={handleSaveIngredient}
              >
                Pridat
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              {ingredients.map(({ name, amount, amountUnit, timestamp }) => (
                <div key={name} className="ingredient">
                  {name}: {amount} {amountUnit} - {timestamp}
                </div>
              ))}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Label for="directions">Postup přípravy</Label>
          <Input
            type="textarea"
            name="directions"
            placeholder=""
            onChange={({ target }) => setDirections(target.value)}
            value={directions}
          />
        </FormGroup>
      </Form>
    </Container>
  );
};
export default AddEditRecipePage;
