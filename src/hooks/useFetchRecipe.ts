import { api } from '../api';
import { useState, useEffect } from 'react';

import IRecipeDetail from '../models/IRecipeDetail';

const useFetchRecipe = (slug: string | undefined) => {
  const [data, setData] = useState<IRecipeDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();

    const getData = async () => {
      try {
        const { data } = await api.get(`/recipes/${slug}`);
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
  }, [slug]);

  return { data, isLoading, error };
};

export default useFetchRecipe;
