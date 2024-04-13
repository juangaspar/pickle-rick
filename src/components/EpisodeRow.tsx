import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Episode} from '@app/globals/types';

export default function EpisodeRow({
  item: episode,
  onPress,
}: {
  item: Episode;
  onPress: Function;
}) {
  const onPressHandler = () => {
    onPress(episode.id);
  };

  return (
    <TouchableOpacity onPress={onPressHandler}>
      <View style={styles.rowContainer}>
        <Text style={styles.episode}>{episode.episode}</Text>
        <Text style={styles.name}>{episode.name}</Text>
        <Text style={styles.airData}>{episode.air_date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    padding: 8,
    borderBottomWidth: 0.5,
  },
  episode: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  name: {
    fontSize: 20,
    marginBottom: 2,
  },
  airData: {
    fontSize: 16,
    marginBottom: 2,
  },
});
