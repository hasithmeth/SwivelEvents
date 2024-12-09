import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

class FirebaseMessagingService {
  static async initialize(): Promise<void> {
    try {
      // console.log('[FirebaseMessagingService] Initializing...');

      // Request permissions for notifications
      const hasPermission = await this.requestPermission();
      if (!hasPermission) {
        // console.warn(
        //   '[FirebaseMessagingService] Notification permission denied.',
        // );
        return;
      }

      // Get the current token and upload it to the database
      const currentToken = await messaging().getToken();
      if (currentToken) {
        await this.updateTokenInDatabase(currentToken);
      } else {
        // console.warn('[FirebaseMessagingService] No FCM token available.');
      }

      // Listen for token refresh
      messaging().onTokenRefresh(async newToken => {
        // console.log('[FirebaseMessagingService] Token refreshed:', newToken);
        await this.updateTokenInDatabase(newToken);
      });

      // Set up handlers for notifications
      await this.createNotificationChannel();
      this.setupNotificationHandlers();

      // console.log('[FirebaseMessagingService] Initialized successfully.');
    } catch (error) {
      // console.error('[FirebaseMessagingService] Initialization failed:', error);
    }
  }

  private static async requestPermission(): Promise<boolean> {
    if (Platform.OS === 'android') {
      // Android 13 and above require explicit POST_NOTIFICATIONS permission
      if (Platform.Version >= 33) {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Notification Permission',
            message: 'This app needs permission to show notifications.',
            buttonPositive: 'Allow',
            buttonNegative: 'Deny',
          },
        );
        return permission === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        // For Android versions < 13, permission is granted by default at install
        return true;
      }
    } else {
      // For iOS, use Firebase Messaging's requestPermission method
      const authStatus = await messaging().requestPermission();
      return (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      );
    }
  }

  private static async updateTokenInDatabase(token: string): Promise<void> {
    const userId = auth().currentUser?.uid;
    if (!userId) {
      // console.warn(
      //   '[FirebaseMessagingService] User not authenticated. Token will not be saved.',
      // );
      return;
    }

    try {
      await database().ref(`subscribers/${userId}`).set({ token });
      // console.log('[FirebaseMessagingService] Token updated in database.');
    } catch (error) {
      // console.error(
      //   '[FirebaseMessagingService] Failed to update token in database:',
      //   error,
      // );
    }
  }

  private static async removeTokenFromDatabase(): Promise<void> {
    const userId = auth().currentUser?.uid;
    if (!userId) {
      // console.warn(
      //   '[FirebaseMessagingService] User not authenticated. Token cannot be removed.',
      // );
      return;
    }

    try {
      await database().ref(`subscribers/${userId}`).remove();
      // console.log('[FirebaseMessagingService] Token removed from database.');
    } catch (error) {
      // console.error(
      //   '[FirebaseMessagingService] Failed to remove token from database:',
      //   error,
      // );
    }
  }

  private static async createNotificationChannel(): Promise<void> {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
    // console.log('[FirebaseMessagingService] Notification channel created.');
  }

  private static setupNotificationHandlers(): void {
    // Handle foreground notifications
    messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        // console.log(
        //   '[FirebaseMessagingService] Foreground notification received:',
        //   remoteMessage,
        // );
        await this.displayNotification(remoteMessage);
      },
    );

    // Handle background notifications
    messaging().setBackgroundMessageHandler(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        // console.log(
        //   '[FirebaseMessagingService] Background notification received:',
        //   remoteMessage,
        // );
        await this.displayNotification(remoteMessage);
      },
    );

    // Handle notification interactions
    notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.PRESS:
          console.log(
            '[FirebaseMessagingService] Notification pressed:',
            detail.notification,
          );
          // Handle navigation or other actions here
          break;
        default:
          break;
      }
    });

    // Handle notification interactions in the background
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      switch (type) {
        case EventType.PRESS:
          console.log(
            '[FirebaseMessagingService] Background notification pressed:',
            detail.notification,
          );
          break;
        default:
          break;
      }
    });
  }

  private static async displayNotification(
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ): Promise<void> {
    const { notification, data } = remoteMessage;

    if (notification) {
      await notifee.displayNotification({
        title: notification.title,
        body: notification.body,
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'default',
          },
        },
        data,
      });
      // console.log('[FirebaseMessagingService] Notification displayed.');
    } else {
      // console.warn(
      //   '[FirebaseMessagingService] No notification payload available.',
      // );
    }
  }

  /**
   * Not used in this project, but can be called when the user logs out.
   */
  static async handleLogout(): Promise<void> {
    await this.removeTokenFromDatabase();
    console.log('[FirebaseMessagingService] User logged out, token removed.');
  }
}

export default FirebaseMessagingService;
