import * as React from 'react';
import {
  Image,
  NativeSyntheticEvent,
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

  return (
    <View>
      <Image
        source={require('@app/assets/search.png')}
        style={{width: 32, height: 32}}
      />
      <TextInput onChange={onChangeHandler} />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          borderRadius: 10,
          height: 48,
          width: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'lightgrey',
        }}
        onPress={() => onClose()}>
        <Image
          source={require('@app/assets/search.png')}
          style={{width: 32, height: 32}}
        />
      </TouchableOpacity>
    </View>
  );
}
