import { StyleSheet, Keyboard } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Layout from "./menu/Layout";
import { DrawerParamList } from "./asideBar/Layout";
import { CartProvider } from "../providers/CartProvider";
import { Dimensions } from "react-native";
import MyTabBar from "./CustomBottomTabBar/MyTabBar";
import CartStackLayout from "./cart/CartStackLayout";
import { useEffect, useState } from "react";

type MainScreenProps = {
  navigation: DrawerNavigationProp<DrawerParamList, "main_screen">;
};

export type MainScreenTab = {
  menu: undefined;
  cart: undefined;
};
const { height, width } = Dimensions.get("window");

const Tab = createBottomTabNavigator<MainScreenTab>();
const MainScreen = ({ navigation }: MainScreenProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    const keyboardShowListner = Keyboard.addListener("keyboardDidShow", () => {
      setIsVisible(true);
    });
    const keyboardHideListner = Keyboard.addListener("keyboardDidHide", () => {
      setIsVisible(false);
    });
    return () => {
      keyboardHideListner.remove();
      keyboardShowListner.remove();
    };
  }, [navigation]);
  return (
    <CartProvider>
      <Tab.Navigator
        initialRouteName="menu"
        screenOptions={{
          headerShown: false,
          tabBarStyle: { height: isVisible ? 0 : 60 },
        }}
        tabBar={(props) => (isVisible ? null : <MyTabBar {...props} />)}
      >
        <Tab.Screen name="menu" component={Layout} />
        <Tab.Screen name="cart" component={CartStackLayout} />
      </Tab.Navigator>
    </CartProvider>
  );
};
const styles = StyleSheet.create({
  Tabcontainer: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#ffffff",
    backgroundColor: "rgba(255,255,255,0.3)",
    paddingHorizontal: 10,
    marginBottom: 15,
    width: width * 0.9,
    marginLeft: 20,
  },
});
export default MainScreen;
