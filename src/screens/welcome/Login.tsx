import { Formik } from 'formik';
import React, { useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as yup from 'yup';
import icons from '../../assets/icons';
import Button from '../../components/Button';
import RestorePassword from '../../components/RestorePassword';
import TextInput from '../../components/TextInput';
import Welcome from '../../components/Welcome';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const Login: React.FC = () => {
  const txtEmailRef = useRef<RNTextInput>(null);
  const txtPasswordRef = useRef<RNTextInput>(null);

  const insets = useSafeAreaInsets();

  const handleEmailSubmit = () => {
    txtPasswordRef.current?.focus();
  };

  const handleLogin = (values: { email: string; password: string }) => {
    console.log(values);
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
            />
            <View style={styles.divider} />
            <Button label={'Sign Up'} onPress={handleSubmit} />
          </View>
        </KeyboardAvoidingView>
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
