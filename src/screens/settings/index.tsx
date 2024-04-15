import i18n from '@app/globals/i18n';
import {languageAtom, themeAtom} from '@app/globals/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const LANGUAGE_ITEMS = [
  {
    label: 'Español',
    value: 'es',
  },
  {label: 'English', value: 'en'},
];
const THEME_ITEMS = [
  {
    label: 'default',
    value: 'default',
  },
  {
    label: 'light',
    value: 'light',
  },
  {
    label: 'dark',
    value: 'dark',
  },
];

export default function Settings() {
  const {colors, dark} = useTheme();
  const {t} = useTranslation();
  const [isLanguageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useAtom(languageAtom);
  const [isThemeOpen, setThemeOpen] = useState(false);
  const [theme, setTheme] = useAtom(themeAtom);

  const onThemeChange = async (newTheme: string | null) => {
    if (newTheme) {
      try {
        await AsyncStorage.setItem('theme', newTheme);
      } catch (e) {
        // saving error
      }
    }
  };

  const onLanguageChange = async (newLanguage: string | null) => {
    if (newLanguage) {
      i18n.changeLanguage(newLanguage);

      try {
        await AsyncStorage.setItem('language', newLanguage);
      } catch (e) {
        // saving error
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={{...styles.label, color: colors.text}}>
          {t('language')}
        </Text>
        <DropDownPicker
          style={styles.field}
          open={isLanguageOpen}
          setOpen={setLanguageOpen}
          items={LANGUAGE_ITEMS}
          value={language}
          setValue={setLanguage}
          listMode="MODAL"
          modalTitle={t('language')}
          onChangeValue={onLanguageChange}
          theme={dark ? 'DARK' : 'LIGHT'}
        />
      </View>
      <View style={styles.row}>
        <Text style={{...styles.label, color: colors.text}}>{t('theme')}</Text>
        <DropDownPicker
          style={styles.field}
          open={isThemeOpen}
          setOpen={setThemeOpen}
          items={THEME_ITEMS.map(item => ({...item, label: t(item.label)}))}
          value={theme}
          setValue={setTheme}
          listMode="MODAL"
          modalTitle={t('theme')}
          onChangeValue={onThemeChange}
          theme={dark ? 'DARK' : 'LIGHT'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginTop: 16, marginLeft: 16},
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {width: 80, marginRight: 10},
  field: {
    width: 180,
  },
});
