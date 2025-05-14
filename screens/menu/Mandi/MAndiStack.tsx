import { createStackNavigator } from "@react-navigation/stack";
import { Mandi } from "../../../types";
import MandiMenu from "./MandiMenu";
import MandiDetails from "./Mandi";
import { SafeAreaProvider } from "react-native-safe-area-context";

export type MandiStackParamList = {
  mandiMenu: undefined;
  mandiDetails: { item: Mandi };
};
const Stack = createStackNavigator<MandiStackParamList>();
const MandiStack = () => {
  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="mandiMenu">
        <Stack.Screen
          name="mandiMenu"
          component={MandiMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="mandiDetails"
          component={MandiDetails}
          options={{
            headerTitle: "",
            headerTintColor: "black",
            headerStyle: {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              elevation: 0,
            },
          }}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};
export default MandiStack;
