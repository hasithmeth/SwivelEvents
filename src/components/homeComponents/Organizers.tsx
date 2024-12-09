import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, staticOrganizers } from '../../config';
import OrganizerCard from '../OrganizerCard';
import { FONT } from '../../assets/fonts';

const Organizers = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Organizers'}</Text>
      {staticOrganizers.map(({ name, email, image, id }, index, array) => (
        <OrganizerCard
          name={name}
          email={email}
          photoURL={image}
          key={id}
          noBorder={array.length === index + 1}
        />
      ))}
    </View>
  );
};

export default Organizers;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: FONT.INTER_SEMI_BOLD,
    fontSize: 22,
    lineHeight: 32,
    color: colors.textPrimary,
    marginBottom: 8,
  },
});
