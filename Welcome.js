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

export function WelcomeUi({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formArea}>

        <View>
          <Image source={require("./assets/img/welcome.png")} style={{width: 500, height: 450}}/>
        </View>

        <View style={styles.welcomeFooter}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.welcomeDescription}>Get started by logging into your account</Text>
          <Pressable onPress={signIn} style={styles.btnPrimary}>
            <Text style={styles.btnText}>{"Get Start"}</Text>
          </Pressable>
        </View>

        {/* <View>
          <Pressable onPress={signUp}  style={styles.btnAsh}>
            <Text style={styles.btnAshText}>{"Sign Up"}</Text>
          </Pressable>
        </View> */}

      </View>
    </SafeAreaView>
  );

  function signUp(){
    navigation.navigate("Sign Up");
  }

  function signIn() {

    navigation.navigate("Sign In");

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    alignItems:"center",
    justifyContent: "flex-end",
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
    borderRadius:15,
    paddingLeft:10
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
  mainText:{
    fontSize:16
  },
  btnPrimary: {
    backgroundColor: "#427DDE",
    Text: "center",
    borderRadius: 100,
    width: 360,
    alignItems: "center",
    height:45,
    marginBottom:10,
    marginTop:10
  },
  btnAsh: {
    backgroundColor: "#D5D8DC",
    Text: "center",
    borderRadius: 100,
    width: 360,
    alignItems: "center",
    height:45,
    marginBottom:10
  },
  btnAshText:{
    padding: 6,
    fontSize: 17,
    fontWeight: "bold",
    color: "#2C3E50",
    marginTop:4,
  },
  btnText: {
    padding: 6,
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    marginTop:4,
  },
  welcomeFooter:{
    alignItems:"center"
  },
  welcomeText:{
    fontSize:25,
    fontWeight:"900",
    color:"#427dde"
  },
  welcomeDescription:{
    color:"#808B96"
  }
});
