import { Button } from 'reactstrap';

const DeleteRecipeButton = ({ handleDeleteRecipe }) => {
  return <Button onClick={handleDeleteRecipe}>Zmazat</Button>;
};
export default DeleteRecipeButton;
