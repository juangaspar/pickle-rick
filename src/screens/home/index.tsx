import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CustomList from '@app/components/CustomList';
import EpisodeRow from '@app/components/EpisodeRow';
import useEpisodesService from '@app/hooks/useEpisodesService';
import useLocationsService from '@app/hooks/useLocationsService';
import LocationRow from '@app/components/LocationRow';
import {useTranslation} from 'react-i18next';

const Tab = createMaterialTopTabNavigator();

function EpisodeList() {
  return (
    <CustomList
      ItemRow={EpisodeRow}
      useLoadService={useEpisodesService}
      detailsRoute={'episodeDetails'}
    />
  );
}

function LocationList() {
  return (
    <CustomList
      ItemRow={LocationRow}
      useLoadService={useLocationsService}
      detailsRoute={'locationDetails'}
    />
  );
}

export default function Home() {
  const {t} = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        options={() => ({
          title: t('episodes'),
        })}
        name={'Episode List'}
        component={EpisodeList}
      />
      <Tab.Screen
        options={() => ({
          title: t('locations'),
        })}
        name="Location List"
        component={LocationList}
      />
    </Tab.Navigator>
  );
}
