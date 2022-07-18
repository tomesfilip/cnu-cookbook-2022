import { api } from '../api';
import { useState, useEffect } from 'react';

const useFetchIngredientList = () => {
  const [data, setData] = useState<string[] | null>(null);
  const [ingredients] = useState<[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();

    const getData = async () => {
      try {
        const { data } = await api.get('recipes/ingredients');
        // data.map((ingredient: string) => {
        //   return ingredients.push({ value: ingredient, label: ingredient });
        // });
        setData(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unexpected error');
        }
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
