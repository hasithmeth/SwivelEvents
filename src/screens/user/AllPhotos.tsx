import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface IAllPhotos {}

const AllPhotos: React.FC<IAllPhotos> = () => {
  return (
    <View style={styles.container}>
      <Text>AllPhotos</Text>
    </View>
  );
};

export default AllPhotos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
