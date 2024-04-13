import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'jotai';
import store from '@app/globals/store';

import Home from '@app/screens/home';
import EpisodeDetails from '@app/screens/episode_details';
import LocationDetails from '@app/screens/location_details';
import Settings from '@app/screens/settings';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="EpisodeDetails"
            component={EpisodeDetails}
            options={({route}) => ({title: route.params.name})}
          />
          <Stack.Screen
            name="LocationDetails"
            component={LocationDetails}
            options={({route}) => ({title: route.params.name})}
          />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
