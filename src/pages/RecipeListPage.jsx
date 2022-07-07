import { useState } from 'react';
import Select from 'react-select';

import SearchInput from '../components/SearchInput';
import RecipesList from '../components/RecipesList';
import useFetchRecipes from '../hooks/useFetchRecipes';
import FloatingButton from '../components/atoms/FloatingButton';
import Alert from '../components/Alert';
import { ClipLoader } from 'react-spinners';

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

  return (
    <div className="container mx-auto px-4 md:px-0">
      <h1 className="text-4xl text-stone-700">Recepty</h1>
      <FloatingButton linkText="Pridaj recept" linkTo="/pridat-recept" />
      <div className="w-full flex flex-wrap md:items-center flex-col md:flex-row">
        <SearchInput onChange={handleSearchInputChange} value={searchValue} />
        <div className="preparation-time-range-filter md:mx-12">
          <label htmlFor="prepTimeInput" className="form-label block">
            Maximální čas přípravy (min):
            <span className="inline-block ml-1 w-10"> {maxPrepTime}</span>
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="1000"
            step="5"
            id="prepTimeInput"
            value={maxPrepTime}
            onChange={handleMaxPrepTimeChange}
          ></input>
        </div>
        <div className="sort-options">
          Seřadit podle
          <Select options={sortOptions} onChange={handleSortChange} />
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
