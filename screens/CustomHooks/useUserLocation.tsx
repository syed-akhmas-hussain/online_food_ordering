import { useEffect, useState } from "react";
import { Alert, Linking, AppState } from "react-native";
import * as Location from "expo-location";
import { locationType } from "../../types";

const useUserLocationHook = () => {
  const [userLocation, setUserLocation] = useState<locationType>({latitude: 0, longitude: 0});
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [readAbleAddr, setREadAbleAddr] = useState<
    Location.LocationGeocodedAddress[] | null
  >(null);

  const fetchUserLoc = async () => {
    try {
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { coords } = loc;
      const { latitude, longitude } = coords;
      setUserLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      const resp = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      setREadAbleAddr(resp);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };
  const requestPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      fetchUserLoc();
      setHasPermission(true);
    } else {
      setHasPermission(false);
      Alert.alert(
        "Location Permission Required",
        "Go to settings and allow location access for food delivery.",
        [{ text: "Open Settings", onPress: () => Linking.openSettings() }]
      );
    }
  };
  const checkPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status === "granted") {
      fetchUserLoc();
      setHasPermission(true);
      return;
    }
  };

  useEffect(() => {
    requestPermission();
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active" && !userLocation) {
        checkPermission();
      }
    });

    return () => subscription.remove();
  }, []);

  return { userLocation, hasPermission, readAbleAddr };
};

export default useUserLocationHook;
