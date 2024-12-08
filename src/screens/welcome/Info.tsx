import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';
import Button from '../../components/Button';
import InfoTitle from '../../components/InfoTitle';
import TextInput from '../../components/TextInput';
import { SCREENS } from '../../config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { InfoStackParamList, InfoStackProps } from '../../navigation/InfoStack';
import { selectAuth, updateUserProfile } from '../../store/slices/authSlice';

const validationSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email().required(),
  phone: yup.string(),
  mailingAddress: yup.string(),
});

type InfoRouteProp = RouteProp<InfoStackParamList, SCREENS.INFO>;

interface IInfo {
  navigation: InfoStackProps;
  route: InfoRouteProp;
}

const Info: React.FC<IInfo> = ({ navigation, route }) => {
  const { photoURL } = route.params;

  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  const txtLastNameRef = useRef<RNTextInput>(null);
  const txtEmailRef = useRef<RNTextInput>(null);
  const txtPhoneRef = useRef<RNTextInput>(null);
  const txtMailingAddressRef = useRef<RNTextInput>(null);

  const handleEmailSubmit = () => {
    txtPhoneRef.current?.focus();
  };

  const handlePhoneSubmit = () => {
    txtMailingAddressRef.current?.focus();
  };

  const handleLastNameSubmit = () => {
    txtEmailRef.current?.focus();
  };

  const handleFirstNameSubmit = () => {
    txtLastNameRef.current?.focus();
  };

  const handleSubmitInfo = (values: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    mailingAddress: string;
  }) => {
    dispatch(updateUserProfile({ photoURL, ...values }));
  };

  const handleGoBack = () => {
    navigation.popTo(SCREENS.PROFILE_PHOTO, { photoURL });
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
            style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <InfoTitle />
              <TextInput
                label={'First Name'}
                autoCorrect={false}
                autoCapitalize={'words'}
                keyboardType={'default'}
                onSubmitEditing={handleFirstNameSubmit}
                returnKeyType={'next'}
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onChangeFocus={handleBlur('firstName')}
                error={touched.firstName && errors.firstName}
              />
              <View style={styles.divider} />
              <TextInput
                label={'Last Name'}
                autoCorrect={false}
                autoCapitalize={'words'}
                keyboardType={'default'}
                ref={txtLastNameRef}
                onSubmitEditing={handleLastNameSubmit}
                returnKeyType={'next'}
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onChangeFocus={handleBlur('lastName')}
                error={touched.lastName && errors.lastName}
              />
              <View style={styles.divider} />
              <TextInput
                label={'Email'}
                autoCorrect={false}
                autoCapitalize={'words'}
                keyboardType={'default'}
                ref={txtEmailRef}
                onSubmitEditing={handleEmailSubmit}
                returnKeyType={'next'}
                value={values.email}
                onChangeText={handleChange('email')}
                onChangeFocus={handleBlur('email')}
                error={touched.email && errors.email}
              />
              <View style={styles.divider} />
              <TextInput
                label={'Phone number'}
                autoCorrect={false}
                autoCapitalize={'words'}
                keyboardType={'phone-pad'}
                ref={txtPhoneRef}
                onSubmitEditing={handlePhoneSubmit}
                returnKeyType={'next'}
                value={values.phone}
                onChangeText={handleChange('phone')}
                onChangeFocus={handleBlur('phone')}
                error={touched.phone && errors.phone}
                fontSize={16}
              />
              <View style={styles.divider} />
              <TextInput
                label={'Mailing address'}
                autoCorrect={false}
                autoCapitalize={'words'}
                keyboardType={'default'}
                ref={txtMailingAddressRef}
                returnKeyType={'go'}
                value={values.mailingAddress}
                onChangeText={handleChange('mailingAddress')}
                onChangeFocus={handleBlur('mailingAddress')}
                error={touched.mailingAddress && errors.mailingAddress}
                fontSize={16}
              />
              <View style={styles.divider} />
            </ScrollView>
          </KeyboardAvoidingView>
          <View
            style={[styles.buttonContainer, { marginBottom: insets.bottom }]}>
            <View style={styles.buttonSingleContainer}>
              <Button label={'Back'} onPress={handleGoBack} mode={'backward'} />
            </View>
            <View style={styles.horizontalDivider} />
            <View style={styles.buttonSingleContainer}>
              <Button
                label={'Next'}
                onPress={handleSubmit}
                disabled={!isValid}
                activity={auth.isLoading}
              />
            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  divider: {
    height: 24,
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
