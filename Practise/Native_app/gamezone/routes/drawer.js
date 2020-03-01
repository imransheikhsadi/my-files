import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "./stacks/HomeStack";
import AboutStack from "./stacks/AboutStack";

const Drawer = createDrawerNavigator();

function RootDrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ title: "Home" }}
        />
        <Drawer.Screen
          name="AboutStack"
          component={AboutStack}
          options={{ title: "About" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default RootDrawerNavigator;
