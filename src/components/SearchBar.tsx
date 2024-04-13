import * as React from 'react';
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

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChange={onChangeHandler}
          placeholder="Search..."
        />
        <TouchableOpacity onPress={onClose}>
          <Image
            style={styles.icon}
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
    backgroundColor: '#ffffff', // Background color for the inner container
    borderRadius: 8,
    paddingHorizontal: 10,
    elevation: 2,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#888888', // Color of the search and close icons
  },
  input: {
    flexGrow: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333333', // Color of the text input
  },
});
