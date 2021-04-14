import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import { Card } from "react-native-elements";
import { data } from "../../data/data";
import { useDispatch, connect } from "react-redux";
import {
  ADD_TO_CART,
  CHANGE_ITEM_QUANTITY,
  REMOVE_FROM_CART,
} from "../../redux/CartItem";
import InputSpinner from "react-native-input-spinner";

const MyCart = (Props) => {
  const state = Props.state;
  const dispatch = useDispatch();
  const [totalPayment, setTotalPayment] = useState(0);

  const addItemstCard = (items) => {
    dispatch({ type: ADD_TO_CART, payload: items });
  };

  const deleteItemCard = (items) => {
    dispatch({ type: REMOVE_FROM_CART, payload: items });
  };

  const changeItemQuantity = (item) => {
    dispatch({ type: CHANGE_ITEM_QUANTITY, payload: item });
  };

  useLayoutEffect(() => {
    let tempPay = 0;
    state.forEach((item) => {
      tempPay = tempPay + item.quantity * item.price;
      setTotalPayment(tempPay);
    });
  }, [state]);

  return (
    <View>
      <ScrollView keyboardShouldPersistTaps="handled">
        {state.length ? (
          state.map((item, key) => {
            return (
              <Card key={key}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                  }}
                >
                  <View>
                    <Text style={styles.itemTitle}>Name: {item.name}</Text>
                    <Text style={styles.itemPrice}>Rs: {item.price}</Text>
                    <InputSpinner
                      max={10}
                      min={1}
                      step={1}
                      color={"#f74444"}
                      value={item.quantity}
                      onChange={(num) => {
                        changeItemQuantity({
                          id: key,
                          name: item.name,
                          price: item.price,
                          quantity: num,
                        });
                      }}
                      style={{ marginTop: 30, width: "70%" }}
                    />
                    <Text style={styles.itemPriceTotal}>
                      Total Quantity: {item.quantity}
                    </Text>
                    <Text style={styles.itemPriceTotal}>
                      Total Price:
                      {item.quantity * item.price}
                    </Text>
                  </View>
                </View>
                <View style={styles.rigthHeaderButtons}>
                  <Button
                    color="#f74444"
                    title="Delete item"
                    onPress={() => deleteItemCard(item.id)}
                  />
                  <View style={{ width: 15 }}></View>
                  {/* <Button
                    color="#f74444"
                    title="Next Process"
                    onPress={() => addItemstCard(item.id)}
                  /> */}
                </View>
              </Card>
            );
          })
        ) : (
          <Text style={styles.doShopingStyle}>
            No Item Added{"\n"}
            Kindly do shopping
          </Text>
        )}

        {state.length ? (
          <View style={{ marginTop: 20, marginBottom: 50 }}>
            <Card>
              <Text>Total Payment: {totalPayment}</Text>
            </Card>
          </View>
        ) : null}
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  itemTitle: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 17,
  },
  rigthHeaderButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    margin: 8,
    marginTop: 20,
  },
  itemPrice: {
    color: "red",
    fontSize: 15,
  },
  itemPriceTotal: {
    color: "red",
    fontSize: 15,
    marginTop: 20,
  },
  doShopingStyle: {
    color: "black",
    fontSize: 30,
    textAlign: "center",
    marginTop: "50%",
  },
});

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps)(MyCart);
