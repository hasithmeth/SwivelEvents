import React, { useRef } from 'react';
import { TextInput as RNTextInput, StyleSheet, View } from 'react-native';
import TextInput from './TextInput';

interface IInfoPanel {
  dividerHeight: number;
  values: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    mailingAddress: string;
  };
  handleChange: (field: string) => (text: string) => void;
  handleBlur: (field: string) => void;
  errors: { [key: string]: string | undefined };
  touched: { [key: string]: boolean | undefined };
}

const InfoPanel: React.FC<IInfoPanel> = ({
  dividerHeight = 24,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
}) => {
  const txtLastNameRef = useRef<RNTextInput>(null);
  const txtEmailRef = useRef<RNTextInput>(null);
  const txtPhoneRef = useRef<RNTextInput>(null);
  const txtMailingAddressRef = useRef<RNTextInput>(null);

  const handleFirstNameSubmit = () => {
    txtLastNameRef.current?.focus();
  };

  const handleLastNameSubmit = () => {
    txtPhoneRef.current?.focus();
  };

  const handleEmailSubmit = () => {
    txtPhoneRef.current?.focus();
  };

  const handlePhoneSubmit = () => {
    txtMailingAddressRef.current?.focus();
  };

  const styles = StyleSheet.create({
    divider: {
      height: dividerHeight,
    },
  });

  return (
    <>
      <TextInput
        label={'First Name'}
        autoCorrect={false}
        autoCapitalize={'words'}
        keyboardType={'default'}
        onSubmitEditing={handleFirstNameSubmit}
        returnKeyType={'next'}
        value={values.firstName}
        onChangeText={text => handleChange('firstName')(text)}
        onChangeFocus={() => handleBlur('firstName')}
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
        onChangeText={text => handleChange('lastName')(text)}
        onChangeFocus={() => handleBlur('lastName')}
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
        onChangeText={text => handleChange('email')(text)}
        onChangeFocus={() => handleBlur('email')}
        error={touched.email && errors.email}
        readOnly
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
        onChangeText={text => handleChange('phone')(text)}
        onChangeFocus={() => handleBlur('phone')}
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
        onChangeText={text => handleChange('mailingAddress')(text)}
        onChangeFocus={() => handleBlur('mailingAddress')}
        error={touched.mailingAddress && errors.mailingAddress}
        fontSize={16}
      />
      <View style={styles.divider} />
    </>
  );
};

export default InfoPanel;
