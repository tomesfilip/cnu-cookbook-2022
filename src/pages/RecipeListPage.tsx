import { useState } from 'react';
import Select, { Theme } from 'react-select';
import { motion } from 'framer-motion';

import SearchInput from '../components/SearchInput';
import RecipesList from '../components/RecipesList';
import useFetchRecipeList from '../hooks/useFetchRecipeList';
import FloatingButton from '../components/atoms/FloatingButton';
import Alert from '../components/Alert';
import { ClipLoader } from 'react-spinners';
import PreparationTimeRangeFilter from '../components/PreparationTimeRangeFilter';
import { MdOutlineAdd } from 'react-icons/md';
import { normalizeText } from '../utils/normalizeText';
import { containerVariants } from '../framerVariants/containerVariants';

const RecipeListPage = () => {
  const { data: recipes, isLoading, error } = useFetchRecipeList();
  const [searchValue, setSearchValue] = useState<string>('');
  const [maxPrepTime, setMaxPrepTime] = useState<number>(1000);
  const [sortByOption, setSortByOption] = useState<SortOption | null>(null);

  interface SortOption {
    value: string;
    label: string;
  }

  const sortOptions: SortOption[] = [
    { value: 'name', label: 'Názvu [A-Z]' },
    { value: 'time', label: 'Času přípravy (od nejkratšího)' },
  ];

  const filteredRecipes = recipes
    ? recipes.filter(({ title, preparationTime }) => {
        return (
          normalizeText(title).includes(normalizeText(searchValue)) &&
          preparationTime <= maxPrepTime
        );
      })
    : [];

  const sortedRecipes =
    sortByOption?.value === 'time'
      ? filteredRecipes.sort((a, b) => a.preparationTime - b.preparationTime)
      : filteredRecipes.sort();

  const recipeTheme = (theme: Theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: 'orange',
        primary: '#44403c',
      },
    };
  };

  return (
    <motion.div
      className="container mx-auto px-4 md:px-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1 className="text-4xl text-stone-700">Recepty</h1>
      <FloatingButton linkTo="/pridat-recept">
        <MdOutlineAdd size="2em" />
      </FloatingButton>
      <div className="w-full flex flex-wrap md:items-center flex-col md:flex-row">
        <SearchInput setValue={setSearchValue} value={searchValue} />
        <PreparationTimeRangeFilter
          maxPrepTime={maxPrepTime}
          setMaxPrepTime={setMaxPrepTime}
        />
        <div className="sort-options">
          Seřadit podle
          <Select
            defaultValue={sortOptions[0]}
            options={sortOptions}
            onChange={(option: SortOption | null) => setSortByOption(option)}
            theme={recipeTheme}
          />
        </div>
      </div>
      {isLoading && <ClipLoader />}
      {error && <Alert text={error.toString()} />}
      {sortedRecipes.length < 1 ? (
        <h2>K zvoleným filtrom nebyly nalezeny žádné recepty</h2>
      ) : (
        <RecipesList recipes={sortedRecipes} />
      )}
    </motion.div>
  );
};

export default RecipeListPage;
