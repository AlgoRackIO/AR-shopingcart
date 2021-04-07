import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  TouchableHighlight,
} from "react-native";
import { Card } from "react-native-elements";
import { Button as ButtonElement } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { data } from "../../data/data";
import { useDispatch, connect } from "react-redux";
import { ADD_TO_CART } from "../../redux/CartItem";
import ModalDropdown from "react-native-modal-dropdown";

const Home = (props) => {
  const navigation = props.navigation;
  const itemsData = data;
  const state = props.state;
  const dispatch = useDispatch();

  const goItemDisplay = (id) => {
    navigation.navigate("ItemDisplay", { id });
  };

  const goMyCart = () => {
    navigation.navigate("MyCart");
  };

  const addItemstCard = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.rigthHeaderButtons}>
          <Text style={{ fontWeight: "bold" }}>{state.length}</Text>

          <ButtonElement
            style={{ bottom: 10 }}
            icon={
              <Icon
                name="shopping-cart"
                size={30}
                style={{ bottom: 5 }}
                color="red"
                type="clear"
              />
            }
            onPress={goMyCart}
            type="clear"
          />

          <View style={{ width: 15 }}></View>
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
          <ModalDropdown options={["option 1", "option 2"]} />
        </View>
      ),
    });
  }, [state]);

  return (
    <View>
      <ScrollView>
        <View
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {itemsData.map((item, key) => {
            return (
              <TouchableHighlight
                underlayColor={"none"}
                key={key}
                onPress={() => goItemDisplay(item.id)}
                style={{
                  display: "flex",
                  flex: 1,
                  flexWrap: "wrap",
                  flexBasis: "50%",
                }}
              >
                <Card
                  key={key}
                  containerStyle={{
                    display: "flex",
                    width: "100%",
                    marginHorizontal: "3%",
                    marginVertical: "3%",
                    padding: 0,
                    paddingBottom: 20,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 0,
                    }}
                  >
                    <Card.Image
                      source={{
                        uri: item.imgURL[0],
                      }}
                      resizeMode="stretch"
                      style={{
                        width: "100%",
                        height: 200,
                      }}
                    />
                    <View>
                      <Text numberOfLines={2} style={styles.itemTitle}>
                        Name: {item.name}
                      </Text>
                      <Text style={styles.itemPrice}>
                        Rs: {item.types[0].value}
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
    justifyContent: "center",
    margin: 8,
  },
  CardButton: {
    flex: 1,
    // flexDirection: "row",
    // justifyContent: "flex-end",
    margin: 8,
  },
});

const mapStateToProps = function (state) {
  return { state };
};

export default connect(mapStateToProps)(Home);
