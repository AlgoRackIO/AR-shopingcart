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
} from "react-native";
import { onChange } from "react-native-reanimated";
const types = [
  { label: "", value: 0 },
  { label: "", value: 0 },
  { label: "", value: 0 },
];

const AddItemTemp = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, SetDescription] = useState("");
  const [nameProcess, setNameProcess] = useState(true);
  const [typesData, setTypesData] = useState(types);

  const inputField = () => {
    if (name && description) {
      console.log(name, price, description);
      setNameProcess(false);
    } else {
      Alert.alert("Kindly Fill Each box!  ");
    }
  };

  const backinputField = () => {
    setNameProcess(true);
  };

  const getdata = () => {
    console.log(typesData);
  };

  const setNameAndDesc = (data) => {
    console.log(data, "--------");
  };
  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assests/background.jpg")}
    >
      <GetInputField onSave={setNameAndDesc} />
      {/* <View style={styles.nameScreen}>
        <Text style={styles.headText}>Kindly Fill Item Details</Text>
        <View style={styles.nameScreen}>
          <TextInput
            key="Name"
            style={styles.input}
            placeholder="name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            key="description"
            style={styles.inputBox}
            placeholder="description"
            value={description}
            onChangeText={(text) => SetDescription(text)}
          />
          <View style={styles.nameSButton}>
            <Button title="Next" color="red" onPress={inputField} />
          </View>
        </View>
      </View> */}
    </ImageBackground>
  );
};
const GetInputField = (props) => {
  const [name, setName] = useState("");
  const [description, SetDescription] = useState("");

  const inputField = () => {
    if (name && description) {
      props.onSave({ name, description });
    } else {
      Alert.alert("Kindly Fill Each box!  ");
    }
  };

  return (
    <View style={styles.nameScreen}>
      <Text style={styles.headText}>Kindly Fill Item Details</Text>
      <View style={styles.nameScreen}>
        <TextInput
          key="Name"
          style={styles.input}
          placeholder="name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          key="description"
          style={styles.inputBox}
          placeholder="description"
          value={description}
          onChangeText={(text) => SetDescription(text)}
        />
        <View style={styles.nameSButton}>
          <Button title="Next" color="red" onPress={inputField} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  nameScreen: {
    flex: 1,
    alignItems: "center",
    width: "90%",
    marginTop: "20%",
  },
  nameSButton: {
    width: "20%",
    marginTop: 20,
  },
  inputView: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    width: "90%",
    marginTop: 10,
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
  inputType: {
    width: "50%",
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
    paddingLeft: 15,
    margin: 2,
  },
  typesStyle: {
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 10,
    fontSize: 15,
  },
  headText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "red",
    marginTop: 80,
  },
  inputBox: {
    width: "90%",
    height: 80,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
    paddingLeft: 15,
    margin: 2,
  },

  button: {
    width: "20%",
  },
  flexButton: {
    flex: 1,
    flexDirection: "row",
    marginTop: "8%",
  },
  flexInput: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AddItemTemp;
