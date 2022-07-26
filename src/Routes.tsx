import { Routes as RouterRoutes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import RecipeListPage from './pages/RecipeListPage';
import NotFoundPage from './pages/NotFoundPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import AddRecipePage from './pages/AddRecipePage';
import SideDishListPage from './pages/SideDishListPage';
import EditRecipePage from './pages/EditRecipePage';

const Routes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <RouterRoutes location={location} key={location.key}>
        <Route index element={<RecipeListPage />} />
        <Route path="/recept/:slug" element={<RecipeDetailPage />} />
        <Route path="/pridat-recept/" element={<AddRecipePage />} />
        <Route path="/recept/:slug/upravit" element={<EditRecipePage />} />
        <Route path="/prilohy" element={<SideDishListPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </RouterRoutes>
    </AnimatePresence>
  );
};

export default Routes;
