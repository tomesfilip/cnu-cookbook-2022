import { api } from '../api';
import { useState, useEffect } from 'react';

const useFetchIngredientList = () => {
  const [data, setData] = useState(null);
  const [ingredients] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    const getData = async () => {
      try {
        const { data } = await api.get('recipes/ingredients');
        data.map((ingredient) => {
          return ingredients.push({ value: ingredient, label: ingredient });
        });
        setData(data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
    return () => abortController.abort();
  }, [ingredients]);

  return { data, isLoading, error };
};

export default useFetchIngredientList;
