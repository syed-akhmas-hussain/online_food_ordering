import {
  Text,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MyButton from "../../componenets/MyButton";
import { useAuthContext } from "../../providers/AuthProvider";

const Profile = () => {
  const { signupData, setSignUpData } = useAuthContext();
  const { name, email, contactNum } = signupData.userDetails;
  const isNull = !name && !email && !contactNum;
  const insets = useSafeAreaInsets();
  const headerHeight = 100;
  const screenHeight = Dimensions.get("window").height;
  const availableHeight = screenHeight - headerHeight;
  const handleUploadPress = () => {};
  const handleChangeText = (key: string | number, val: string | number) => {
    setSignUpData((prev) => {
      if (key in signupData.userDetails) {
        return {
          ...prev,
          userDetails: {
            ...prev.userDetails,
            [key]: val,
          },
        };
      }
      return {
        ...prev,
        [key]: val,
      };
    });
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          height: availableHeight,
        },
      ]}
    >
      <View style={styles.userImgCont}>
        <ImageBackground
          source={require("../../assets/usserimg.png")}
          style={styles.userImg}
          resizeMode="cover"
          imageStyle={{ backgroundColor: "transparent" }}
        >
          {/* <TextInput style={styles.textInput} /> */}
        </ImageBackground>
        <MyButton text="Upload Picture" onPress={handleUploadPress} />
      </View>
      {!isNull ? (
        <View style={styles.data}>
          <View style={styles.row}>
            <Text style={[styles.dataText, { fontWeight: "400" }]}>Name: </Text>
            <Text style={styles.dataText}> {name} </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.dataText, { fontWeight: "400" }]}>
              Email:{" "}
            </Text>
            <Text style={styles.dataText}> {email} </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.dataText, { fontWeight: "400" }]}>
              Contact Number:{" "}
            </Text>
            <Text style={styles.dataText}> +92{contactNum} </Text>
          </View>
        </View>
      ) : (
        <ScrollView>
          <View
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={styles.text}>Enter your details</Text>
            <View>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                placeholder="John Mark"
                style={styles.input}
                autoCapitalize="words"
                autoCorrect={false}
                value={String(signupData.userDetails.name)}
                onChangeText={(text) => handleChangeText("name", text)}
              />
            </View>

            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="example@gmail.com"
                value={String(signupData.userDetails.email)}
                onChangeText={(text) => handleChangeText("age", text)}
              />
            </View>

            <View>
              <Text style={styles.label}>Contact No.</Text>
              <TextInput
                style={styles.input}
                placeholder="03xx-xxxxxxx"
                keyboardType="number-pad"
                value={String(signupData.userDetails.contactNum)}
                onChangeText={(text) =>
                  handleChangeText("contactNum", Number(text))
                }
              />
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    minWidth: "90%",
    borderWidth: 2,
    borderRadius: 10,
  },
  data: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  dataText: {
    fontSize: 20,
    fontWeight: "300",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    width: "100%",
  },
  userImgCont: {
    marginBottom: 20,
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
  },
  userImg: {
    height: 200,
    width: 200,
    overflow: "hidden",
    borderWidth: 2,
    borderRadius: 100,
    marginBottom: 10,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 30,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 3,
    textAlign: "left",
    textAlignVertical: "center",
  },
  input: {
    borderColor: "grey",
    borderRadius: 5,
    borderWidth: 3,
    width: 300,
    marginBottom: 10,
  },
});
export default Profile;
