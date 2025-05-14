import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PizzaStack from "./Pizza/PizzaStack";
import MandiStack from "./Mandi/MAndiStack";
import FeaturedItem from "./FeaturedItem";
export type MenuTopTab = {
  featured_item_screen: undefined;
  pizza_screen: undefined;
  mandi_screen: undefined;
};

const TopTab = createMaterialTopTabNavigator<MenuTopTab>();
const Layout = () => {
  return (
    <TopTab.Navigator
      initialRouteName="featured_item_screen"
      screenOptions={{
        tabBarLabelStyle: {
          fontWeight: "200",
          textAlign: "center",
          alignSelf: "baseline",
          fontSize: 17,
        },
        tabBarStyle: {
          height: 50,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          elevation: 0,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
        tabBarIndicatorStyle: {
          backgroundColor: "white",
          height: 5,
          borderRadius: 10,
        },
      }}
    >
      <TopTab.Screen
        name="featured_item_screen"
        component={FeaturedItem}
        options={{ title: "Featured" }}
      />
      <TopTab.Screen
        name="pizza_screen"
        component={PizzaStack}
        options={{ title: "Pizza" }}
      />
      <TopTab.Screen
        name="mandi_screen"
        component={MandiStack}
        options={{ title: "Mandi" }}
      />
    </TopTab.Navigator>
  );
};
export default Layout;
