import * as React from 'react';
import {locationsAtom} from '@app/globals/store';
import {LocationDetailsScreenRouteProp} from '@app/globals/types';
import {useAtom} from 'jotai/react';
import {selectAtom} from 'jotai/utils';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

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
    <View>
      <Text>{locationDetails?.name}</Text>
    </View>
  );
}
