import CharacterAvatar from '@app/components/CharacterAvatar';
import {episodesAtom} from '@app/globals/store';
import {EpisodeDetailsScreenRouteProp} from '@app/globals/types';
import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai/react';
import {selectAtom} from 'jotai/utils';
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ScrollView,
  Alert,
} from 'react-native';

export default function EpisodeDetails({
  route,
}: {
  route: EpisodeDetailsScreenRouteProp;
}) {
  const navigation = useNavigation();
  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [commentField, setCommentField] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const onChangeName = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const newName = e.nativeEvent.text;
    setNameField(newName);
    checkForm(newName, emailField, commentField);
  };

  const onChangeEmail = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const newEmail = e.nativeEvent.text;
    setEmailField(newEmail);
    checkForm(nameField, newEmail, commentField);
  };

  const onChangeComment = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const newComment = e.nativeEvent.text;
    setCommentField(newComment);
    checkForm(nameField, emailField, newComment);
  };

  const checkForm = (name: string, email: string, comment: string) => {
    setIsSubmitEnabled(
      name.trim() !== '' && email.trim() !== '' && comment.trim() !== '',
    );
  };

  const submitForm = async () => {
    setIsSubmitting(true);

    try {
      await fetch('https://661b7d5165444945d04f9696.mockapi.io/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameField,
          email: emailField,
          comment: commentField,
        }),
      });

      setNameField('');
      setEmailField('');
      setCommentField('');
      setIsSubmitEnabled(false);
      Alert.alert('Tu comentario se ha enviado con éxito. Gracias.');
    } catch (error) {
      Alert.alert(
        'Ha ocurrido un error. Vuelve a enviar tu comentario de nuevo por favor.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
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
      <View style={styles.formContainer}>
        <Text style={styles.commentsLabel}>Comments</Text>
        <TextInput
          placeholder="Name"
          style={styles.nameField}
          value={nameField}
          onChange={onChangeName}
          editable={!isSubmitting}
        />
        <TextInput
          placeholder="Email"
          style={styles.emailField}
          value={emailField}
          onChange={onChangeEmail}
          editable={!isSubmitting}
        />
        <TextInput
          placeholder="Comments"
          style={styles.commentsField}
          multiline
          maxLength={500}
          numberOfLines={4}
          value={commentField}
          onChange={onChangeComment}
          editable={!isSubmitting}
        />
        <Button
          title={isSubmitting ? 'Enviando...' : 'Enviar'}
          disabled={!isSubmitEnabled || isSubmitting}
          onPress={submitForm}
        />
      </View>
    </ScrollView>
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
  formContainer: {
    marginRight: 16,
  },
  commentsLabel: {marginBottom: 10, fontWeight: 'bold'},
  nameField: {marginBottom: 6, backgroundColor: 'white', borderRadius: 4},
  emailField: {marginBottom: 6, backgroundColor: 'white', borderRadius: 4},
  commentsField: {
    marginBottom: 6,
    backgroundColor: 'white',
    borderRadius: 4,
  },
});
