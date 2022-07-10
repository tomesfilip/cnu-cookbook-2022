import { useState } from 'react';
import Select from 'react-select';

import SearchInput from '../components/SearchInput';
import RecipesList from '../components/RecipesList';
import useFetchRecipes from '../hooks/useFetchRecipes';
import FloatingButton from '../components/atoms/FloatingButton';
import Alert from '../components/Alert';
import { ClipLoader } from 'react-spinners';
import PreparationTimeRangeFilter from '../components/PreparationTimeRangeFilter';
import plusImg from '../assets/img/add.svg';
import { MdOutlineAdd } from 'react-icons/md';

const RecipeListPage = () => {
  const { data: recipes, isLoading, error } = useFetchRecipes();
  const [searchValue, setSearchValue] = useState('');
  const [maxPrepTime, setMaxPrepTime] = useState(1000);
  const [sortByOption, setSortByOption] = useState('name');

  const sortOptions = [
    { value: 'name', label: 'Názvu [A-Z]' },
    { value: 'time', label: 'Času přípravy (od nejkratšího)' },
  ];

  const filteredRecipes = recipes
    ? recipes.filter(({ title, preparationTime }) => {
        return (
          title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(
              searchValue
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, ''),
            ) && preparationTime <= maxPrepTime
        );
      })
    : [];

  const sortedRecipes =
    sortByOption === 'time'
      ? filteredRecipes.sort((a, b) => a.preparationTime - b.preparationTime)
      : filteredRecipes.sort((a, b) => a.title - b.title);

  const handleMaxPrepTimeChange = ({ target }) => setMaxPrepTime(target.value);
  const handleSearchInputChange = ({ target }) => setSearchValue(target.value);
  const handleSortChange = ({ value }) => setSortByOption(value);

  const recipeTheme = (theme) => {
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
    <div className="container mx-auto px-4 md:px-0">
      <h1 className="text-4xl text-stone-700">Recepty</h1>
      <FloatingButton
        linkText="Pridaj recept"
        linkTo="/pridat-recept"
        imgSrc={plusImg}
        imgAlt="znak plus"
      >
        <MdOutlineAdd size="2em" />
      </FloatingButton>
      <div className="w-full flex flex-wrap md:items-center flex-col md:flex-row">
        <SearchInput onChange={handleSearchInputChange} value={searchValue} />
        <PreparationTimeRangeFilter
          maxPrepTime={maxPrepTime}
          handleMaxPrepTimeChange={handleMaxPrepTimeChange}
        />
        <div className="sort-options">
          Seřadit podle
          <Select
            defaultValue={sortOptions[0]}
            options={sortOptions}
            onChange={handleSortChange}
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
    </div>
  );
};

export default RecipeListPage;
