/**
 * Created by chalosalvador on 8/18/20
 */
import useSWR from 'swr';
import API from './index';

export const useInternshipReport = ( internshipId, reportId, options= {} ) => {
  const { data, error } = useSWR( `/internships/${ internshipId }/internship-reports/${reportId}`, API.fetcher, options );

  return {
    report: data && data.data,
    isLoading: !error && !data,
    isError: error
  };
};
