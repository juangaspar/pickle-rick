import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import EpisodeList from '@app/components/EpisodeList';
import LocationList from '@app/components/LocationList';

const Tab = createMaterialTopTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Episode List" component={EpisodeList} />
      <Tab.Screen name="Location List" component={LocationList} />
    </Tab.Navigator>
  );
}
