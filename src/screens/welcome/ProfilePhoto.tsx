import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import ProfileImage from '../../components/ProfileImage';
import Welcome from '../../components/Welcome';
import { SCREENS } from '../../config';
import { InfoStackParamList, InfoStackProps } from '../../navigation/InfoStack';
import { RouteProp } from '@react-navigation/native';

type ProfilePhotoRouteProp = RouteProp<
  InfoStackParamList,
  SCREENS.PROFILE_PHOTO
>;

interface IProfilePhoto {
  navigation: InfoStackProps;
  route: ProfilePhotoRouteProp;
}

const ProfilePhoto: React.FC<IProfilePhoto> = ({ navigation, route }) => {
  const { photoURL: previousPhoto = '' } = route.params;

  const insets = useSafeAreaInsets();

  const [photoURL, setPhotoURL] = React.useState<string>('');
  const [activity, setActivity] = React.useState<boolean>(false);

  const handleSubmitPhoto = () => {
    navigation.navigate(SCREENS.INFO, { photoURL: photoURL || previousPhoto });
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
        <ProfileImage
          setActivity={setActivity}
          photoURL={photoURL || previousPhoto}
          setPhotoURL={setPhotoURL}
          activity={activity}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          label={'Next'}
          onPress={handleSubmitPhoto}
          disabled={activity}
        />
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
