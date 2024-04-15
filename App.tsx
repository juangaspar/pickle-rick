import React, {useEffect} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  Theme,
  useTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '@app/screens/home';
import EpisodeDetails from '@app/screens/episode_details';
import LocationDetails from '@app/screens/location_details';
import Settings from '@app/screens/settings';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {themeAtom} from '@app/globals/store';
import i18n from '@app/globals/i18n';
import {useAtom} from 'jotai/react';

const Stack = createNativeStackNavigator();

function HomeHeader(
  navigation: any,
  onSettingsPress: (navigation: any) => () => void,
) {
  const theme = useTheme();

  return () => (
    <TouchableOpacity onPress={onSettingsPress(navigation)}>
      <Image
        source={require('@app/assets/settings.png')}
        style={{...styles.settingsButton, tintColor: theme.colors.text}}
      />
    </TouchableOpacity>
  );
}

export default function App() {
  const {t} = useTranslation();
  const [theme, setTheme] = useAtom(themeAtom);
  const scheme = useColorScheme();

  const onSettingsPress = (navigation: any) => () => {
    navigation.navigate('settings');
  };

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const language = await AsyncStorage.getItem('language');
        const savedTheme = await AsyncStorage.getItem('theme');

        if (language) {
          i18n.changeLanguage(language);
        }

        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (e) {
        // saving error
      }
    };

    loadLanguage();
  }, []);

  return (
    <NavigationContainer
      theme={
        (theme === 'default' && scheme === 'light') || theme === 'light'
          ? DefaultTheme
          : DarkTheme
      }>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          component={Home}
          options={({navigation}) => ({
            title: t('home'),
            headerRight: HomeHeader(navigation, onSettingsPress),
          })}
        />
        <Stack.Screen
          name="episodeDetails"
          component={EpisodeDetails}
          options={({route}) => ({title: route.params.name})}
        />
        <Stack.Screen
          name="locationDetails"
          component={LocationDetails}
          options={({route}) => ({title: route.params.name})}
        />
        <Stack.Screen
          name={'settings'}
          component={Settings}
          options={() => ({
            title: t('settings'),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({settingsButton: {width: 24, height: 24}});
