import * as LocationLib from "expo-location";
import { useState, useEffect, useRef } from "react";

const requestLocationPermission = async () => {
  let { status } = await LocationLib.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission to access location was denied");
  }
};

const useUserLocation = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [location, setLocation] = useState<LocationLib.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await requestLocationPermission();
        intervalRef.current = setInterval(async () => {
          const location = await LocationLib.getCurrentPositionAsync({});
          setLocation(location);
        }, 2000);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMsg(error.message);
        }
      }
    })();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { location, errorMsg };
};

export default useUserLocation;
