import { MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useAuthContext } from "../../providers/AuthProvider";

const CustomeDrawer = (props: any) => {
  const { navigation } = props;
  const { setLogin } = useAuthContext();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sign Out"
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "auth_layout" }],
          });
          setLogin((prev) => !prev);
        }}
        icon={() => <MaterialIcons name="logout" size={24} color="red" />}
        labelStyle={{ color: "red", fontWeight: "bold" }}
      />
    </DrawerContentScrollView>
  );
};
export default CustomeDrawer;
