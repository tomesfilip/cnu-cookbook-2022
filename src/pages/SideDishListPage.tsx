import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion';

import Alert from '../components/Alert';
import SideDishList from '../components/SideDishList';
import useFetchSideDishList from '../hooks/useFetchSideDishList';
import { containerVariants } from '../framerVariants/containerVariants';

const SideDishListPage = () => {
  const { data: sideDishList, isLoading, error } = useFetchSideDishList();

  return (
    <motion.div
      className="container mx-auto px-4 md:px-0 my-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {isLoading && <ClipLoader />}
      {error && <Alert text={error.toString()} />}
      {sideDishList && <SideDishList sideDishList={sideDishList} />}
    </motion.div>
  );
};
export default SideDishListPage;
