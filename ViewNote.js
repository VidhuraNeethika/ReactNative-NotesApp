import { useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ViewNoteUi({ navigation ,route}) {
  const [getTitle, setTitle] = useState(route.params.title);
  const [getDescription, setDescription] = useState(route.params.description);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(route.params.catId);
  const [items, setItems] = useState([
    { label: "Travel", value: "1" },
    { label: "Work", value: "2" },
    { label: "Personal", value: "3" },
  ]);

  const clearFields = (val)=>{
    setTitle("");
    setDescription("");
    setValue("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formArea}>
        <View>
          <Text style={styles.title}>Note Title</Text>
          <TextInput
            style={styles.inputField}
            value={getTitle}
            onChangeText={(text) => setTitle(text)}
            placeholder="Enter note title"
          />
        </View>

        <View>
          <Text style={styles.title}>Note Category</Text>
          <DropDownPicker
            style={styles.dropDown}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select a Category"
            textStyle={styles.mainText}
          />
        </View>

        <View>
          <Text style={styles.title}>Description</Text>
          <TextInput
            textAlignVertical="top"
            multiline={true}
            numberOfLines={18}
            style={styles.textArea}
            value={getDescription}
            onChangeText={(text) => setDescription(text)}
            placeholder="Enter note description"
          />
        </View>

        <View>
          <Pressable onPress={updateNote} style={styles.btnPrimary}>
            <Text style={styles.btnText}>{"Update Note"}</Text>
          </Pressable>
        </View>

        <View>
          <Pressable onPress={deleteNote}  style={styles.btnDlt}>
            <Text style={styles.btnText}>{"Delete Note"}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );

  function updateNote() {

    const details = {
      noteId:route.params.id,
      noteTitle: getTitle,
      category: value,
      description: getDescription,
    };

    fetch("http://10.0.2.2/MyNotes/update-note.php", {
      method: "POST",
      body: JSON.stringify(details),
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        if (text == "Success") {

          clearFields(getTitle,getDescription);
          navigation.navigate("My All Notes")
          
        } else {
          Alert.alert("Warning", text);
        }
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });

  }

  function deleteNote(){
    const details = {
        noteId:route.params.id,
      };
  
      fetch("http://10.0.2.2/MyNotes/delete-note.php", {
        method: "POST",
        body: JSON.stringify(details),
      })
        .then((response) => {
          return response.text();
        })
        .then((text) => {
          if (text == "Success") {
  
            clearFields(getTitle,getDescription);
            navigation.navigate("My All Notes")
            
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
  textArea: {
    backgroundColor: "#EAECEE",
    fontSize: 16,
    padding: 10,
    marginBottom: 5,
    height: 340,
    borderRadius:15
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
  btnDlt: {
    backgroundColor: "#C0392B",
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
