import React, { useLayoutEffect } from "react";
import { View, ImageBackground, StyleSheet, Text, Button } from "react-native";

const Admin = ({ navigation }) => {
  const viewItems = () => {
    navigation.navigate("ViewItems");
  };

  const addItems = () => {
    navigation.navigate("Add Product");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.rigthHeaderButtons}>
          <Button
            color="#f74444"
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Users" }],
              })
            }
            title="logout"
          />
        </View>
      ),
    });
  }, []);

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../assests/background.jpg")}
    >
      <View style={styles.buttonBox}>
        <Text style={styles.textHeader}>Welcome</Text>
        <Text style={styles.textHeader}>Chander Kumar</Text>
        <View style={styles.button}>
          <Button title="View Items" color="red" onPress={viewItems} />
        </View>
        <View style={styles.button}>
          <Button title="Add Item" color="red" onPress={addItems} />
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
  rigthHeaderButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    margin: 8,
  },
});

export default Admin;
