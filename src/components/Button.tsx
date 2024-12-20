import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { FONT } from '../assets/fonts';
import icons from '../assets/icons';
import { colors } from '../config';

interface IButton {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  mode?: 'forward' | 'backward';
  activity?: boolean;
  noDirection?: boolean;
}

const Button: React.FC<IButton> = ({
  label,
  onPress,
  disabled,
  mode = 'forward',
  activity = false,
  noDirection = false,
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (!disabled) {
          onPress();
        }
      }}>
      {mode === 'forward' ? (
        <View
          style={[
            styles.container,
            disabled ? styles.disabledContainer : null,
          ]}>
          {activity ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <>
              <Text style={styles.label}>{label}</Text>
              {!noDirection ? (
                <FastImage source={icons.arrow_right} style={styles.icon} />
              ) : null}
            </>
          )}
        </View>
      ) : (
        <View
          style={[
            styles.container,
            styles.backContainer,
            disabled ? styles.disabledContainer : null,
          ]}>
          {!noDirection ? (
            <FastImage
              source={icons.arrow_back}
              style={[styles.icon, styles.iconBack]}
            />
          ) : null}
          <Text style={[styles.label, styles.labelBack]}>{label}</Text>
        </View>
      )}
    </TouchableWithoutFeedback>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 44,
    borderRadius: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backContainer: {
    backgroundColor: colors.inputBackdrop,
  },
  disabledContainer: {
    opacity: 0.8,
  },
  label: {
    fontFamily: FONT.NOTOSANS_SEMI_BOLD,
    lineHeight: 20,
    fontSize: 14,
    color: colors.white,
  },
  labelBack: {
    color: colors.textPrimary,
  },
  icon: {
    height: 20,
    aspectRatio: 1,
    marginLeft: 8,
  },
  iconBack: {
    marginLeft: 0,
    marginRight: 8,
  },
});
