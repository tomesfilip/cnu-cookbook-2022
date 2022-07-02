import { useState } from 'react';
import { Container, Spinner, Alert, Col, Row } from 'reactstrap';
import Select from 'react-select';

import SearchInput from '../components/SearchInput';
import RecipesList from '../components/RecipesList';
import useFetchRecipes from '../hooks/useFetchRecipes';
import FloatingButton from '../components/FloatingButton';

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
    <Container>
      <h1>Recepty</h1>
      <FloatingButton linkText={'Pridaj recept'} linkTo="/pridat-recept" />
      <SearchInput onChange={handleSearchInputChange} value={searchValue} />
      <Row className="mb-4">
        <Col xs={3}>
          <label htmlFor="prepTimeInput" className="form-label">
            Maximální čas přípravy: {maxPrepTime} min
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
        </Col>
        <Col xs={4}>
          Seřadit podle
          <Select options={sortOptions} onChange={handleSortChange} />
        </Col>
      </Row>

      {isLoading && <Spinner />}
      {error && <Alert color="danger">{error.toString()}</Alert>}
      {sortedRecipes.length < 1 ? (
        <h2>K zvoleným filtrom nebyly nalezeny žádné recepty</h2>
      ) : (
        <RecipesList recipes={sortedRecipes} />
      )}
    </Container>
  );
};

export default RecipeListPage;
