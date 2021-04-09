import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";

const SignUpScreen = (props) => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidation, SetEmailValidation] = useState(true);
  const user = props.route.params.user;

  const handleSignUp = () => {
    if (emailValidation) {
      if (fName && lName && email && password) {
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

  const SignIn = () => {
    props.navigation.navigate("SignIn", { user: user });
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assests/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assests/logo-red.png")}
        />
        <Text style={{ fontWeight: "bold" }}>Sell What You Don't Needs</Text>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="First Name."
          value={fName}
          onChangeText={(text) => setFName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name."
          value={lName}
          onChangeText={(text) => setLName(text)}
        />
        <TextInput
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
          style={styles.input}
          placeholder="Password."
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.button}>
          <Button title="Sign Up" color="red" onPress={handleSignUp} />
          <TouchableOpacity onPress={SignIn}>
            <Text style={styles.signInLink}>Already Have an account!</Text>
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
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
    // textAlign:"center",
    paddingLeft: 15,
    margin: 2,
  },

  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  button: {
    top: 20,
    width: "50%",
  },

  signInLink: {
    color: "red",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 10,
  },
});

export default SignUpScreen;
