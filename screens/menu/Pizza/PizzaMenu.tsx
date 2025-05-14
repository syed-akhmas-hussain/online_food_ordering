import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PizzaStackParamList } from "./PizzaStack";
import { pizza } from "../../../types";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDataContext } from "../../../providers/DataProvider";

type PizzaMenuScreenProps = NativeStackScreenProps<
  PizzaStackParamList,
  "pizza_menu"
>;
const { width } = Dimensions.get("window");
const PizzaMenu = ({ navigation }: PizzaMenuScreenProps) => {
  const { data } = useDataContext();
  const insets = useSafeAreaInsets();

  if (data.loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </SafeAreaView>
    );
  }
  if (data.err) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>{data.err}</Text>
      </SafeAreaView>
    );
  }
  const handleRenderItem = ({ item }: { item: pizza }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("pizza_detail", item)}
        style={styles.cardContainer}
      >
        <View>
          <Image source={{ uri: item.Image }} style={styles.image} />
          <Text style={[styles.text, { fontWeight: "bold" }]}>
            {" "}
            {item.PizzaName}{" "}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          paddingBottom: insets.bottom + 100,
          paddingTop: insets.top + 20,
          width: width * 0.85,
        }}
      >
        <FlatList
          data={data.pizza_data}
          renderItem={handleRenderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 5,
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    height: 200,
  },
  cardContainer: {
    width: "48%",
    borderWidth: 2,
    borderColor: "#4d4d4d",
    marginBottom: 10,
    borderRadius: 5,
  },
});
export default PizzaMenu;
