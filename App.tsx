import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";
import Splash from "./screens/Splash";
import Layout from "./screens/authentication/Layout";
import { DataProvider } from "./providers/DataProvider";
LogBox.ignoreAllLogs();

export type RootStackParamList = {
  splash_screen: undefined;
  auth_layout: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();
const App = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="splash_screen"
          screenOptions={{ headerTitle: "", headerShown: false }}
        >
          <Stack.Screen name="splash_screen" component={Splash} />
          <Stack.Screen
            name="auth_layout"
            component={Layout}
            options={{ gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
};
export default App;
