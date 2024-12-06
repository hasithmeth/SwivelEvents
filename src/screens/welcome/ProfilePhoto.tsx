import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import icons from '../../assets/icons';
import Button from '../../components/Button';
import Welcome from '../../components/Welcome';
import { colors, SCREENS } from '../../config';
import { WelcomeStackProps } from '../../navigation/WelcomeStack';

interface IProfilePhoto {
  navigation: WelcomeStackProps;
}

const ProfilePhoto: React.FC<IProfilePhoto> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const handleUploadPhoto = () => {
    /**
     * @todo Limit navigation to next screen without profile photo
     */
    navigation.navigate(SCREENS.INFO);
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}>
      <View style={styles.topContainer}>
        <Welcome
          subTitle={
            'You are logged in for the first time and can \nupload a profile photo'
          }
        />
        <View style={styles.imageContainer}>
          <FastImage source={icons.photo_camera} style={styles.icon} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button label={'Next'} onPress={handleUploadPhoto} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  imageContainer: {
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
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingBottom: 16,
  },
});

export default ProfilePhoto;
