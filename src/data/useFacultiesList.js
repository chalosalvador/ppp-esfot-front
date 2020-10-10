import useSWR from 'swr';
import API from './index';

export const useFacultiesList = () => {
  const { data, error, mutate } = useSWR( '/faculties', API.fetcher );

  return {
    faculties: (data && data.data) || [] ,
    links: data && data.links,
    meta: data && data.meta,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};