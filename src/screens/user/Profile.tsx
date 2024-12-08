import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import icons from '../../assets/icons';
import Button from '../../components/Button';
import InfoPanel from '../../components/InfoPanel';
import ProfileImage from '../../components/ProfileImage';
import { colors } from '../../config';
import { useAppSelector } from '../../hooks';
import { selectAuth } from '../../store/slices/authSlice';

interface IProfile {}

const Profile: React.FC<IProfile> = () => {
  const { user } = useAppSelector(selectAuth);

  const values = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    mailingAddress: user?.mailingAddress || '',
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          {user?.photoURL ? (
            <ProfileImage
              photoURL={user.photoURL}
              readonly
              customTopMargin={0}
            />
          ) : (
            <FastImage source={icons.user} style={styles.icon} />
          )}
        </View>
        <View style={styles.divider} />
        <InfoPanel values={values} />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          label={'Edit'}
          onPress={function (): void {
            throw new Error('Function not implemented.');
          }}
          noDirection
        />
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 76,
  },
  icon: {
    height: 24,
    width: 24,
  },
  imageContainer: {
    borderRadius: 100,
    overflow: 'hidden',
    height: 116,
    width: 116,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.profilePlaceholder,
    marginTop: 24,
  },
  divider: {
    height: 32,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    position: 'absolute',
    width: '100%',
    bottom: 32,
  },
});
