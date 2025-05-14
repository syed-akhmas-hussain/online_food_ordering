import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
export type ButtonProps = {
  text?: string;
  iconName?: string;
  onPress: () => void;
};
const MyButton = ({ text, onPress, iconName }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}> {text} </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3C99DC",
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 10,
    paddingBottom: 15, 
    paddingHorizontal: 20,
    alignSelf: 'center',
    minWidth: 150
  },
  text: {
    marginTop: 5,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
    fontWeight: '500'
  },
});
export default MyButton;
