import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';

import placeholder from '../images/food-placeholder.png';

const RecipeCard = ({ title, preparationTime, slug }) => {
  return (
    <Card className="h-100">
      <Link to={`/recipe/${slug}`} className="text-reset text-decoration-none">
        <CardImg src={placeholder} alt={title} top />
      </Link>
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <CardSubtitle>{preparationTime} min</CardSubtitle>
      </CardBody>
    </Card>
  );
};

export default RecipeCard;
