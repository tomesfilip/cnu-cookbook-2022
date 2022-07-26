import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import Alert from '../components/Alert';

import RecipeDetailCard from '../components/RecipeDetail/RecipeDetailCard';
import useFetchRecipe from '../hooks/useFetchRecipe';
import { containerVariants } from '../framerVariants/containerVariants';

const RecipeDetailPage = () => {
  const { slug } = useParams();
  const { data: recipe, isLoading, error } = useFetchRecipe(slug);

  return (
    <motion.div
      className="container mx-auto px-4 md:px-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {isLoading && <ClipLoader />}
      {error && <Alert text={error ? error.toString() : ''} />}
      {recipe && (
        <div>
          <RecipeDetailCard
            title={recipe.title}
            preparationTime={recipe.preparationTime}
            ingredients={recipe.ingredients}
            directions={recipe.directions}
            servingCount={recipe.servingCount}
            slug={slug}
            _id={recipe._id}
          />
        </div>
      )}
    </motion.div>
  );
};

export default RecipeDetailPage;
