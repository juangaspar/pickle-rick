import React, {useEffect, useState} from 'react';
import {useAtom} from 'jotai';
import {FlatList, Text, View} from 'react-native';
import {locationsAtom} from '@app/globals/store';
import LocationRow from '@app/components/LocationRow';
import {GetLocationsRequestResult} from '@app/globals/types';
import {useNavigation} from '@react-navigation/native';

export default function LocationList() {
  const navigation = useNavigation();
  const [locations, setLocations] = useAtom(locationsAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getLocations = async (page: number) => {
    setIsLoading(true);
    try {
      const response: Response = await fetch(
        `https://rickandmortyapi.com/api/location?page=${page}`,
      );
      const result: GetLocationsRequestResult = await response.json();
      setLocations(result.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLocations(currentPage);
  }, [currentPage]);

  const onPress = (id: string) => {
    navigation.navigate('LocationDetails', {locationId: id});
  };

  return (
    <View>
      <FlatList
        data={locations}
        renderItem={({item}) => (
          <LocationRow location={item} onPress={onPress} />
        )}
      />
    </View>
  );
}
