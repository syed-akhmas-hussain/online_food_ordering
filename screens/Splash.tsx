import React, { useEffect } from "react";
import { Text, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDataContext } from "../providers/DataProvider";

type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "splash_screen"
>;

const Splash = ({ navigation }: SplashScreenProps) => {
  const { data } = useDataContext();
  useEffect(() => {
    if (!data.loading) {
      const timer = setTimeout(() => {
        navigation.replace("auth_layout");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [navigation, data.loading]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/icon.png")} style={styles.image} />
      <Text style={styles.text}>Hard times create strong men</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    color: "#ffffff",
  },
});

export default Splash;
