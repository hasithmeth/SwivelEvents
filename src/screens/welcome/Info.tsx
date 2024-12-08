import { RouteProp } from '@react-navigation/native';
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
import InfoTitle from '../../components/InfoTitle';
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
