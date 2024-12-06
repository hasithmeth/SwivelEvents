/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FONT } from '../../assets/fonts';

const Login: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 24,
          fontFamily: FONT.INTER_EXTRA_LIGHT,
        }}>
        Login
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
