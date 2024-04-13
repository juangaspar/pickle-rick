import * as React from 'react';
import {Image, Text} from 'react-native';
import useCharacterImage from '@app/hooks/useCharacterImage';

export default function CharacterAvatar({
  characterUrl,
}: {
  characterUrl: string;
}) {
  const character = useCharacterImage(characterUrl);

  return character != null ? (
    <Image source={{uri: character.image}} style={{width: 64, height: 64}} />
  ) : (
    <Text>cargando</Text>
  );
}
