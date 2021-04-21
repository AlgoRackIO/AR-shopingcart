import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { Card } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-community/async-storage";
import AwesomeAlert from "react-native-awesome-alerts";

const ViewProducts = (props) => {
  const navigation = props.navigation;
  const [itemsData, setItemData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const hideAlert = (show) => {
    setShowAlert(!show);
  };

  const goEditItems = (product) => {
    navigation.navigate("EditItems", { product });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.rigthHeaderButtons}>
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
        await AsyncStorage.getItem("data", (err, result) => {
          setItemData(JSON.parse(result));
        });
      } catch (error) {
        setShowAlert(true);
        setErrorMsg(error.message);
      }
    })();
  }, []);

  return (
    <View>
      <ScrollView>
        <View style={styles.mainView}>
          {itemsData.map((item, key) => {
            return (
              <TouchableHighlight
                underlayColor={"none"}
                key={key}
                onPress={() => goEditItems(item)}
                style={styles.touchableStyle}
              >
                <Card key={key} containerStyle={styles.containerStyles}>
                  <View style={styles.cardView}>
                    <View>
                      <Card.Image
                        source={{
                          uri: item.imgURL[0],
                        }}
                        resizeMode="stretch"
                        style={styles.cardImgStyle}
                      />
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text numberOfLines={2} style={styles.itemTitle}>
                        Name: {item.name}
                      </Text>
                      <Text style={styles.itemPrice}>
                        Rs: {item.itemTypes[0].varientTypes[0].value}
                      </Text>

                      <View style={styles.editIconStyle}>
                        <FontAwesome
                          name="edit"
                          size={35}
                          color="red"
                          style={{
                            marginRight: 5,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </Card>
              </TouchableHighlight>
            );
          })}
        </View>
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
  mainView: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  touchableStyle: {
    display: "flex",
    flex: 1,
    flexBasis: "50%",
  },
  containerStyles: {
    width: 193,
    marginHorizontal: 2,
    marginVertical: 3,
    padding: 0,
    paddingBottom: 20,
  },
  cardView: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
  },
  cardImgStyle: {
    width: "100%",
    height: 200,
  },
  editIconStyle: {
    alignItems: "flex-end",
    marginBottom: -20,
    bottom: 5,
  },
  themColorRed: {
    color: "#f74444",
  },
  image: {
    width: "60%",
    height: "20%",
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 17,
    left: 7,
  },
  itemPrice: {
    color: "red",
    fontSize: 15,
    left: 7,
  },
  flex: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "row",
  },
  rigthHeaderButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    margin: 8,
  },
  CardButton: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 8,
  },
});

export default ViewProducts;
