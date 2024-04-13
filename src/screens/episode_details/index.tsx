import {episodesAtom} from '@app/globals/store';
import {EpisodeDetailsScreenRouteProp} from '@app/globals/types';
import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai/react';
import {selectAtom} from 'jotai/utils';
import * as React from 'react';
import {View, Text} from 'react-native';

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
          episodes.find(episode => episode.id === route.params.episodeId),
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
      <Text>Home Screen</Text>
    </View>
  );
}
