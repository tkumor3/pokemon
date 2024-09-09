import * as LocationLib from "expo-location";
import { useState, useEffect, useSyncExternalStore } from "react";

import * as TaskManager from "expo-task-manager";

const LOCATION_TASK = "location-task";

let location: LocationLib.LocationObject | null = null;
let listeners: (() => void)[] = [];

export const locationStore = {
  setLocation(location: LocationLib.LocationObject) {
    location = location;
    emitChange();
  },
  subscribe(listener: () => void) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
      if (listeners.length === 0) {
        TaskManager.unregisterTaskAsync(LOCATION_TASK);
      }
    };
  },
  getSnapshot() {
    return location;
  },
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

TaskManager.defineTask(LOCATION_TASK, ({ data: { locations }, error }: any) => {
  if (error) {
    console.error(error);
    return;
  }
  location = locations[0];
  console.log(location);
  emitChange();
});

const requestPermissions = async () => {
  const { status: foregroundStatus } =
    await LocationLib.requestForegroundPermissionsAsync();
  if (foregroundStatus !== "granted") {
    throw new Error("Foreground permissions not granted");
  }
  await LocationLib.startLocationUpdatesAsync(LOCATION_TASK);
};

const useUserLocation = () => {
  const location = useSyncExternalStore(
    locationStore.subscribe,
    locationStore.getSnapshot
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await requestPermissions();
      } catch (error) {
        if (error instanceof Error) {
          setErrorMsg(error.message);
        } else {
          setErrorMsg("An unknown error occurred");
        }
      }
    })();
  }, []);

  return { location, errorMsg };
};
export default useUserLocation;
