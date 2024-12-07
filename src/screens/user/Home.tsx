import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface IHome {}

const Home: React.FC<IHome> = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
