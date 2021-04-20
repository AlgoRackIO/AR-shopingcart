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
  Keyboard,
} from "react-native";
import auth from "@react-native-firebase/auth";
import Loading from "../Loader/Loading";
import AwesomeAlert from "react-native-awesome-alerts";

const SignInScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidation, SetEmailValidation] = useState(true);
  const user = props.route.params.user;
  const [isLoader, setIsLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const hideAlert = (show) => {
    setShowAlert(!show);
  };

  const signInAuth = async (email, password) => {
    try {
      setIsLoader(true);
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          // global.user =
          setIsLoader(false);
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
        });
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setErrorMsg("That email address is invalid!");
      }

      setErrorMsg(error.message);
      setShowAlert(true);
    }
  };

  const handleSignIn = () => {
    Keyboard.dismiss();
    if (emailValidation) {
      if (email && password) {
        setIsLoader(true);
        signInAuth(email, password);
      } else {
        setPassword("");
        setShowAlert(true);
        setErrorMsg("Kindly Fill Each box!  ");
      }
    } else {
      setPassword("");
      setShowAlert(true);
      setErrorMsg("Kindly Fill correct email!");
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
      {isLoader ? <Loading /> : null}
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        // title="Empty Box"
        message={errorMsg}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => hideAlert(true)}
      />
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
