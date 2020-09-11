/**
 * Created by chalosalvador on 9/9/20
 */
import useSWR from 'swr';
import API from './index';

export const useInternshipReportsList = ( id ) => {
  const { data, error, mutate } = useSWR( `/internships/${id}/internship-reports`, API.fetcher );

  console.log( 'data', data );
  return {
    reports: data && data.data,
    // links: data && data.links,
    // meta: data && data.meta,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};
