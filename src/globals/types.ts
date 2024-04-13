import type {RouteProp} from '@react-navigation/native';

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
};

type RequestResult = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: any[];
};

export interface GetEpisodesRequestResult extends RequestResult {
  results: Episode[];
}

export type GetEpisodesRequestError = {
  error: string;
};

export interface GetLocationsRequestResult extends RequestResult {
  results: Location[];
}

type RootStackParamList = {
  Home: undefined;
  EpisodeDetails: {episodeId: number};
  LocationDetails: {locationId: number};
};

export type EpisodeDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'EpisodeDetails'
>;

export type LocationDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'LocationDetails'
>;
