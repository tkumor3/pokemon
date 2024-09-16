import * as Notifications from "expo-notifications";
import schedulePokemonOfTheDayNotification from "./triggers/schedulePokemonOfTheDayNotification";
import registerForPushNotificationsAsync from "./utils/registerForPushNotificationsAsync";
import { setNextRandomPokemonUrl } from "./utils/randomPokemonUrl";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

(async () => {
  try {
    await setNextRandomPokemonUrl();
    await registerForPushNotificationsAsync();
    await schedulePokemonOfTheDayNotification();
  } catch {}
})();
