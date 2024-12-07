import React from 'react';
import { StyleSheet } from 'react-native';
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONT } from '../../assets/fonts';

const ToastConfig = () => {
  const insets = useSafeAreaInsets();

  return {
    success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
      <BaseToast
        {...props}
        style={[styles.toast, { marginTop: insets.top }, styles.successToast]}
        text1Style={styles.text1}
        text2Style={styles.text2}
      />
    ),
    error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
      <ErrorToast
        {...props}
        style={[styles.toast, { marginTop: insets.top }, styles.errorTost]}
        text1Style={styles.text1}
        text2Style={styles.text2}
      />
    ),
  };
};

const styles = StyleSheet.create({
  errorTost: {
    borderLeftColor: 'red',
  },
  successToast: {
    borderLeftColor: 'green',
  },
  toast: {
    borderRadius: 8,
  },
  text1: {
    fontSize: 16,
    fontFamily: FONT.INTER_MEDIUM,
  },
  text2: {
    fontSize: 14,
    fontFamily: FONT.NOTOSANS_REGULAR,
  },
});

export default ToastConfig;
