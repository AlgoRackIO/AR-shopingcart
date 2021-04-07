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

const ViewItems = (props) => {
  const navigation = props.navigation;
  const itemsData = data;
  const state = props.state;
  const dispatch = useDispatch();

  const goEditItems = (id) => {
    navigation.navigate("EditItems", { id });
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
                onPress={() => goEditItems(item.id)}
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
                    height: "54%",
                    marginHorizontal: "3%",
                    marginVertical: "3%",
                    padding: 0,
                    // paddingBottom: 20,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 0,
                    }}
                  >
                    <View>
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
                    </View>
                    <View>
                      <Text numberOfLines={2} style={styles.itemTitle}>
                        Name: {item.name}
                      </Text>
                      <Text style={styles.itemPrice}>
                        Rs: {item.types[0].value}
                      </Text>

                      <View
                        style={{
                          flex: 1,
                          alignItems: "flex-end",
                          marginBottom: 35,
                        }}
                      >
                        <ButtonElement
                          icon={
                            <Icon
                              name="edit"
                              size={30}
                              color="black"
                              type="clear"
                            />
                          }
                          type="clear"
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
    // marginTop: "20%",
    fontWeight: "bold",
    fontSize: 17,
    left: 7,
  },
  itemPrice: {
    color: "red",
    // marginTop: 10,
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

export default connect(mapStateToProps)(ViewItems);
