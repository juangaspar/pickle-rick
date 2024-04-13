import {useEffect} from 'react';
import {charactersAtom} from '@app/globals/store';
import {useAtom} from 'jotai/react';
import {Character} from '@app/globals/types';

export default function useCharacterImage(characterUrl: string) {
  const [characters, setCharacters] = useAtom(charactersAtom);

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

      setCharacters({...characters, [characterUrl]: result});
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return characters[characterUrl] || null;
}
