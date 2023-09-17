import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import PokéPendu from "./src/screens/PokéPendu";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Pokémon" component={Home} />
        <Stack.Screen name="PokéPendu" component={PokéPendu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
