import {useEffect} from 'react';
import {charactersAtom} from '@app/globals/store';
import {useAtom} from 'jotai/react';
import {Character} from '@app/globals/types';

export default function useCharacterImage(characterUrl: string) {
  const [characters, dispatch] = useAtom(charactersAtom);

  useEffect(() => {
    if (!characters[characterUrl]) {
      loadCharacter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterUrl]);

  const loadCharacter = async () => {
    try {
      const response: Response = await fetch(characterUrl);
      const result: Character = await response.json();

      dispatch({type: 'add', url: characterUrl, character: result});
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return characters[characterUrl] || null;
}
