import * as Notifications from "expo-notifications";

const schedulePokemonOfTheDayNotification = async () => {
  const scheduledNotifications =
    await Notifications.getAllScheduledNotificationsAsync();

  const hasScheduledNotification = scheduledNotifications.some(
    (notification) => notification.content.data.type === "pokemonOfTheDay"
  );

  if (!hasScheduledNotification) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Pokemon of the day!",
        body: "Discover a new pokemon.",
        data: {
          type: "pokemonOfTheDay",
        },
      },
      trigger: { seconds: 60 * 60, repeats: true, channelId: "default" },
    });
  }
};

export default schedulePokemonOfTheDayNotification;
