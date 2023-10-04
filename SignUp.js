import AsyncStorage from "@react-native-async-storage/async-storage";
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
import DropDownPicker from "react-native-dropdown-picker";

export function SignUpUi({ navigation }) {

  asyncCall();

  async function asyncCall(){

    const asyncStore = await AsyncStorage.getItem("mobile");

    if(asyncStore!=null){
      navigation.navigate("My Notes");
    }

  }

  const [getMobile, setMobile] = useState("");
  const [getFName, setFName] = useState("");
  const [getLName, setLName] = useState("");
  const [getPassword, setPassword] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Student", value: "1" },
    { label: "Employee", value: "2" },
  ]);

  const clearFields = (val)=>{
    setMobile("");
    setFName("");
    setLName("");
    setPassword("");
  }

  return (
    <SafeAreaView style={styles.container}>

        <View>
          <Image source={require("./assets/img/signUp.png")} style={{width: 180, height: 120}}/>
        </View>

      <View style={styles.formArea}>
        <View>
          <Text style={styles.title}>User Type</Text>
          <DropDownPicker
            style={styles.dropDown}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select user type"
          />
        </View>

        <View>
          <Text style={styles.title}>Mobile Number</Text>
          <TextInput
            style={styles.inputField}
            value={getMobile}
            onChangeText={(text) => setMobile(text)}
            placeholder="Please use 10 digit mobile nomber"
          />
        </View>

        <View>
          <Text style={styles.title}>First Name</Text>
          <TextInput
            style={styles.inputField}
            value={getFName}
            onChangeText={(text) => setFName(text)}
            placeholder="Enter first name"
          />
        </View>

        <View>
          <Text style={styles.title}>Last Name</Text>
          <TextInput
            style={styles.inputField}
            value={getLName}
            onChangeText={(text) => setLName(text)}
            placeholder="Enter last name"
          />
        </View>

        <View>
          <Text style={styles.title}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.inputField}
            value={getPassword}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password length must between 5 to 18"
          />
        </View>

        <View>
          <Pressable onPress={goToSignIn} style={styles.btnPrimary}>
            <Text style={styles.btnText}>{"Sign Up"}</Text>
          </Pressable>
        </View>

        <View>
          <Pressable onPress={() => {
              navigation.navigate("Sign In");
            }}  style={styles.btnAsh}>
            <Text style={styles.btnAshText}>{"Sign In"}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );

  function goToSignIn() {
    const details = {
      userType: value,
      mobile: getMobile,
      firstName: getFName,
      lastName: getLName,
      password: getPassword,
    };

    fetch("http://10.0.2.2/MyNotes/sign-up.php", {
      method: "POST",
      body: JSON.stringify(details),
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        if (text == "Success") {
          clearFields(getMobile,getFName,getLName,getPassword);
          navigation.navigate("Sign In");
        } else {
          Alert.alert("Warning", text);
        }
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
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
});
