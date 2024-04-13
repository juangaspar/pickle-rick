import {GetEpisodesRequestResult} from '@app/globals/types';
import {useState} from 'react';

export default function useEpisodesService() {
  const [nextPage, setNextPage] = useState(1);

  const loadMore = async () => {
    try {
      const response: Response = await fetch(
        `https://rickandmortyapi.com/api/location?page=${nextPage}`,
      );
      const result: GetEpisodesRequestResult = await response.json();
      setNextPage(nextPage + 1);
      return result.results;
    } catch (error) {
      return null;
    }
  };

  return [loadMore];
}
