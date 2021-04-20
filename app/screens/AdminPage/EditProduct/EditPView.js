import React, { useEffect, useLayoutEffect, useState } from "react";
import { Card } from "react-native-elements";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import AsyncStorage from "@react-native-community/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import firebase from "./../../../Firebase/config";
import auth from "@react-native-firebase/auth";
import AwesomeAlert from "react-native-awesome-alerts";

const EditProView = (props) => {
  const product = props.route.params.product;
  const navigation = props.navigation;
  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useEffect("");

  const hideAlert = (show) => {
    setShowAlert(!show);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <FontAwesome
            name="home"
            size={35}
            color="red"
            style={{
              marginRight: 5,
            }}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Admin" }],
              })
            }
          />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    try {
      const products = AsyncStorage.getItem("data");
      if (value) {
        AsyncStorage.setItem(
          "data",
          JSON.stringify(
            JSON.parse(result).map((index, i) => {
              if (i == product.id) {
                return product;
              } else {
                return index;
              }
            })
          )
        );
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
    // AsyncStorage.getItem("data", (err, result) => {
    //   AsyncStorage.setItem(
    //     "data",
    //     JSON.stringify(
    //       JSON.parse(result).map((index, i) => {
    //         if (i == product.id) {
    //           return product;
    //         } else {
    //           return index;
    //         }
    //       })
    //     )
    //   );
    // });

    // const newReference = firebase.database().ref(`/product/${}`).push();
    // console.log("Auto generated key: ", newReference.key);
    // newReference.set(data).then(() => console.log("Data updated."));
  }, []);

  return (
    <View>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Card>
          <View>
            <SliderBox
              images={product.imgURL}
              sliderBoxHeight={400}
              parentWidth={330}
              resizeMode="contain"
              autoplay
              circleLoop
            />
            <Text style={styles.itemTitle}>{product.name}</Text>
            <View>
              <Text style={styles.descriptionStyle}>Description:</Text>
              <Text>{product.description}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.textheadings}>Categories</Text>
            <View>
              {product.itemTypes.map((index, key) => (
                <Card key={key}>
                  <View>
                    <Text
                      style={{
                        color: "red",
                        fontSize: 20,
                      }}
                    >
                      {index.varientName}
                    </Text>
                    <View>
                      {index.varientTypes.map((varient, varientKey) => (
                        <View key={varientKey}>
                          <Text>
                            <Text>
                              {varient.label} (Rs.{varient.value})
                            </Text>
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          </View>
          <View style={styles.rigthHeaderButtons}></View>
        </Card>
      </ScrollView>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        // title="LOGOUT"
        message={errorMsg}
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
    </View>
  );
};

const styles = StyleSheet.create({
  itemTitle: {
    marginTop: 25,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 25,
  },
  textheadings: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#f74444",
    marginTop: 20,
  },
  rigthHeaderButtons: {
    flex: 1,
    alignItems: "flex-end",
    marginTop: 50,
    width: "100%",
  },
  descriptionStyle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#f74444",
  },
});

export default EditProView;
