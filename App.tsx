import "react-native-gesture-handler";
import React, { useEffect } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { storeCurrentUser, WelcomeScreen } from "./App/Pages/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./App/Pages/HomeScreen";
import firebase from "firebase";
import { useState } from "react";
import { UserContext } from "./App/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Menu from "./App/Components/Menu";

var firebaseConfig = {
  apiKey: "AIzaSyA6X4nIVhuhyLy4Vr0ZYXiZT3ISwcMKOFQ",
  authDomain: "poop-tracker-49c9f.firebaseapp.com",
  projectId: "poop-tracker-49c9f",
  storageBucket: "poop-tracker-49c9f.appspot.com",
  messagingSenderId: "287717069144",
  appId: "1:287717069144:web:59b7f9c2e175f622f7952d",
};
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App() {
  const [currentUser, setCurrentUser] = useState<any>("noUser");

  useEffect(() => {
    const getUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("currentUser");
        return jsonValue != null ? JSON.parse(jsonValue) : "noUser";
      } catch (e) {
        return;
      }
    };
    setCurrentUser(getUser());
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <NavigationContainer>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          {currentUser !== "noUser" && <Menu />}
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {currentUser === "noUser" ? (
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
            ) : (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
              </>
            )}
          </Stack.Navigator>
        </UserContext.Provider>
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});
