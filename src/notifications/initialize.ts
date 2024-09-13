import * as Notifications from "expo-notifications";
import schedulePokemonOfTheDayNotification from "./triggers/schedulePokemonOfTheDayNotification";
import registerForPushNotificationsAsync from "./utils/registerForPushNotificationsAsync";
import setNextRandomPokemonUrl from "./utils/getRandomPokemonUrl";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

(async () => {
  await setNextRandomPokemonUrl();
  await registerForPushNotificationsAsync();
  await schedulePokemonOfTheDayNotification();
})();
