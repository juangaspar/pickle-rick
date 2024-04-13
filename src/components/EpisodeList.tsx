import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import EpisodeRow from '@app/components/EpisodeRow';
import {useNavigation} from '@react-navigation/native';
import useEpisodesService from '@app/hooks/useEpisodesService';

export default function EpisodeList() {
  const navigation = useNavigation();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [episodes, loadMoreEpisodes, isLoading] = useEpisodesService();
  const [searchText, setSearchText] = useState<string | null>(null);

  useEffect(() => {}, [isLoading]);

  useEffect(() => {
    loadMoreEpisodes(searchText);
  }, [searchText]);

  const onPress = (id: string) => {
    navigation.navigate('EpisodeDetails', {episodeId: id});
  };

  const onSearchChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setSearchText(e.nativeEvent.text);
  };

  return (
    <>
      <FlatList
        ListFooterComponent={<View style={{height: 96}} />}
        data={episodes}
        onEndReached={() => {
          loadMoreEpisodes(searchText);
        }}
        renderItem={({item}) => <EpisodeRow episode={item} onPress={onPress} />}
      />
      {!showSearchBar && (
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
          onPress={() => setShowSearchBar(true)}>
          <Image
            source={require('@app/assets/search.png')}
            style={{width: 32, height: 32}}
          />
        </TouchableOpacity>
      )}
      {showSearchBar && <TextInput onChange={onSearchChange} />}
    </>
  );
}
