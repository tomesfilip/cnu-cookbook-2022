import RecipeCard from './RecipeCard';

const RecipesList = ({ recipes }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 my-4">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.slug}
          title={recipe.title}
          preparationTime={recipe.preparationTime}
          slug={recipe.slug}
          sideDish={recipe.sideDish}
        />
      ))}
    </div>
  );
};

export default RecipesList;
