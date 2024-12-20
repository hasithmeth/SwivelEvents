import { Formik } from 'formik';
import React, { useRef } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';
import icons from '../../assets/icons';
import Button from '../../components/Button';
import RestorePassword from '../../components/RestorePassword';
import TextInput from '../../components/TextInput';
import Welcome from '../../components/Welcome';
import { SCREENS } from '../../config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { WelcomeStackProps } from '../../navigation/WelcomeStack';
import { selectAuth, signIn } from '../../store/slices/authSlice';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

interface ILogin {
  navigation: WelcomeStackProps;
}

const Login: React.FC<ILogin> = ({ navigation }) => {
  const txtEmailRef = useRef<RNTextInput>(null);
  const txtPasswordRef = useRef<RNTextInput>(null);

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(selectAuth);

  const insets = useSafeAreaInsets();

  const handleEmailSubmit = () => {
    txtPasswordRef.current?.focus();
  };

  const handleLogin = (values: { email: string; password: string }) => {
    dispatch(signIn(values));
  };

  const handleSignupPress = () => {
    navigation.replace(SCREENS.SIGNUP);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      validateOnBlur
      onSubmit={handleLogin}
      initialValues={{ email: '', password: '' }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.welcomeComponent}>
              <Welcome subTitle={'Welcome to your Portal'} />
            </View>
            <View style={styles.inputComponent}>
              <TextInput
                label={'Email'}
                icon={icons.email_icon}
                autoCorrect={false}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                ref={txtEmailRef}
                onSubmitEditing={handleEmailSubmit}
                returnKeyType={'next'}
                mode={'credentials'}
                value={values.email}
                onChangeText={handleChange('email')}
                onChangeFocus={handleBlur('email')}
                error={touched.email && errors.email}
                accessibilityLabel={'Email'}
              />
              <View style={styles.divider} />
              <TextInput
                label={'Password'}
                isPassword
                icon={icons.lock_icon}
                autoCorrect={false}
                autoCapitalize={'none'}
                keyboardType={'ascii-capable'}
                ref={txtPasswordRef}
                returnKeyType={'go'}
                mode={'credentials'}
                value={values.password}
                onChangeText={handleChange('password')}
                onChangeFocus={handleBlur('password')}
                error={touched.password && errors.password}
                accessibilityLabel={'Password'}
              />
              <View style={styles.divider} />
              <View style={styles.restorePasswordComponent}>
                <RestorePassword />
              </View>
            </View>
            <View style={styles.buttonComponent}>
              <Button
                label={'Login'}
                onPress={handleSubmit}
                disabled={!isValid}
                activity={isLoading}
              />
              <View style={styles.divider} />
              <Button
                label={'Sign Up'}
                onPress={handleSignupPress}
                disabled={isLoading}
              />
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  divider: {
    height: 16,
  },
  welcomeComponent: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    bottom: 32,
  },
  inputComponent: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  buttonComponent: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  restorePasswordComponent: {
    alignItems: 'flex-end',
  },
});
