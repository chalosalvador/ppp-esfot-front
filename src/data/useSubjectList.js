import useSWR from 'swr';
import API from './index';

export const useSubjectsList = () => {
    const { data, error, mutate } = useSWR( '/subjects', API.fetcher );

    return {
        subjects: (data && data.data) || [] ,
        links: data && data.links,
        meta: data && data.meta,
        isLoading: !error && !data,
        isError: error,
        mutate
    };
};