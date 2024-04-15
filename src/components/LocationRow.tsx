import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Location} from '@app/globals/types';
import {useTheme} from '@react-navigation/native';

export default function LocationRow({
  item: location,
  onPress,
}: {
  item: Location;
  onPress: Function;
}) {
  const {colors} = useTheme();

  const onPressHandler = () => {
    onPress(location.id);
  };

  return (
    <TouchableOpacity onPress={onPressHandler}>
      <View style={styles.rowContainer}>
        <Text style={{...styles.type, color: colors.text}}>
          {location.type}
        </Text>
        <Text style={{...styles.name, color: colors.text}}>
          {location.name}
        </Text>
        <Text style={{...styles.dimension, color: colors.text}}>
          {location.dimension}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    padding: 8,
    borderBottomWidth: 0.5,
  },
  type: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  name: {
    fontSize: 20,
    marginBottom: 2,
  },
  dimension: {
    fontSize: 16,
    marginBottom: 2,
  },
});
