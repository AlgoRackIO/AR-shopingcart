import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View, Text, TextInput, Button } from "react-native";
import { Button as ButtonElement } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

const EditProductDes = (props) => {
  const [name, setName] = useState(props.product.name);
  const [description, SetDescription] = useState(props.product.description);
  const [onDetailsPage, SetOnDetailsPage] = useState(props.onDetailsPage);
  const [imgURL, setImgURl] = useState(props.product.imgURL);

  const goTypePage = () => {
    let checkImg = true;
    imgURL.forEach((img) => {
      if (img === "") checkImg = false;
    });
    if (name && description && checkImg) {
      SetOnDetailsPage(true);
      props.onSave({ name, description, onDetailsPage, imgURL });
    } else {
      Alert.alert("Kindly Fill Each box!");
    }
  };
  const changetexyt = (text, key) => {
    setImgURl(
      imgURL.map((img, index) => {
        if (index == key) return text;
        return img;
      })
    );
  };

  return (
    <ScrollView>
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
          <View style={{ flex: 1 }}>
            {imgURL.map((img, key) => {
              return (
                <View key={key} style={styles.MainView}>
                  <TextInput
                    style={styles.inputNameDes}
                    placeholder="Img URl"
                    value={imgURL[key]}
                    onChangeText={(text) => changetexyt(text, key)}
                  />
                  {key == 0 ? (
                    <ButtonElement
                      icon={
                        <Icon name="plus" size={20} color="red" type="clear" />
                      }
                      onPress={props.addImg}
                      type="clear"
                    />
                  ) : null}
                  {key == imgURL.length - 1 && key > 0 ? (
                    <ButtonElement
                      icon={
                        <Icon name="times" size={20} color="red" type="clear" />
                      }
                      onPress={props.deleteImg}
                      type="clear"
                    />
                  ) : null}
                </View>
              );
            })}
          </View>
          <View style={styles.inputNameNextB}>
            <Button title="Next" color="red" onPress={goTypePage} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  MainView: {
    width: "91%",
    flex: 1,
    flexDirection: "row",
    marginLeft: 38,
  },
  inputNameMView: {
    flex: 1,
    alignItems: "center",
    // width: 200,
    marginTop: 20,
  },
  headText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "red",
    marginTop: 80,
  },
  inputNameBoxView: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    marginTop: "10%",
  },
  inputNameDes: {
    width: 315,
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

export default EditProductDes;
