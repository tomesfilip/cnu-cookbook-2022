import { api } from '../api';

const { useState, useEffect } = require('react');

const useFetchRecipe = (slug) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    const getData = async () => {
      try {
        const { data } = await api.get(`/recipes/${slug}`);
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
  }, [slug]);

  return { data, isLoading, error };
};

export default useFetchRecipe;
