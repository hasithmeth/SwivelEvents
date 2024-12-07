import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface IEditProfile {}

const EditProfile: React.FC<IEditProfile> = () => {
  return (
    <View style={styles.container}>
      <Text>EditProfile</Text>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
