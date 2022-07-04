import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
  Col,
  Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import placeholder from '../images/food-placeholder.png';
import { getNormalizedPrepTime } from '../utils/getNormalizedPrepTime';

const RecipeCard = ({ title, preparationTime, slug, sideDish }) => {
  return (
    <Card className="h-100">
      <Link to={`/recept/${slug}`} className="text-reset text-decoration-none">
        <CardImg src={placeholder} alt={title} top />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <Row>
            <Col>
              <CardSubtitle>
                {getNormalizedPrepTime(preparationTime)}
              </CardSubtitle>
            </Col>
            <Col>
              <CardSubtitle>{sideDish}</CardSubtitle>
            </Col>
          </Row>
        </CardBody>
      </Link>
    </Card>
  );
};

export default RecipeCard;
