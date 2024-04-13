import {episodesAtom} from '@app/globals/store';
import {
  GetEpisodesRequestError,
  GetEpisodesRequestResult,
} from '@app/globals/types';
import {useAtom} from 'jotai/react';
import {useState} from 'react';

export default function useEpisodesService() {
  const [nextPage, setNextPage] = useState(1);
  const [episodes, setEpisodes] = useAtom(episodesAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string | null>(null);

  const loadMore = async (search: string | null) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const isNewSearch = search !== searchText;
    const page = isNewSearch ? 1 : nextPage;

    if (search !== null) {
      setSearchText(search);
    }

    try {
      const response: Response = await fetch(
        `https://rickandmortyapi.com/api/episode?page=${page}${
          search ? `&name=${search}` : ''
        }`,
      );
      const result: GetEpisodesRequestResult | GetEpisodesRequestError =
        await response.json();

      if ((result as GetEpisodesRequestResult).results !== undefined) {
        const newEpisodes = (result as GetEpisodesRequestResult).results;
        setNextPage(page + 1);
        setEpisodes(
          isNewSearch ? [...newEpisodes] : [...episodes, ...newEpisodes],
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return [episodes, loadMore, isLoading] as const;
}
