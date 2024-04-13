import CharacterAvatar from '@app/components/CharacterAvatar';
import {episodesAtom} from '@app/globals/store';
import {EpisodeDetailsScreenRouteProp} from '@app/globals/types';
import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai/react';
import {selectAtom} from 'jotai/utils';
import * as React from 'react';
import {View, Text, FlatList} from 'react-native';

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
    <View>
      <Text>{`${episodeDetails?.episode}: ${episodeDetails?.name}`}</Text>
      <Text>{`${episodeDetails?.air_date}`}</Text>
      <View>
        <Text>Characters</Text>

        <FlatList
          horizontal
          data={episodeDetails?.characters || []}
          renderItem={({item}) => <CharacterAvatar characterUrl={item} />}
        />
      </View>
    </View>
  );
}
