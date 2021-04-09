import React from "react";
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
import { SliderBox } from "react-native-image-slider-box";

const FileAdd = (props) => {
  const mainData = props.route.params.mainData;

  const id = 0;
  return (
    <View>
      <ScrollView>
        <Card>
          <View>
            <SliderBox
              images={data[id].imgURL}
              sliderBoxHeight={400}
              parentWidth={330}
              resizeMode="contain"
              autoplay
              circleLoop
            />
            <Text style={styles.itemPrice}>
              Rs: {mainData.itemTypes[0].varientTypes[0].price}
            </Text>
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
                  <Card>
                    <View key={key}>
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
