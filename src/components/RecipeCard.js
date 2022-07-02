import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';

import placeholder from '../images/food-placeholder.png';
import { getNormalizedPrepTime } from '../utils/getNormalizedPrepTime';

const RecipeCard = ({ title, preparationTime, slug }) => {
  return (
    <Card className="h-100">
      <Link to={`/recipe/${slug}`} className="text-reset text-decoration-none">
        <CardImg src={placeholder} alt={title} top />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle>{getNormalizedPrepTime(preparationTime)}</CardSubtitle>
        </CardBody>
      </Link>
    </Card>
  );
};

export default RecipeCard;
