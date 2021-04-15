import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View, Text, TextInput, Button } from "react-native";
import { Button as ButtonElement } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

const ProductDes = (props) => {
  const [name, setName] = useState(props.mainData.name);
  const [description, SetDescription] = useState(props.mainData.description);
  const [imgURL, setImgURl] = useState(props.mainData.imgURL);

  const goTypePage = () => {
    let checkImg = true;
    imgURL.forEach((img) => {
      if (img === "") checkImg = false;
    });
    if (name && description && checkImg) {
      props.onSave({ name, description, imgURL });
    } else {
      Alert.alert("Kindly Fill Each box!");
    }
  };

  const addImg = () => {
    setImgURl([...imgURL, ""]);
  };

  const deleteImg = () => {
    setImgURl(imgURL.filter((index, key) => key != imgURL.length - 1));
  };

  const changeImgURL = (text, key) => {
    setImgURl(
      imgURL.map((img, index) => {
        if (index == key) return text;
        return img;
      })
    );
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.inputNameMView}>
        <Text style={styles.headText}>Kindly fill product details</Text>
        <View style={styles.inputNameBoxView}>
          <TextInput
            key="Name"
            style={styles.inputNameDes}
            placeholder="name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            key="description"
            style={[styles.inputNameDes, { height: 70 }]}
            placeholder="description"
            value={description}
            onChangeText={SetDescription}
          />
          {imgURL.map((img, key) => {
            return (
              <View key={key} style={styles.URLView}>
                <TextInput
                  style={styles.UrlTextBox}
                  placeholder="Img URl"
                  value={imgURL[key]}
                  onChangeText={(text) => changeImgURL(text, key)}
                />
                {key == 0 ? (
                  <ButtonElement
                    icon={
                      <Icon name="plus" size={20} color="red" type="clear" />
                    }
                    onPress={addImg}
                    type="clear"
                  />
                ) : null}
                {key == imgURL.length - 1 && key > 0 ? (
                  <ButtonElement
                    icon={
                      <Icon name="times" size={20} color="red" type="clear" />
                    }
                    onPress={deleteImg}
                    type="clear"
                  />
                ) : null}
              </View>
            );
          })}
          <View style={styles.inputNameNextB}>
            <Button title="Next" color="red" onPress={goTypePage} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  URLView: {
    flexDirection: "row",
    alignItems: "center",
    width: "81%",
  },
  UrlTextBox: {
    width: 285,
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    backgroundColor: "white",
    paddingLeft: 15,
    margin: 2,
  },
  inputNameMView: {
    alignItems: "center",
    marginTop: "10%",
  },
  headText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "red",
    marginTop: 80,
  },
  inputNameBoxView: {
    alignItems: "center",
    width: "100%",
    marginTop: "10%",
  },
  inputNameDes: {
    width: "80%",
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    backgroundColor: "white",
    paddingLeft: 15,
    margin: 2,
  },
  inputNameNextB: {
    width: "40%",
    marginTop: 20,
  },
});

export default ProductDes;
