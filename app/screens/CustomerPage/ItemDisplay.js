import React, { useState } from "react";
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
import { ADD_TO_CART, CHANGE_ITEM_QUANTITY } from "../../redux/CartItem";
import RadioForm from "react-native-simple-radio-button";
import InputSpinner from "react-native-input-spinner";
import { useDispatch, connect } from "react-redux";
import { SliderBox } from "react-native-image-slider-box";

function ItemDisplay({ route }) {
  const id = route.params.id;
  const dispatch = useDispatch();
  const [finalPrice, setFinalPrice] = useState(0);
  const [itemPrice, setItemPrice] = useState(data[id].types[0].value);
  const [itemQuantity, setItemQuantity] = useState(1);

  const addItemstCard = (items) => {
    dispatch({ type: ADD_TO_CART, payload: items });
  };

  const changeItemQuantity = (...item) => {
    dispatch({ type: CHANGE_ITEM_QUANTITY, payload: item });
  };

  const showAlert = (items) =>
    Alert.alert(
      "Kindly confirm your order",
      "press confirm button to add item",
      [
        {
          text: "Confirm",
          onPress: () => (
            addItemstCard(items),
            Alert.alert("Your Order is Successfully added to card")
          ),
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );

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
            <Text style={styles.itemPrice}>Rs: {data[id].types[0].value}</Text>
            <Text style={styles.itemTitle}>{data[id].name}</Text>
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
              <Text>{data[id].description}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.textheadings}>Select Book type</Text>
            <RadioForm
              radio_props={data[id].types}
              // initial={0}
              formHorizontal={false}
              labelHorizontal={true}
              buttonColor={"red"}
              buttonInnerColor={"red"}
              buttonOuterColor={"red"}
              buttonSize={10}
              animation={true}
              onPress={(value) => setItemPrice(value)}
              style={{ marginTop: 10 }}
            />

            <InputSpinner
              max={10}
              min={1}
              step={1}
              color={"#f74444"}
              value={1}
              onChange={(num) => {
                setItemQuantity(num);
              }}
              style={{ marginTop: 30 }}
            />
          </View>
          <Text style={styles.textheadings}>
            {" "}
            Final Price:{itemQuantity * itemPrice}{" "}
          </Text>
          <View style={styles.rigthHeaderButtons}>
            <Button
              color="#f74444"
              title="Add to Card"
              onPress={() =>
                showAlert({
                  id: id,
                  name: data[id].name,
                  price: itemPrice,
                  quantity: itemQuantity,
                })
              }
            />
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

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

const mapStateToProps = function (state) {
  return { state };
};
export default connect(mapStateToProps)(ItemDisplay);
