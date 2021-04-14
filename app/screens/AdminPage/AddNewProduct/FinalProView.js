import React, { useEffect, useLayoutEffect, useState } from "react";
import { Card } from "react-native-elements";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { data } from "../../../data/data";
import { Button as ButtonElement } from "react-native-elements";
import { SliderBox } from "react-native-image-slider-box";
import AsyncStorage from "@react-native-community/async-storage";

const FinalProView = (props) => {
  const mainData = props.route.params.mainData;
  const navigation = props.navigation;
  const [productsData, setProductsData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <Button
            color="#f74444"
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "ViewItems" }],
              })
            }
            title="View Data"
          />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("data", (err, result) => {
      AsyncStorage.setItem(
        "data",
        JSON.stringify([
          ...JSON.parse(result),
          { ...mainData, id: JSON.parse(result).length },
        ])
      );
    });
  }, []);

  return (
    <View>
      <ScrollView>
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
              {mainData.itemTypes.map((index, key) => {
                return (
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
                        {index.varientTypes.map((varient, varientKey) => {
                          return (
                            <View key={varientKey}>
                              <Text>
                                <Text>
                                  {varient.label} (Rs.{varient.value})
                                </Text>
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </Card>
                );
              })}
            </View>
          </View>
          <View style={styles.rigthHeaderButtons}></View>
        </Card>
      </ScrollView>
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
  itemPrice: {
    color: "red",
    top: 15,
    fontSize: 15,
  },
  descriptionStyle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#f74444",
  },
});

export default FinalProView;