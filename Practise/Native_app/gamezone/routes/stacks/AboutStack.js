import React from "react";
import About from "../../screens/About";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../../components/Header";


const Stack = createStackNavigator();


function AboutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="About"
        component={About}
        options={({navigation})=>{
          return {
            headerTitle: ()=><Header navigation={navigation} title="About GameZone" />,
            headerTitleAlign: "center"
          }
        }}
      />
    </Stack.Navigator>
  );
}

export default AboutStack;
