import * as Notifications from "expo-notifications";
import schedulePokemonOfTheDayNotification from "./triggers/schedulePokemonOfTheDayNotification";
import registerForPushNotificationsAsync from "./utils/registerForPushNotificationsAsync";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

(async () => {
  try {
    await registerForPushNotificationsAsync();
    await schedulePokemonOfTheDayNotification();
  } catch (e) {
    console.error(e);
  }
})();
