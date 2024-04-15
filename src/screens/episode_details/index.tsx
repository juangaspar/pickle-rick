import CharacterAvatar from '@app/components/CharacterAvatar';
import {episodesAtom} from '@app/globals/store';
import {EpisodeDetailsScreenRouteProp} from '@app/globals/types';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useAtom} from 'jotai/react';
import {selectAtom} from 'jotai/utils';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
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

const COMMENT_MAX_LENGTH = 500;

export default function EpisodeDetails({
  route,
}: {
  route: EpisodeDetailsScreenRouteProp;
}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
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
      Alert.alert(t('commentSuccess'));
    } catch (error) {
      Alert.alert(t('commentError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          ...styles.episode,
          color: colors.text,
        }}>{`${episodeDetails?.episode}: ${episodeDetails?.name}`}</Text>
      <Text
        style={{
          ...styles.airDate,
          color: colors.text,
        }}>{`${episodeDetails?.air_date}`}</Text>
      <View style={styles.charactersContainer}>
        <Text
          style={{
            ...styles.charactersLabel,
            color: colors.text,
          }}>
          {t('characters')}
        </Text>

        <FlatList
          horizontal
          data={episodeDetails?.characters || []}
          renderItem={({item}) => <CharacterAvatar characterUrl={item} />}
        />
      </View>
      <View style={styles.formContainer}>
        <Text
          style={{
            ...styles.commentsLabel,
            color: colors.text,
          }}>
          {t('comments')}
        </Text>
        <TextInput
          placeholder={t('name')}
          placeholderTextColor={colors.text}
          style={{
            ...styles.nameField,
            color: colors.text,
            backgroundColor: colors.card,
          }}
          value={nameField}
          onChange={onChangeName}
          editable={!isSubmitting}
        />
        <TextInput
          placeholder={t('email')}
          placeholderTextColor={colors.text}
          style={{
            ...styles.emailField,
            color: colors.text,
            backgroundColor: colors.card,
          }}
          value={emailField}
          onChange={onChangeEmail}
          editable={!isSubmitting}
        />
        <View
          style={{
            ...styles.commentsFieldContainer,
            backgroundColor: colors.card,
          }}>
          <TextInput
            placeholder={t('comment')}
            placeholderTextColor={colors.text}
            style={{
              ...styles.commentsField,
              color: colors.text,
              backgroundColor: colors.card,
            }}
            multiline
            maxLength={COMMENT_MAX_LENGTH}
            numberOfLines={4}
            value={commentField}
            onChange={onChangeComment}
            editable={!isSubmitting}
          />
          <Text
            style={{
              ...styles.commentsFieldCounter,
              color: colors.text,
            }}>{`${commentField.length}/${COMMENT_MAX_LENGTH}`}</Text>
        </View>
        <Button
          title={isSubmitting ? `${t('sending')}...` : t('send')}
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
    marginBottom: 16,
  },
  commentsLabel: {marginBottom: 10, fontWeight: 'bold'},
  nameField: {marginBottom: 6, borderRadius: 4},
  emailField: {marginBottom: 6, borderRadius: 4},
  commentsFieldContainer: {
    marginBottom: 6,
    borderRadius: 4,
  },
  commentsField: {
    marginBottom: 16,
  },
  commentsFieldCounter: {
    position: 'absolute',
    right: 4,
    bottom: 4,
  },
});
