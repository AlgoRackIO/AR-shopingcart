import React, { useLayoutEffect } from "react";
import { Card } from "react-native-elements";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { data } from "../../data/data";
import { Button as ButtonElement } from "react-native-elements";
import { SliderBox } from "react-native-image-slider-box";

const FileAdd = (props) => {
  const mainData = props.route.params.mainData;
  const navigation = props.navigation;

  console.log(mainData.id);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <View style={{ width: 15, top: 40 }}></View>
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
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "#f74444",
                }}
              >
                Description:
              </Text>
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
                                  {varient.name} (Rs.{varient.price})
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
});

export default FileAdd;
