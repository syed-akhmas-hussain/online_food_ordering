import { createStackNavigator } from "@react-navigation/stack";
import PizzaMenu from "./PizzaMenu";
import PizzaDetails from "./Pizza";
import { pizza } from "../../../types";
import { SafeAreaProvider } from "react-native-safe-area-context";

export type PizzaStackParamList = {
  pizza_menu: undefined;
  pizza_detail: pizza;
};
const Stack = createStackNavigator<PizzaStackParamList>();
const PizzaStack = () => {
  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="pizza_menu">
        <Stack.Screen
          name="pizza_menu"
          component={PizzaMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="pizza_detail"
          component={PizzaDetails}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              elevation: 0,
            },
            headerTintColor: "black",
          }}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};
export default PizzaStack;
