import React, { useState, useLayoutEffect, useEffect } from "react";
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
import AsyncStorage from "@react-native-community/async-storage";

const ViewItems = (props) => {
  const navigation = props.navigation;
  const [itemsData, setItemData] = useState([]);

  const goEditItems = (product) => {
    navigation.navigate("EditItems", { product });
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
                routes: [{ name: "Admin" }],
              })
            }
            title="Home"
          />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("data", (err, result) => {
      setItemData(JSON.parse(result));
    });
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

export default ViewItems;
