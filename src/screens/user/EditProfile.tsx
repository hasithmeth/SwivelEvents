/* eslint-disable react-native/no-inline-styles */
import { useKeyboard } from '@react-native-community/hooks';
import { Formik } from 'formik';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';
import Button from '../../components/Button';
import InfoPanel from '../../components/InfoPanel';
import ProfileImage from '../../components/ProfileImage';
import { SCREENS } from '../../config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { UserStackProps } from '../../navigation/UserStack';
import { selectAuth, updateUserProfile } from '../../store/slices/authSlice';

const validationSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email().required(),
  phone: yup.string(),
  mailingAddress: yup.string(),
});

interface IEditProfile {
  navigation: UserStackProps;
}

const EditProfile: React.FC<IEditProfile> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const auth = useAppSelector(selectAuth);

  const [photoURL, setPhotoURL] = React.useState<string>(
    auth.user?.photoURL || '',
  );
  const [activity, setActivity] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const keyboard = useKeyboard();

  const handleSubmitInfo = (values: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    mailingAddress: string;
  }) => {
    dispatch(updateUserProfile({ photoURL, ...values }));
    navigation.popTo(SCREENS.DRAWER);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      validateOnBlur
      onSubmit={handleSubmitInfo}
      initialValues={{
        firstName: auth.user?.firstName || '',
        lastName: auth.user?.lastName || '',
        email: auth.user?.email || '',
        phone: auth.user?.phone || '',
        mailingAddress: auth.user?.mailingAddress || '',
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container]}>
            <ScrollView
              contentContainerStyle={[
                styles.contentContainer,
                keyboard.keyboardShown
                  ? Platform.OS === 'ios'
                    ? { paddingBottom: 150 }
                    : { paddingBottom: 250 }
                  : {},
              ]}>
              <ProfileImage
                photoURL={photoURL}
                activity={activity}
                setActivity={setActivity}
                setPhotoURL={setPhotoURL}
                customTopMargin={24}
              />
              <View style={styles.divider} />
              <InfoPanel
                dividerHeight={24}
                values={values}
                //@ts-expect-error
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
            </ScrollView>
          </KeyboardAvoidingView>
          <View
            style={[styles.buttonContainer, { marginBottom: insets.bottom }]}>
            <Button
              label={'Save'}
              onPress={handleSubmit}
              disabled={!isValid || activity}
              activity={auth.isLoading}
              noDirection
            />
          </View>
        </>
      )}
    </Formik>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  horizontalDivider: {
    width: 10,
  },
  buttonSingleContainer: {
    flex: 1,
  },
});
