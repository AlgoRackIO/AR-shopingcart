import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Button,
  Alert,
} from "react-native";
import auth from "@react-native-firebase/auth";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AwesomeAlert from "react-native-awesome-alerts";

const Admin = ({ navigation }) => {
  const [showAlert, setShowAlert] = useState(false);

  const ViewProducts = () => {
    navigation.navigate("ViewProducts");
  };

  const addItems = () => {
    navigation.navigate("Add Product");
  };

  const logOut = () => {
    // setIsLoader(true);
    auth()
      .signOut()
      .then(() => {
        setShowAlert(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "Users" }],
        });
      });
  };

  const hideAlert = (show) => {
    setShowAlert(!show);
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assests/background.jpg")}
    >
      <View
        style={{
          alignItems: "flex-end",
          padding: 10,
        }}
      >
        <FontAwesome
          name="sign-out"
          size={30}
          color="red"
          onPress={() => hideAlert(false)}
        />
      </View>
      <View style={styles.buttonBox}>
        <Text style={styles.textHeader}>Welcome</Text>
        <Text style={styles.textHeader}>Chander Kumar</Text>
        <View style={styles.buttonView}>
          <View style={styles.button}>
            <Button title="View Items" color="red" onPress={ViewProducts} />
          </View>
          <View style={styles.button}>
            <Button title="Add Item" color="red" onPress={addItems} />
          </View>
        </View>
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="LOGOUT"
        message="Are you want to LOGOUT!"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No"
        confirmText="Yes"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => hideAlert(true)}
        onConfirmPressed={logOut}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  buttonView: {
    flex: 0,
    justifyContent: "space-between",
    marginTop: 150,
    height: 80,
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "70%",
  },
  buttonBox: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 30,
    color: "red",
  },
});

export default Admin;
