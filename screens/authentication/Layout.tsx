import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./SignUp";
import DrawerLayout from "../asideBar/Layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { AuthProvider } from "../../providers/AuthProvider";
import SignIn from "./SignIn";
import { StyleSheet } from "react-native";
import { SearchTextProvider } from "../CustomBottomTabBar/SearchTextProvider";

export type AuthStackParamList = {
  sign_in: undefined;
  sign_up: undefined;
  drawer_nav: undefined;
};
type LayoutProps = NativeStackScreenProps<RootStackParamList, "auth_layout">;
const Stack = createStackNavigator<AuthStackParamList>();
const Layout = ({ navigation }: LayoutProps) => {
  return (
    <AuthProvider>
      <SearchTextProvider>
        <Stack.Navigator initialRouteName="sign_in">
          <Stack.Screen
            name="sign_in"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="sign_up"
            component={SignUp}
            options={{ headerTitle: "" }}
          />
          <Stack.Screen
            name="drawer_nav"
            component={DrawerLayout}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </SearchTextProvider>
    </AuthProvider>
  );
};
const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "#ffffff",
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  headerLeftContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10, // Adjust spacing from the left
  },
});
export default Layout;
