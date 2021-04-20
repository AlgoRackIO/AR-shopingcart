import React from "react";
import { View, ImageBackground, StyleSheet, Text, Button } from "react-native";

const Users = ({ navigation }) => {
  const admin = () => {
    navigation.navigate("Authentication", { user: "admin" });
  };
  const customer = () => {
    navigation.navigate("Authentication", { user: "customer" });
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assests/background.jpg")}
    >
      <View style={styles.buttonBox}>
        <Text style={styles.textHeader}>Welcome To React-Native</Text>
        <View style={styles.button}>
          <Button title="Admin!" color="red" onPress={admin} />
        </View>
        <View style={styles.button}>
          <Button title="Customer!" color="red" onPress={customer} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  button: {
    padding: 5,
    width: "70%",
  },
  buttonBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 30,
    color: "red",
    bottom: "20%",
  },
});

export default Users;
