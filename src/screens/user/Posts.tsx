import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface IPosts {}

const Posts: React.FC<IPosts> = () => {
  return (
    <View style={styles.container}>
      <Text>Posts</Text>
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
