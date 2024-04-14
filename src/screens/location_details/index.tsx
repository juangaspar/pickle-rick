import * as React from 'react';
import {locationsAtom} from '@app/globals/store';
import {LocationDetailsScreenRouteProp} from '@app/globals/types';
import {useAtom} from 'jotai/react';
import {selectAtom} from 'jotai/utils';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CharacterAvatar from '@app/components/CharacterAvatar';

export default function LocationDetails({
  route,
}: {
  route: LocationDetailsScreenRouteProp;
}) {
  const navigation = useNavigation();
  const [locationDetails] = useAtom(
    React.useMemo(
      () =>
        selectAtom(locationsAtom, locations =>
          locations.find(location => location.id === route.params.id),
        ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    ),
  );

  React.useEffect(() => {
    navigation.setOptions({title: locationDetails?.name});
  }, [navigation, locationDetails]);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{`${locationDetails?.name}`}</Text>
      <Text style={styles.dimension}>{`${locationDetails?.dimension}`}</Text>
      <View>
        <Text style={styles.charactersLabel}>Residents</Text>

        <FlatList
          horizontal
          data={locationDetails?.residents || []}
          renderItem={({item}) => <CharacterAvatar characterUrl={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginTop: 16,
  },
  name: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  dimension: {
    marginBottom: 12,
  },
  charactersLabel: {marginBottom: 10, fontWeight: 'bold'},
});
