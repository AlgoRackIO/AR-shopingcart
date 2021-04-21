import React, { useEffect, useLayoutEffect, useState } from "react";
import { Card } from "react-native-elements";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import AsyncStorage from "@react-native-community/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import firebase from "./../../../Firebase/config";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import database from "@react-native-firebase/database";

const FinalProView = (props) => {
  const mainData = props.route.params.mainData;
  const navigation = props.navigation;
  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
    (async function () {
      try {
        await AsyncStorage.getItem("data", async (err, result) => {
          await AsyncStorage.setItem(
            "data",
            JSON.stringify([
              ...JSON.parse(result),
              { ...mainData, id: JSON.parse(result).length },
            ])
          );
        });
      } catch (error) {
        setErrorMsg(error.message);
      }
    })();

    try {
      const newReference = database()
        .ref(`/product/${auth().currentUser.uid}`)
        .push();
      // console.log("Auto generated key: ", newReference.key);
      newReference.set(mainData).then(() => console.log("Data updated."));
    } catch (error) {
      setShowAlert(true);
      setErrorMsg(error);
    }
  }, []);

  return (
    <View>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Card>
          <View>
            <SliderBox
              images={mainData.imgURL}
              sliderBoxHeight={400}
              parentWidth={330}
              resizeMode="contain"
              autoplay
              circleLoop
            />
            <Text style={styles.itemTitle}>{mainData.name}</Text>
            <View>
              <Text style={styles.descriptionStyle}>Description:</Text>
              <Text>{mainData.description}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.textheadings}>Categories</Text>
            <View>
              {mainData.itemTypes.map((index, key) => (
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
        </Card>
      </ScrollView>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        message={errorMsg}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => hideAlert(true)}
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

export default FinalProView;
