import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CustomList from '@app/components/CustomList';
import EpisodeRow from '@app/components/EpisodeRow';
import useEpisodesService from '@app/hooks/useEpisodesService';
import useLocationsService from '@app/hooks/useLocationsService';
import LocationRow from '@app/components/LocationRow';

const Tab = createMaterialTopTabNavigator();

function EpisodeList() {
  return (
    <CustomList
      ItemRow={EpisodeRow}
      useLoadService={useEpisodesService}
      detailsRoute={'EpisodeDetails'}
    />
  );
}

function LocationList() {
  return (
    <CustomList
      ItemRow={LocationRow}
      useLoadService={useLocationsService}
      detailsRoute={'LocationDetails'}
    />
  );
}

export default function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Episode List" component={EpisodeList} />
      <Tab.Screen name="Location List" component={LocationList} />
    </Tab.Navigator>
  );
}
