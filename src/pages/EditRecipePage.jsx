import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion';

import AddEditRecipeForm from '../components/AddEditRecipeForm';
import Alert from '../components/Alert';
import useFetchRecipe from '../hooks/useFetchRecipe';
import { containerVariants } from '../framerVariants/containerVariants';

const EditRecipePage = () => {
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
      {error && <Alert text={error.toString()} />}
      {recipe && <AddEditRecipeForm recipe={recipe} />}
    </motion.div>
  );
};
export default EditRecipePage;
