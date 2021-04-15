import React, { useEffect, useLayoutEffect, useState } from "react";
import { Card } from "react-native-elements";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import AsyncStorage from "@react-native-community/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const FinalProView = (props) => {
  const mainData = props.route.params.mainData;
  const navigation = props.navigation;

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
  descriptionStyle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#f74444",
  },
});

export default FinalProView;
