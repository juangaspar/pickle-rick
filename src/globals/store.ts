import {atom} from 'jotai';
import {Episode, Location, Character} from './types';
import {atomWithReducer} from 'jotai/utils';

const episodesAtom = atom<Episode[]>([]);

const locationsAtom = atom<Location[]>([]);

const charactersReducer = (
  characters: {[key: string]: Character},
  action: {type: string; url: string; character: Character},
) => {
  if (action.type === 'add') {
    return {...characters, [action.url]: action.character};
  }

  throw new Error('unknown action type');
};

const charactersAtom = atomWithReducer({}, charactersReducer);
export {episodesAtom, locationsAtom, charactersAtom};
