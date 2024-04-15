import * as React from 'react';
import {locationsAtom} from '@app/globals/store';
import {LocationDetailsScreenRouteProp} from '@app/globals/types';
import {useAtom} from 'jotai/react';
import {selectAtom} from 'jotai/utils';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import CharacterAvatar from '@app/components/CharacterAvatar';
import {useTranslation} from 'react-i18next';

export default function LocationDetails({
  route,
}: {
  route: LocationDetailsScreenRouteProp;
}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
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
      <Text
        style={{
          ...styles.name,
          color: colors.text,
        }}>{`${locationDetails?.name}`}</Text>
      <Text
        style={{
          ...styles.dimension,
          color: colors.text,
        }}>{`${locationDetails?.dimension}`}</Text>
      <View>
        <Text
          style={{
            ...styles.charactersLabel,
            color: colors.text,
          }}>
          {t('residents')}
        </Text>

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
