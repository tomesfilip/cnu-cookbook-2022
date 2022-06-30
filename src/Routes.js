import { Routes as RouterRoutes, Route } from 'react-router-dom';

import RecipeListPage from './pages/RecipeListPage';
import NotFoundPage from './pages/NotFoundPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import AddEditRecipePage from './pages/AddEditRecipePage';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route index element={<RecipeListPage />} />
      <Route path="/recipe/:slug" element={<RecipeDetailPage />} />
      <Route path="/add-edit-recipe/:slug" element={<AddEditRecipePage />} />
      <Route path="/add-edit-recipe/" element={<AddEditRecipePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
};

export default Routes;
