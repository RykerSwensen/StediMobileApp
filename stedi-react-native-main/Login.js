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

const getToken = async ({ phoneNumber, oneTimePassword, setUserLoggedIn }) => {
  const tokenResponse = await fetch("https://dev.stedi.me/twofactorlogin", {
    method: "POST",
    body: JSON.stringify({ oneTimePassword, phoneNumber }),
    headers: {
      "content-type": "application/json",
    },
  });

  const responseCode = tokenResponse.status;
  console.log("Response Status Code", responseCode, setUserLoggedIn);
  if (responseCode == 200) {
    setUserLoggedIn(true);
  }

  const tokenResponseString = await tokenResponse.text();
  console.log(tokenResponseString);
  console.log("Token", tokenResponse);
};

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

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
          //getToken({
          // phoneNumber,
          //oneTimePassword,
          //setUserLoggedIn: props.setUserLoggedIn,
          //});
          props.setUserLoggedIn(true);
        }}
      >
        <Text>Login</Text>
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
