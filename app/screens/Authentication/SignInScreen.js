import React, { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "react-native";

const SignInScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidation, SetEmailValidation] = useState(true);
  const user = props.route.params.user;

  const handleSignIn = () => {
    if (emailValidation) {
      if (email && password) {
        if (user === "customer") {
          props.navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        } else {
          {
            props.navigation.reset({
              index: 0,
              routes: [{ name: "Admin" }],
            });
          }
        }
      } else {
        setPassword("");
        Alert.alert("Kindly Fill Each box!  ");
      }
    } else {
      setPassword("");
      Alert.alert("Kindly Fill correct email!");
    }
  };

  const validateEmail = () => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    SetEmailValidation(re.test(email));
  };

  const SignUp = () => {
    props.navigation.navigate("SignUp", { user: user });
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assests/background.jpg")}
    >
      <View style={styles.inputView}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assests/logo-red.png")}
          />
          <Text style={{ fontWeight: "bold" }}>Sell What You Don't Needs</Text>
        </View>

        <TextInput
          key="email"
          style={styles.input}
          placeholder="Email."
          value={email}
          onBlur={() => {
            validateEmail();
          }}
          onChangeText={(text) => setEmail(text)}
        />
        {!emailValidation ? (
          <Text style={{ color: "red", fontWeight: "bold", right: "20%" }}>
            Kindly input correct Email!
          </Text>
        ) : null}
        <TextInput
          kye="password"
          style={styles.input}
          placeholder="Password."
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.button}>
          <Button title="Sign In" color="red" onPress={handleSignIn} />
          <TouchableOpacity onPress={SignUp}>
            <Text style={styles.signUpLink}>Don't Have an account!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  inputView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    // bottom: 40,
    position: "relative",
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
    paddingLeft: 15,
    margin: 2,
  },

  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    bottom: "10%",
    alignItems: "center",
  },
  button: {
    top: 20,
    width: "50%",
  },
  signUpLink: {
    color: "red",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 10,
    width: "130%",
  },
});

export default SignInScreen;
