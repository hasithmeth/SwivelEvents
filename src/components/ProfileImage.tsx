import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from '@env';
import axios from 'axios';
import { CloudinaryUploadResponse } from 'cloudinary';
import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import icons from '../assets/icons';
import { colors } from '../config';
import { useAppSelector } from '../hooks';
import { selectAuth } from '../store/slices/authSlice';

interface IProfileImage {
  photoURL: string;
  setPhotoURL: React.Dispatch<React.SetStateAction<string>>;
  activity: boolean;
  setActivity: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileImage: React.FC<IProfileImage> = ({
  photoURL,
  setPhotoURL,
  setActivity,
}) => {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const auth = useAppSelector(selectAuth);

  const uploadImage = async (uri: string) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'image/jpeg',
      name: auth.user?.uid || 'profile-photo',
    } as any);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post<CloudinaryUploadResponse>(
        CLOUDINARY_UPLOAD_URL,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            if (progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              setUploadProgress(progress);
            }
          },
        },
      );

      setSelectedProfile(response.data.secure_url);
      setPhotoURL(response.data.secure_url);
    } catch (error: any) {
      console.error('Upload Error:', error.response || error.message);
      Toast.show({
        type: 'error',
        text1: 'Upload Failed',
        text2: 'Failed to upload the image!',
      });
    } finally {
      setActivity(false);
    }
  };

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        height: 400,
        width: 400,
        cropping: true,
        mediaType: 'photo',
        cropperCircleOverlay: true,
      });

      if (image) {
        setActivity(true);
        uploadImage(image.path);
      }
    } catch (error) {}
  };

  return (
    <TouchableWithoutFeedback onPress={pickImage}>
      <View style={styles.container}>
        {uploadProgress > 1 ? (
          <AnimatedCircularProgress
            size={80}
            width={8}
            fill={uploadProgress}
            tintColor={colors.primary}
            onAnimationComplete={() => setUploadProgress(0)}
            backgroundColor={colors.profilePlaceholder}
          />
        ) : selectedProfile || photoURL ? (
          <FastImage
            source={{ uri: selectedProfile || photoURL }}
            style={styles.profileImage}
          />
        ) : (
          <FastImage source={icons.photo_camera} style={styles.icon} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  container: {
    height: 116,
    width: 116,
    backgroundColor: colors.profilePlaceholder,
    borderRadius: 100,
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 24,
    width: 24,
  },
  profileImage: {
    height: 116,
    width: 116,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
