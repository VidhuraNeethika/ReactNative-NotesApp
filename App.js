import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeUi } from "./Home";
import { SignUpUi } from "./SignUp";
import { SignInUi } from "./SignIn";
import { NewNoteUi } from "./NewNote";
import { ViewNoteUi } from "./ViewNote";
import { WelcomeUi } from "./Welcome";
import { Image, Pressable, Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="New Notes" component={NewNoteUi} /> */}
        <Stack.Screen name="Welcome" component={WelcomeUi} options={{
            headerTitleStyle: {
              fontWeight: "bold",
              color:"white",
            },
            headerStyle:{
              backgroundColor:"white",
            },
            headerTitleAlign:"center",
            headerShadowVisible:false,
          }} />
        <Stack.Screen name="Sign In" component={SignInUi} options={{
            headerTitleStyle: {
              fontWeight: "bold",
              color:"white",
            },
            headerStyle:{
              backgroundColor:"white",
            },
            headerTitleAlign:"center",
            headerShadowVisible:false,
          }} />
          
         <Stack.Screen name="My Notes" component={HomeUi} options={{
            headerTitleStyle: {
              fontWeight: "bold",
              color:"black",
            },
            headerStyle:{
              backgroundColor:"white",
            },
            headerTitleAlign:"center",
            headerShadowVisible:false,
            headerSearchBarOptions:true,
            headerBackVisible:false,
            headerRight: () => (
              <Pressable
                onPress={() => alert('This is a button!')}
              >
                <Image source={require("./assets/img/settings.png")} style={{width: 27, height: 27}}/>
              </Pressable>
            ),
            headerLeft: () => (
              <Pressable
              >
                <Image source={require("./assets/img/menu.png")} style={{width: 27, height: 27}}/>
              </Pressable>
            ),
          }} />
          <Stack.Screen name="View Note" component={ViewNoteUi} options={{
            headerTitleStyle: {
              fontWeight: "bold",
              color:"white",
            },
            headerStyle:{
              backgroundColor:"#427DDE",
            },
            headerTitleAlign:"center",
            headerShadowVisible:false,
          }}/>
        <Stack.Screen name="Sign Up" component={SignUpUi} options={{
            headerTitleStyle: {
              fontWeight: "bold",
              color:"black",
            },
            headerStyle:{
              backgroundColor:"white",
            },
            headerTitleAlign:"center",
            headerShadowVisible:false,
          }} />
        <Stack.Screen name="New Notes" component={NewNoteUi} options={{
            headerTitleStyle: {
              fontWeight: "bold",
              color:"white",
            },
            headerStyle:{
              backgroundColor:"#427DDE",
            },
            headerTitleAlign:"center",
            headerShadowVisible:false,
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
