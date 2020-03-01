import React from "react";
import { StyleSheet, Text, View, Dimensions, Image, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function Header({ navigation, title }) {
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <ImageBackground source={require('../assets/game_bg.png')} style={styles.header}>
      <MaterialIcons
        style={styles.menuIcon}
        name="menu"
        size={28}
        onPress={openMenu}
      />
      <View style={styles.headerTitle}> 
        <Image style={styles.titleLogo} source={require('../assets/heart_logo.png')}/>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    width: Dimensions.get("window").width,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1
  },
  menuIcon: {
    position: "absolute",
    left: 16
  },
  headerTitle: {
    flexDirection: 'row'
  },
  titleLogo: {
    width: 28,
    height: 26,
    marginRight: 10,
  }
});

export default Header;
