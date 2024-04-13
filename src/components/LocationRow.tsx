import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Location} from '@app/globals/types';

export default function LocationRow({
  location,
  onPress,
}: {
  location: Location;
  onPress: Function;
}) {
  const onPressHandler = () => {
    onPress(location.id);
  };

  return (
    <TouchableOpacity onPress={onPressHandler}>
      <View style={styles.rowContainer}>
        <Text style={styles.type}>{location.type}</Text>
        <Text style={styles.name}>{location.name}</Text>
        <Text style={styles.dimension}>{location.dimension}</Text>
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
