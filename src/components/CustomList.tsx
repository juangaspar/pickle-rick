import React, {useEffect, useState} from 'react';
import {useDebounce} from '@uidotdev/usehooks';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import SearchBar from '@app/components/SearchBar';
import {useTranslation} from 'react-i18next';

export default function CustomList({
  ItemRow,
  useLoadService,
  detailsRoute,
}: {
  ItemRow: any;
  useLoadService: Function;
  detailsRoute: string;
}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [items, loadMore, isLoading] = useLoadService();
  const [searchText, setSearchText] = useState<string | null>(null);
  const debouncedSearchText = useDebounce(searchText, 500);

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
      {items.length > 0 && (
        <FlatList
          ListFooterComponent={<View style={styles.listFooter} />}
          data={items}
          onEndReached={() => {
            loadMore(debouncedSearchText);
          }}
          renderItem={({item}) => <ItemRow item={item} onPress={onPress} />}
        />
      )}
      {items.length === 0 && (
        <View style={styles.noDataContainer}>
          <Text style={{color: colors.text}}>{t('noData')}</Text>
        </View>
      )}
      {isLoading && (
        <ActivityIndicator
          style={{
            ...styles.loadingIcon,
            backgroundColor: colors.card,
          }}
        />
      )}
      {!showSearchBar && (
        <TouchableOpacity
          style={{...styles.searchButton, backgroundColor: colors.card}}
          onPress={() => setShowSearchBar(true)}>
          <Image
            source={require('@app/assets/search.png')}
            style={{...styles.searchButtonIcon, tintColor: colors.text}}
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
  listFooter: {
    height: 72,
  },
  loadingIcon: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 48,
    height: 48,
    borderRadius: 8,
    opacity: 0.5,
  },
  searchButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  searchButtonIcon: {
    width: 24,
    height: 24,
  },
  noDataContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 16,
    fontSize: 18,
  },
});
