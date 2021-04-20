import React from "react";
import { View, ImageBackground, StyleSheet, Text, Button } from "react-native";

const Auth = (props) => {
  const user = props.route.params.user;
  const SignIn = () => {
    props.navigation.navigate("SignIn", { user: user });
  };

  const SignUp = () => {
    props.navigation.navigate("SignUp", { user: user });
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assests/background.jpg")}
    >
      <View style={styles.buttonBox}>
        <Text style={styles.textHeader}>Welcome To React-Native</Text>
        <View style={styles.button}>
          <Button title="Sign In" color="red" onPress={SignIn} />
        </View>
        <View style={styles.button}>
          <Button title="Sign Up!" color="red" onPress={SignUp} />
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

export default Auth;
