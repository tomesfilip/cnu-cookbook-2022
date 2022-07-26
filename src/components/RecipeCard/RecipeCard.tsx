import { FC } from 'react';
import { Link } from 'react-router-dom';

import Placeholder from '../../assets/img/food-placeholder.png';
import RecipeCardAdditionalInfo from './RecipeCardAdditionalInfo';

interface Props {
  title: string;
  preparationTime: number;
  slug: string;
  sideDish?: string;
}

const RecipeCard: FC<Props> = ({ title, preparationTime, slug, sideDish }) => {
  return (
    <div className="recipe-card px-4 py-2 mx-2 rounded-lg hover:rounded-xl hover:shadow-md transition-all">
      <Link to={`/recept/${slug}`} className="text-reset text-decoration-none">
        <img
          className="object-cover rounded-lg w-full h-64"
          src={Placeholder}
          alt={title}
        />
        <div className="recipe-card-body mt-2 px-3">
          <h5 className="text-lg truncate">{title}</h5>
          <RecipeCardAdditionalInfo
            preparationTime={preparationTime}
            sideDish={sideDish}
          />
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
