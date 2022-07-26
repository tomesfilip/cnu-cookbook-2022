import { motion } from 'framer-motion';

import AddEditRecipeForm from '../components/Form/AddEditRecipeForm';
import { containerVariants } from '../framerVariants/containerVariants';

const AddRecipePage = () => {
  return (
    <motion.div
      className="container mx-auto px-4 md:px-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <AddEditRecipeForm />
    </motion.div>
  );
};
export default AddRecipePage;
