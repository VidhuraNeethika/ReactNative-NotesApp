import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  BackHandler,
  Button,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useFonts } from "expo-font";

export function HomeUi({ navigation }) {

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       return true;
  //     };
  
  //     BackHandler.addEventListener(
  //       'hardwareBackPress', onBackPress
  //     );
  
  //     return () =>
  //       BackHandler.removeEventListener(
  //         'hardwareBackPress', onBackPress
  //       );
  //   }, [])
  // );

  const [fontsLoaded] = useFonts({
    calibri: require("./assets/fonts/calibrib.ttf"),
  });

  const [allNotes,setAllNotes] = useState([]);

  loadNoteDetails();

  async function loadNoteDetails(){

    const details = {
      user: await AsyncStorage.getItem("mobile"),
    };
  
    fetch("http://10.0.2.2/MyNotes/load-list.php", {
        method: "POST",
        body: JSON.stringify(details),
      })
        .then((response) => {
          return response.json();
        })
        .then((text) => {
          setAllNotes(text);
        })
        .catch((error) => {
          Alert.alert("Error", error);
        });
  }

  if (fontsLoaded) {

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.welcome}>
        <Image source={require("./assets/img/noteBg.png")} style={{width: 350, height: 250}}/>
      </View>
      
      <View style={styles.headerArea}>
        <Pressable onPress={loadNoteDetails} style={styles.btnPrimary}>
          <Text style={styles.btnText}>{"Reload"}</Text>
        </Pressable>
        <Pressable style={styles.btnAsh}>
          <Text style={styles.btnAshText}>{"Categories"}</Text>
        </Pressable>
        <Pressable style={styles.btnLogOut} onPress={async()=>{
          await AsyncStorage.removeItem("mobile");
          navigation.navigate("Sign In");
        }}>
          <Text style={styles.btnLogOutText}>{"Log Out"}</Text>
        </Pressable>
      </View>

      <View style={styles.listArea}>

        <FlatList data={allNotes} renderItem={listStyle}  />

      </View>

      <View style={styles.newNoteView}>
        <View style={styles.btnView}>
          <Pressable
            onPress={goToNewNotes}
            style={styles.btnNewNote}
          >
            <Image source={require("./assets/img/addBtn.png")} style={{width: 50, height: 50}}/>
            
          </Pressable>
        </View>
      </View>

    </SafeAreaView>
  );

  function listStyle({ item }){

    let imagePath;

    let cats = new Array(item.name);

    if(cats =="Work"){
      imagePath= require("./assets/img/work.png");
    }else if(cats=="Travel"){
      imagePath= require("./assets/img/travel.png");
    }else if(cats=="Personal"){
      imagePath= require("./assets/img/personal.png");
    }

    return(
      <TouchableOpacity style={styles.listBox} onPress={viewNotes} >

          <View style={styles.imgView}>
            <Image style={styles.catImg} source={imagePath}/>
          </View>

          <View style={styles.descriptionBox}>

            <Text style={styles.nTitle}>{item.title}</Text>
            <Text numberOfLines={1} style={styles.nDes}>{item.description}</Text>
            <Text style={styles.nTime}>{item.date}</Text>

          </View>

          <View style={styles.viewButtonArea}>
            
          <Pressable
          onPress={viewNotes}
            style={styles.btnNewNote}
          >
            {/* <Text style={styles.btnText}>{"NEW NOTE"}</Text> */}
            <Image source={require("./assets/img/eye.png")} style={{width: 50, height: 50}}/>
            
          </Pressable>
            
          </View>

        </TouchableOpacity>
    )

    function viewNotes(){
      navigation.navigate("View Note",item);
    }
    
  }
}

  function goToNewNotes() {
    navigation.navigate("New Notes");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  listArea: {
    flex: 15,
    backgroundColor: "white",
    Width: 380,
    height: 300,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "column",
    overflow: "scroll",
  },
  addButtonArea: {
    flex: 1,
    backgroundColor: "#343434",
    width: 380,
    marginBottom: 10,
    padding: 10,
  },
  headerArea: {
    backgroundColor: "white",
    width: 380,
    marginTop: 10,
    padding: 10,
    flexDirection:"row"
  },
  listBox: {
    width: 360,
    height: 80,
    backgroundColor: "#EAECEE",
    borderRadius: 15,
    marginTop: 10,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  imageArea: {
    backgroundColor: "#77B5F3",
    width:70,
    height:70,
    borderRadius:100,
    marginLeft:10,
    marginTop:4,
  },
  descriptionBox:{
    padding:10,
    width:210,
  },
  nTitle:{
    fontSize:17,
    fontWeight:"bold",
    fontFamily:"calibri",
  },
  // nTime:{
    
  // },
  // nDes:{
  //   fontFamily:"calibri",
  // },
  viewButtonArea:{
    width:50,
    alignItems:"center",
    justifyContent:"center"
  },
  welcome:{
    width:380,
  },
  welcomeText:{
    fontSize:25,
    fontWeight:"900",
    color:"#273746"
  },
  catImg:{
    width:60,
    height:60,
    borderRadius:100,
  },
  imgView:{
    backgroundColor:"white",
    borderRadius:100,
    width:70,
    height:70,
    alignItems:"center",
    justifyContent:"center",
  },
  btnPrimary: {
    backgroundColor: "#427dde",
    Text: "center",
    borderRadius: 100,
    width: 109,
    alignItems: "center",
    justifyContent:"center"
  },
  btnAsh: {
    backgroundColor: "#D5D8DC",
    Text: "center",
    borderRadius: 100,
    width: 109,
    alignItems: "center",
    marginLeft:17,
    justifyContent:"center"
  },
  btnLogOut:{
    backgroundColor: "#17202A",
    Text: "center",
    borderRadius: 100,
    width: 109,
    alignItems: "center",
    marginLeft:17,
    justifyContent:"center"
  },
  btnAshText:{
    padding: 6,
    fontSize: 15,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  btnLogOutText:{
    padding: 6,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  btnText: {
    padding: 6,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  btnView: {
    marginVertical: 10,
    alignItems: "center",
  },
  newNoteView: {
    position:"absolute",
    bottom:1,
    alignSelf:"flex-end",
    right:20,
  },
  btnNewNote: {
    Text: "center",
    borderRadius: 30,
    width: 50,
    alignItems: "flex-end",
    paddingVertical:5,
    fontWeight:"bold",
  },
});
