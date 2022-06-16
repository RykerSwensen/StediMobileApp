import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const sendText = async (phoneNumber) => {
  console.log("PhoneNumber: ", phoneNumber);
  await fetch("https://dev.stedi.me/twofactorlogin/" + phoneNumber, {
    method: "POST",
    headers: {
      "content-type": "application/text",
    },
  });
};

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);
  const [count, setCount] = useState(0);
  const onPress = () => setCount((prevCount) => prevCount + 1);

  return (
    <SafeAreaView style={styles.margin}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="801-555-1212"
        placeholderTextColor="#2d32c4"
      />
      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        placeholderTextColor="#2d32c4"
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("Login Button was clicked");
        }}
      >
        <Text>Press Here</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          sendText(phoneNumber);
        }}
      >
        <Text>Press Here to get Text</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  margin: {
    marginTop: 100,
  },

  button: {
    alignItems: "center",
    backgroundColor: "8c8888",
    padding: 10,
  },
});

export default Login;
