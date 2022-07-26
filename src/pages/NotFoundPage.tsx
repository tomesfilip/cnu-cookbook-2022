import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { containerVariants } from '../framerVariants/containerVariants';

const NotFoundPage = () => {
  return (
    <motion.div
      className="container text-center bg-slate-600 p-16 rounded-lg text-white my-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1 className="text-3xl mb-8">Někdo se nám tady stratil!</h1>
      <motion.div
        className="my-4"
        animate={{
          scale: 1.2,
        }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/"
          className="border-2 border-slate-400 px-4 py-1 text-white hover:border-white rounded hover:rounded-xl transition-all duration-300 ease-in-out disabled:opacity-25 disabled:cursor-not-allowed"
          role="button"
        >
          Vrať mě spět k receptúm
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFoundPage;
