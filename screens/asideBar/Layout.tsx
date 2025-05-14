import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "./Profile";
import MainScreen from "../Main";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../authentication/Layout";
import CustomHeader from "../CustomHeader/CustomHeader";
import { useRoute } from "@react-navigation/native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import CustomeDrawer from "./CustomeDrawer";

export type DrawerParamList = {
  main_screen: undefined;
  user_profile: undefined;
  sign_out: undefined;
  google_maps: undefined;
};
type DrawerLayoutScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "drawer_nav"
>;

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerLayout = ({ navigation }: DrawerLayoutScreenProps) => {
  const route = useRoute();
  return (
    <Drawer.Navigator
      initialRouteName="main_screen"
      screenOptions={{
        header: () => <CustomHeader currRoute={route.name} />,
      }}
      drawerContent={(props) => <CustomeDrawer {...props} />}
    >
      <Drawer.Screen
        name="user_profile"
        component={Profile}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="user-alt" size={size} color={color} />
          ),
          drawerLabel: "Profile",
        }}
      />
      <Drawer.Screen
        name="main_screen"
        component={MainScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
          drawerLabel: "Home",
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerLayout;
