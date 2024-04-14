import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import useCharacterImage from '@app/hooks/useCharacterImage';

export default function CharacterAvatar({
  characterUrl,
}: {
  characterUrl: string;
}) {
  const character = useCharacterImage(characterUrl);

  return character != null ? (
    <View style={styles.container}>
      <Image source={{uri: character.image}} style={styles.image} />
      <Text style={styles.text}>{character.name}</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 92,
    alignItems: 'center',
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 36,
    marginBottom: 4,
    backgroundColor: 'rgba(52,52,52, 0.2)',
  },
  text: {
    width: 76,
    textAlign: 'center',
  },
});
