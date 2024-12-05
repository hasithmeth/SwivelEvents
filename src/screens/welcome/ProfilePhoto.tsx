import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const ProfilePhoto = () => {
  const handleUploadPhoto = () => {
    // Logic to handle photo upload
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Your Profile Photo</Text>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.profileImage}
      />
      <Button title="Upload Photo" onPress={handleUploadPhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
});

export default ProfilePhoto;
