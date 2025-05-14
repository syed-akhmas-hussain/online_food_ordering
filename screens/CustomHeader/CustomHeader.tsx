import {
  DrawerActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { View, Text, Image, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface CustomHeaderProps {
  currRoute: string;
}

const CustomHeader = ({ currRoute }: CustomHeaderProps) => {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.headerView, { paddingTop: insets.top }]}>
      <View style={styles.headerIconAndText}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={{ paddingHorizontal: 10 }}
        >
          <Ionicons name="menu" size={28} color={"black"} />
        </TouchableOpacity>
        <Image source={require("../../assets/icon.png")} style={styles.img} />
        <Text style={styles.text}>Akhmas's Restaurant</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    width: 70,
    height: 100,
    resizeMode: "contain",
  },
  headerView: {
    justifyContent: "center",
    height: 150,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  headerIconAndText: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  text: {
    textAlign: "center",
    alignSelf: "center",
    color: "#ffffff",
    marginLeft: 10,
    fontSize: 25,
    fontWeight: "300",
  },
  input: {
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderRadius: 30,
    height: 50,
    width: "60%",
    marginBottom: 10,
  },
});
export default CustomHeader;
