import {createStore, atom} from 'jotai';
import {Episode, Location} from './types';

const store = createStore();
const episodesAtom = atom<Episode[]>([]);
store.set(episodesAtom, []);

const locationsAtom = atom<Location[]>([]);
store.set(locationsAtom, []);

export {episodesAtom, locationsAtom};
export default store;
