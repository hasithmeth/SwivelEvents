import React, { forwardRef, useState } from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';
import { FONT } from '../assets/fonts';
import icons from '../assets/icons';
import { colors } from '../config';

interface ICustomTextInput extends TextInputProps {
  label: string;
  icon?: Source;
  isPassword?: boolean;
  mode?: 'credentials' | 'default';
}

const TextInput = forwardRef<RNTextInput, ICustomTextInput>((props, ref) => {
  const { label, icon, isPassword, mode = 'default' } = props;

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleEyePress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const credentialsModeBorder = isFocused
    ? styles.containerCredentialsFocusedBorder
    : styles.containerCredentialsUnfocusedBorder;
  const defaultModeBorder = isFocused
    ? styles.containerFocusedBorder
    : styles.containerUnfocusedBorder;

  return (
    <View
      style={[
        styles.container,
        mode === 'credentials' ? credentialsModeBorder : defaultModeBorder,
      ]}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          isFocused ? styles.inputFocused : styles.inputUnfocused,
        ]}>
        {icon ? <FastImage source={icon} style={styles.icon} /> : null}
        <RNTextInput
          style={[
            styles.input,
            icon ? styles.inputPaddingWithIcon : styles.inputPaddingWithoutIcon,
          ]}
          secureTextEntry={isPassword && !passwordVisible}
          numberOfLines={1}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {isPassword ? (
          <TouchableWithoutFeedback onPress={handleEyePress}>
            <View style={styles.iconContainer}>
              <FastImage
                source={passwordVisible ? icons.eye_open : icons.eye_closed}
                style={styles.icon}
              />
            </View>
          </TouchableWithoutFeedback>
        ) : null}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
  },
  containerCredentialsFocusedBorder: {
    borderColor: colors.credentialsFocusedBorder,
  },
  containerCredentialsUnfocusedBorder: {
    borderColor: colors.credentialsUnfocusedBorder,
  },
  containerFocusedBorder: {
    borderColor: colors.focusedBorder,
  },
  containerUnfocusedBorder: {
    borderColor: colors.unfocusedBorder,
  },
  label: {
    fontFamily: FONT.NOTOSANS_MEDIUM,
    fontSize: 13,
    lineHeight: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  inputContainer: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  inputFocused: {
    backgroundColor: colors.inputBackdropFocused,
  },
  inputUnfocused: {
    backgroundColor: colors.inputBackdrop,
  },
  input: {
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 14,
    fontFamily: FONT.NOTOSANS_REGULAR,
    color: colors.textPrimary,
    flex: 1,
  },
  inputPaddingWithIcon: {
    paddingHorizontal: 12,
  },
  inputPaddingWithoutIcon: {
    paddingHorizontal: 0,
  },
  icon: {
    height: 20,
    width: 20,
  },
  iconContainer: {
    height: '100%',
    justifyContent: 'center',
  },
});

export default TextInput;
