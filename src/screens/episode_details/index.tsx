import CharacterAvatar from '@app/components/CharacterAvatar';
import {episodesAtom} from '@app/globals/store';
import {EpisodeDetailsScreenRouteProp} from '@app/globals/types';
import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai/react';
import {selectAtom} from 'jotai/utils';
import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TextInput,
} from 'react-native';

export default function EpisodeDetails({
  route,
}: {
  route: EpisodeDetailsScreenRouteProp;
}) {
  const navigation = useNavigation();
  const [episodeDetails] = useAtom(
    React.useMemo(
      () =>
        selectAtom(episodesAtom, episodes =>
          episodes.find(episode => episode.id === route.params.id),
        ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    ),
  );

  React.useEffect(() => {
    navigation.setOptions({title: episodeDetails?.name});
  }, [navigation, episodeDetails]);

  return (
    <View style={styles.container}>
      <Text
        style={
          styles.episode
        }>{`${episodeDetails?.episode}: ${episodeDetails?.name}`}</Text>
      <Text style={styles.airDate}>{`${episodeDetails?.air_date}`}</Text>
      <View style={styles.charactersContainer}>
        <Text style={styles.charactersLabel}>Characters</Text>

        <FlatList
          horizontal
          data={episodeDetails?.characters || []}
          renderItem={({item}) => <CharacterAvatar characterUrl={item} />}
        />
      </View>
      <Text style={styles.commentsLabel}>Comments</Text>
      <TextInput style={styles.nameField} />
      <TextInput style={styles.emailField} />
      <TextInput style={styles.commentsField} />
      <Button title="Enviar" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginTop: 16,
  },
  episode: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  airDate: {
    marginBottom: 12,
  },
  charactersContainer: {
    marginBottom: 12,
  },
  charactersLabel: {marginBottom: 10, fontWeight: 'bold'},
  commentsLabel: {marginBottom: 10, fontWeight: 'bold'},
  nameField: {},
});
