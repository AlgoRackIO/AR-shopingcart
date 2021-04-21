import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableHighlight,
} from "react-native";
import { Card } from "react-native-elements";
import { Button as ButtonElement } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, connect } from "react-redux";
import { ADD_TO_CART } from "../../redux/CartItem";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-community/async-storage";
import auth from "@react-native-firebase/auth";
import Loading from "../Loader/Loading";
import { firebase } from "./../../Firebase/config";
import data from "./../../data/data";
import AwesomeAlert from "react-native-awesome-alerts";

const Home = (props) => {
  const navigation = props.navigation;
  const [productsData, setProductsData] = useState([]);
  // const [isLoader, setIsLoader] = useState(false);
  const state = props.state;
  const dispatch = useDispatch();
  // const [showAlert, setShowAlert] = useState(false);

  // const logOut = () => {
  //   // setIsLoader(true);
  //   auth()
  //     .signOut()
  //     .then(() => {
  //       setShowAlert(false);
  //       navigation.reset({
  //         index: 0,
  //         routes: [{ name: "Users" }],
  //       });
  //     });
  // };

  // const hideAlert = (show) => {
  //   setShowAlert(!show);
  // };

  const logOut = async () => {
    await auth()
      .signOut()
      .then(() => {
        // setIsLoader(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "Users" }],
        });
      });
  };

  const goProductDisplay = (product) => {
    navigation.navigate("ProductDisplay", { product });
  };

  const goMyCart = () => {
    navigation.navigate("MyCart");
  };

  const addItemstCard = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  const ConfirmLogout = () => {
    try {
      Alert.alert("Are you want to LOGOUT", "", [
        {
          text: "Yes",
          onPress: logOut,
          style: "default",
        },
        {
          text: "No",
          style: "cancel",
        },
      ]);
    } catch (error) {
      Alert.alert(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.rigthHeaderButtons}>
          <Text
            style={{
              fontWeight: "bold",
              bottom: 10,
              left: 3,
            }}
          >
            {state.length}
          </Text>
          <ButtonElement
            icon={
              <Icon name="shopping-cart" size={30} color="red" type="clear" />
            }
            onPress={goMyCart}
            type="clear"
          />
          <View style={{ width: 15 }}></View>
          <FontAwesome
            name="sign-out"
            size={30}
            color="red"
            onPress={ConfirmLogout}
          />
        </View>
      ),
    });
  }, [state]);

  useEffect(() => {
    (async function () {
      try {
        await AsyncStorage.getItem("data", (err, result) => {
          setProductsData(JSON.parse(result));
        });
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [productsData]);

  return (
    <View>
      <View style={{ height: "100%" }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.mainView}>
            {productsData.map((item, key) => {
              return (
                <TouchableHighlight
                  underlayColor={"none"}
                  key={key}
                  onPress={() => goProductDisplay(item)}
                  style={styles.touchableStyle}
                >
                  <Card key={key} containerStyle={styles.containerStyles}>
                    <View style={styles.cardView}>
                      <Card.Image
                        source={{
                          uri: item.imgURL[0],
                        }}
                        resizeMode="stretch"
                        style={styles.cardImgStyle}
                      />
                      <View>
                        <Text numberOfLines={2} style={styles.itemTitle}>
                          Name: {item.name}
                        </Text>
                        <Text style={styles.itemPrice}>
                          Rs: {item.itemTypes[0].varientTypes[0].value}
                        </Text>
                      </View>
                    </View>
                  </Card>
                </TouchableHighlight>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* {isLoader ? <Loading /> : null} */}
      {/* <AwesomeAlert
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
        onConfirmPressed={() => logOut()}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  themColorRed: {
    color: "#f74444",
  },
  image: {
    width: "60%",
    height: "20%",
  },
  itemTitle: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 17,
    left: 7,
  },
  itemPrice: {
    color: "red",
    marginTop: 10,
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
    justifyContent: "flex-end",
    margin: 6,
    alignItems: "center",
  },
  mainView: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    height: "100%",
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
});

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps)(Home);
