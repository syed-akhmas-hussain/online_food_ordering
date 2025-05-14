import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MandiStackParamList } from "./MAndiStack";
import { Mandi } from "../../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDataContext } from "../../../providers/DataProvider";

type MandiMenuScreenProps = NativeStackScreenProps<
  MandiStackParamList,
  "mandiMenu"
>;
const { width } = Dimensions.get("window");
const MandiMenu = ({ navigation }: MandiMenuScreenProps) => {
  const { data } = useDataContext();
  const insets = useSafeAreaInsets();

  const handleRenderItem = ({ item }: { item: Mandi }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("mandiDetails", { item: item })}
        style={s.cardContainer}
      >
        <View>
          <Image source={{ uri: item.Image }} style={s.image} />
          <Text style={[s.text, { fontWeight: "bold" }]}>
            {" "}
            {item.MandiName}{" "}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  if (data.loading) {
    return (
      <SafeAreaView style={s.container}>
        <Text style={s.text}>Loading...</Text>
      </SafeAreaView>
    );
  }
  if (data.err) {
    return (
      <SafeAreaView style={s.container}>
        <Text style={s.text}> {data.err} </Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={s.container}>
      <View
        style={{
          paddingBottom: insets.bottom + 100,
          paddingTop: insets.top + 20,
          width: width * 0.85,
        }}
      >
        <FlatList
          data={data.mandi_data}
          renderItem={handleRenderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </View>
    </SafeAreaView>
  );
};
const s = StyleSheet.create({
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 5,
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
export default MandiMenu;
