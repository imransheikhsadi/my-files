import React from "react";
import Home from "../../screens/Home";
import ReviewDetail from "../../screens/ReviewDetails";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../../components/Header";


const Stack = createStackNavigator();

function HomeStack() {
  
  return (
      <Stack.Navigator
        screenOptions={{
          headerTintColor: "green",
          headerStyle: {
            backgroundColor: "lightgray",
          }
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={({navigation})=>{
            return {
              headerTitle: ()=><Header navigation={navigation} title="Game Zone" />,
              headerTitleAlign: "center"
            }
          }}
        />
        <Stack.Screen name="Details" component={ReviewDetail} />
      </Stack.Navigator>
  );
}

export default HomeStack;
