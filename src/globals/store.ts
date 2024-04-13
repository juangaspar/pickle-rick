import {createStore, atom} from 'jotai';
import {Episode, Location, Character} from './types';

const store = createStore();
const episodesAtom = atom<Episode[]>([]);
store.set(episodesAtom, []);

const locationsAtom = atom<Location[]>([]);
store.set(locationsAtom, []);

const charactersAtom = atom<{[key: string]: Character}>({});
store.set(charactersAtom, {});

export {episodesAtom, locationsAtom, charactersAtom};
export default store;
