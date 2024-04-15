import {locationsAtom} from '@app/globals/store';
import {
  GetLocationsRequestError,
  GetLocationsRequestResult,
} from '@app/globals/types';
import {useAtom} from 'jotai/react';
import {useState} from 'react';

export default function useLocationsService() {
  const [nextPage, setNextPage] = useState(1);
  const [locations, setLocations] = useAtom(locationsAtom);
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
        `https://rickandmortyapi.com/api/location?page=${page}${
          search ? `&name=${search}` : ''
        }`,
      );
      const result: GetLocationsRequestResult | GetLocationsRequestError =
        await response.json();

      if ((result as GetLocationsRequestResult).results !== undefined) {
        const newLocations = (result as GetLocationsRequestResult).results;
        setNextPage(page + 1);
        setLocations(
          isNewSearch ? [...newLocations] : [...locations, ...newLocations],
        );
      } else if (isNewSearch) {
        setLocations([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return [locations, loadMore, isLoading] as const;
}
