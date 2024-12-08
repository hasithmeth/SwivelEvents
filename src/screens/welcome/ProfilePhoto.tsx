import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import ProfileImage from '../../components/ProfileImage';
import Welcome from '../../components/Welcome';
import { SCREENS } from '../../config';
import { InfoStackProps } from '../../navigation/InfoStack';

interface IProfilePhoto {
  navigation: InfoStackProps;
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
        <ProfileImage />
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
