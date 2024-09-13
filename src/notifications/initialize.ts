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
  await registerForPushNotificationsAsync();
  await schedulePokemonOfTheDayNotification();
})();
