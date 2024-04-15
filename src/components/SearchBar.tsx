import {useTheme} from '@react-navigation/native';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';

type SearchBarParameters = {
  onChange: (value: string) => void;
  onClose: () => void;
};
export default function SearchBar({onChange, onClose}: SearchBarParameters) {
  const onChangeHandler = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    onChange(e.nativeEvent.text);
  };
  const {t} = useTranslation();
  const {colors} = useTheme();

  return (
    <View style={styles.outerContainer}>
      <View style={{...styles.container, backgroundColor: colors.card}}>
        <TextInput
          style={{...styles.input, color: colors.text}}
          onChange={onChangeHandler}
          placeholder={`${t('search')}...`}
          placeholderTextColor={colors.text}
        />
        <TouchableOpacity onPress={onClose}>
          <Image
            style={{...styles.icon, tintColor: colors.text}}
            source={require('@app/assets/close.png')} // Assuming you have a close icon
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: 'transparent', // Background color for the search bar container
    padding: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    elevation: 2,
  },
  icon: {
    width: 20,
    height: 20, // Color of the search and close icons
  },
  input: {
    flexGrow: 1,
    marginLeft: 10,
    fontSize: 16, // Color of the text input
  },
});
