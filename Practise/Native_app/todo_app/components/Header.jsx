import React from "react";
import { View, StyleSheet, Text } from "react-native";

function Header() {
  return(
      <View style={styles.header}>
          <View style={styles.mainHeading}>
              <Text>My Todo</Text>
          </View>
      </View>
  )  
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 40,
        backgroundColor: 'coral'
    },
    mainHeading: {
        fontSize: 20,
        fontWeight: 600,
        color: '#fff'
    }
})

export default Header;