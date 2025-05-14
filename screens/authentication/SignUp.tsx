import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MyButton from "../../componenets/MyButton";
import { AuthStackParamList } from "./Layout";
import { useAuthContext } from "../../providers/AuthProvider";

type SingUpProps = NativeStackScreenProps<AuthStackParamList, "sign_up">;
const SignUp = ({ navigation }: SingUpProps) => {
  const { signupData, setSignUpData } = useAuthContext();
  const handlePress = () => {
    setSignUpData((prev) => ({
      ...prev,
      signup: true,
    }));
    navigation.navigate("sign_in");
  };
  const handleChangeText = (key: string | number, val: string | number) => {
    setSignUpData((prev) => {
      if (key in prev.userDetails) {
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
  console.log(signupData);
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
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
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="18"
            keyboardType="number-pad"
            value={String(signupData.age)}
            onChangeText={(text) => handleChangeText("age", Number(text))}
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

        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="example@gmail.com"
            value={String(signupData.userDetails.email)}
            onChangeText={(text) => handleChangeText("email", text)}
          />
        </View>

        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            value={signupData.pass1}
            onChangeText={(text) => handleChangeText("pass1", text)}
          />
        </View>

        <View>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            value={signupData.pass2}
            onChangeText={(text) => handleChangeText("pass2", text)}
          />
        </View>
        <View>
          {!signupData.userDetails.name ||
          !signupData.age ||
          !signupData.userDetails.email ||
          !signupData.pass1 ||
          !signupData.pass2 ? (
            <Text style={styles.label}>Fields are empty</Text>
          ) : signupData.pass1.length < 8 ? (
            <Text style={styles.label}>Password is too short</Text>
          ) : signupData.pass1 !== signupData.pass2 ? (
            <Text style={styles.label}>Passwords do not match</Text>
          ) : (
            <MyButton text="Sign Up" onPress={handlePress} />
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
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
export default SignUp;
