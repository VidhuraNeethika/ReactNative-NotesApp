import { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export function SignInUi({ navigation }) {
  

  async function asyncCall() {
    const asyncStore = await AsyncStorage.getItem("mobile");

    if (asyncStore != null) {
      navigation.navigate("My Notes");
    }
  }

  useFocusEffect(
    ()=>{
      asyncCall();
    }
  );

  const [getMobile, setMobile] = useState("");
  const [getPassword, setPassword] = useState("");

  const clearFields = (val) => {
    setMobile("");
    setPassword("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formArea}>
        <View>
          <Image
            source={require("./assets/img/loginBg.png")}
            style={{ width: 350, height: 250 }}
          />
        </View>

        <View>
          <Text style={styles.title}>Mobile Number</Text>
          <TextInput
            style={styles.inputField}
            value={getMobile}
            onChangeText={(text) => setMobile(text)}
            keyboardType="numeric"
            placeholder="Enter mobile number"
          />
        </View>

        <View>
          <Text style={styles.title}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.inputField}
            value={getPassword}
            onChangeText={(text) => setPassword(text)}
            placeholder="Enter your password"
          />
        </View>

        <View>
          <Pressable onPress={signIn} style={styles.btnPrimary}>
            <Text style={styles.btnText}>{"Sign In"}</Text>
          </Pressable>
        </View>

        <View>
          <Pressable onPress={signUp} style={styles.btnAsh}>
            <Text style={styles.btnAshText}>{"Sign Up"}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );

  function signUp() {
    navigation.navigate("Sign Up");
  }

  function signIn() {
    const details = {
      mobile: getMobile,
      password: getPassword,
    };

    fetch("http://10.0.2.2/MyNotes/sign-in.php", {
      method: "POST",
      body: JSON.stringify(details),
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        if (text == "Success") {
          clearFields(getMobile, getPassword);

          saveData();

          navigation.navigate("My Notes");
        } else {
          Alert.alert("Warning", text);
        }
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }

  async function saveData() {
    await AsyncStorage.setItem("mobile", getMobile);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  formArea: {
    flex: 1,
    backgroundColor: "white",
    width: 380,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  title: {
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
  inputField: {
    backgroundColor: "white",
    fontSize: 16,
    padding: 4,
    marginBottom: 5,
    height: 50,
    backgroundColor: "#EAECEE",
    borderRadius: 15,
    paddingLeft: 10,
  },
  dropDown: {
    marginTop: 10,
    marginBottom: 10,
    width: 360,
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#EAECEE",
  },
  mainText: {
    fontSize: 16,
  },
  btnPrimary: {
    backgroundColor: "#427DDE",
    Text: "center",
    borderRadius: 100,
    width: 360,
    alignItems: "center",
    height: 45,
    marginBottom: 10,
    marginTop: 10,
  },
  btnAsh: {
    backgroundColor: "#D5D8DC",
    Text: "center",
    borderRadius: 100,
    width: 360,
    alignItems: "center",
    height: 45,
    marginBottom: 10,
  },
  btnAshText: {
    padding: 6,
    fontSize: 17,
    fontWeight: "bold",
    color: "#2C3E50",
    marginTop: 4,
  },
  btnText: {
    padding: 6,
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    marginTop: 4,
  },
});
