import React, { useRef } from 'react';
import { TextInput as RNTextInput, StyleSheet, View } from 'react-native';
import icons from '../../assets/icons';
import TextInput from '../../components/TextInput';
import * as yup from 'yup';
import { Formik } from 'formik';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const Login: React.FC = () => {
  const txtEmailRef = useRef<RNTextInput>(null);
  const txtPasswordRef = useRef<RNTextInput>(null);

  const handleEmailSubmit = () => {
    txtPasswordRef.current?.focus();
  };

  const handleSubmit = (values: { email: string; password: string }) => {
    console.log(values);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      validateOnBlur
      onSubmit={handleSubmit}
      initialValues={{ email: '', password: '' }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
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
        </View>
      )}
    </Formik>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  divider: {
    height: 16,
  },
});
