import { useLinkProps } from "@react-navigation/native";
import { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

//tuketashitayatu
// var uname = "";
// export function set_uname(e) {uname = e; }
// export function get_uname() {return uname;}

const sendText = async (phoneNumber) => {
  console.log("phoneNumber: ", phoneNumber);
  await fetch("https://dev.stedi.me/twofactorlogin/" + phoneNumber, {
    method: "POST",
    headers: {
      "content-type": "application/text",
    },
  });
};

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

  const getToken = async ({
    phoneNumber,
    oneTimePassword,
    setUserLoggedIn,
  }) => {
    const tokenResponse = await fetch("https://dev.stedi.me/twofactorlogin", {
      method: "POST",
      body: JSON.stringify({ oneTimePassword, phoneNumber }),
      headers: {
        "content-type": "application/json",
      },
    });

    const responseCode = tokenResponse.status; //200 means logged in successfully
    console.log("Response Status Code", responseCode);
    //add
    //set_uname(loggedInUser)
    if (responseCode == 200) {
      setUserLoggedIn(true);
    }

    const tokenResponseString = await tokenResponse.text();
    console.log("Token", tokenResponse);

    const emailResponse = await fetch(
      "https://dev.stedi.me/validate/" + tokenResponseString
    );
    const email = await emailResponse.text();
    props.setUserName(email);
  };

  return (
    <SafeAreaView style={styles.margin}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="208-206-7783"
        placeholderTextColor="#10278C"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          sendText(phoneNumber);
        }}
      >
        <Text>Send Text </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        placeholderTextColor="#10278C"
        keyboardType="numeric"
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          getToken({
            phoneNumber,
            oneTimePassword,
            setUserLoggedIn: props.setUserLoggedIn,
            setUserName: props.setUserName,
          });
        }}
      >
        <Text>Log in </Text>
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
    marginTop: 250,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

export default Login;
