import React, {useEffect, useState} from 'react';
import {useDebounce} from '@uidotdev/usehooks';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SearchBar from '@app/components/SearchBar';

export default function CustomList({
  ItemRow,
  useLoadService,
  detailsRoute,
}: {
  ItemRow: any;
  useLoadService: Function;
  detailsRoute: string;
}) {
  const navigation = useNavigation();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [items, loadMore, isLoading] = useLoadService();
  const [searchText, setSearchText] = useState<string | null>(null);
  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {}, [isLoading]);

  useEffect(() => {
    loadMore(debouncedSearchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchText]);

  const onPress = (id: string) => {
    navigation.navigate(detailsRoute, {id: id});
  };

  const onSearchChange = (text: string) => {
    setSearchText(text);
  };

  const onSearchClose = () => {
    setShowSearchBar(false);
    setSearchText('');
  };

  return (
    <>
      <FlatList
        ListFooterComponent={<View style={{height: 72}} />}
        data={items}
        onEndReached={() => {
          loadMore(debouncedSearchText);
        }}
        renderItem={({item}) => <ItemRow item={item} onPress={onPress} />}
      />
      {!showSearchBar && (
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => setShowSearchBar(true)}>
          <Image
            source={require('@app/assets/search.png')}
            style={styles.searchButtonIcon}
          />
        </TouchableOpacity>
      )}
      {showSearchBar && (
        <SearchBar onChange={onSearchChange} onClose={onSearchClose} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  searchButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff', // Background color for the inner container
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  searchButtonIcon: {
    width: 24,
    height: 24,
    tintColor: '#888888', // Color of the search and close icons
  },
});
