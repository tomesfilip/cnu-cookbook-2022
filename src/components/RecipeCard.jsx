import { Link } from 'react-router-dom';

import placeholder from '../assets/img/food-placeholder.png';
import { getNormalizedPrepTime } from '../utils/getNormalizedPrepTime';

const RecipeCard = ({ title, preparationTime, slug, sideDish }) => {
  return (
    <div className="recipe-card px-4 py-2 mx-2 rounded-lg hover:rounded-xl hover:shadow-md transition-all">
      <Link to={`/recept/${slug}`} className="text-reset text-decoration-none">
        <img src={placeholder} alt={title} />
        <div className="recipe-card-body mt-2 px-3">
          <h5 className="text-lg">{title}</h5>
          <div className="text-sm flex flex-wrap">
            <h6 className="mr-4">{getNormalizedPrepTime(preparationTime)}</h6>
            <p>{sideDish}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
