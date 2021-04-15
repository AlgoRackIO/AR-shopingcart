import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Button,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Admin = ({ navigation }) => {
  const ViewProducts = () => {
    navigation.navigate("ViewProducts");
  };

  const addItems = () => {
    navigation.navigate("Add Product");
  };

  const ConfirmLogout = () => {
    Alert.alert("Are you want to LOGOUT", "", [
      {
        text: "Yes",
        onPress: () =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Users" }],
          }),
        style: "default",
      },
      {
        text: "No",
        style: "cancel",
      },
    ]);
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
          onPress={ConfirmLogout}
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
