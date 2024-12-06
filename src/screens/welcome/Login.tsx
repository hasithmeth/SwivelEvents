import React, { useRef } from 'react';
import { TextInput as RNTextInput, StyleSheet, View } from 'react-native';
import icons from '../../assets/icons';
import TextInput from '../../components/TextInput';

const Login: React.FC = () => {
  const txtEmailRef = useRef<RNTextInput>(null);
  const txtPasswordRef = useRef<RNTextInput>(null);

  const handleEmailSubmit = () => {
    txtPasswordRef.current?.focus();
  };

  return (
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
      />
    </View>
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
