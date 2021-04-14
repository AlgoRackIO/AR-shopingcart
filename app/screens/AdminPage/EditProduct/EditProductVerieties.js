import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button as ButtonElement } from "react-native-elements";

const EditProductVerieties = (props) => {
  const [product, setProduct] = useState(props.product);
  const navigation = props.navigation;

  const deleteType = (id) => {
    setProduct({
      ...product,
      itemTypes: product.itemTypes.filter((index) => {
        if (id != index.typeID) {
          return index;
        }
      }),
    });
  };

  const addNewType = () => {
    setProduct({
      ...product,
      itemTypes: [
        ...product.itemTypes,
        {
          typeID: product.itemTypes.length,
          varientName: "",
          varientTypes: [{ subID: 0, label: "", value: 0 }],
        },
      ],
    });
  };

  const addNewSubType = (id) => {
    setProduct({
      ...product,
      itemTypes: product.itemTypes.map((index) => {
        if (id == index.typeID) {
          index.varientTypes = [
            ...index.varientTypes,
            { subID: index.varientTypes.length, label: "", value: 0 },
          ];
        }
        return index;
      }),
    });
  };

  const deleteSubType = (id, subID) => {
    setProduct({
      ...product,
      itemTypes: product.itemTypes.map((index) => {
        if (id == index.typeID) {
          index.varientTypes = index.varientTypes.filter(
            (varient) => varient.subID != subID
          );
        }
        return index;
      }),
    });
  };

  const showData = (data) => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "EditProView",
          params: { product: product },
        },
      ],
    });
  };

  const changeVarient = (text, productID, varientID, type) => {
    setProduct({
      ...product,
      itemTypes: product.itemTypes.map((index) => {
        if (productID == index.typeID) {
          index.varientTypes = index.varientTypes.map((varient) => {
            if (varientID == varient.subID) {
              if (type === "label") {
                varient.label = text;
              } else {
                varient.value = text;
              }
              return varient;
            }
            return varient;
          });
          return index;
        }
        return index;
      }),
    });
  };

  const changeProducTypeName = (text, productID) => {
    setProduct({
      ...product,
      itemTypes: product.itemTypes.map((index) => {
        if (index.typeID == productID) {
          console.log(index);
          index.varientName = text;
          return index;
        }
        return index;
      }),
    });
  };

  useEffect(() => {
    setProduct(props.product);
  }, [props.product]);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View>
        <Text style={styles.typeHeading}>Add items itemTypes</Text>
        {product.itemTypes.map((index, key) => {
          return (
            <View style={styles.typeBox} key={key}>
              <View>
                {product.itemTypes.length > 1 ? (
                  <View style={styles.typeBoxDlt}>
                    <ButtonElement
                      key={key}
                      icon={
                        <Icon name="times" size={20} color="red" type="clear" />
                      }
                      onPress={() => deleteType(index.typeID)}
                      type="clear"
                    />
                  </View>
                ) : null}
                <View>
                  <Text style={styles.typesStyle}>Type {key + 1}</Text>
                </View>
                <View style={styles.typeNameBox}>
                  <TextInput
                    key="typeName"
                    style={styles.typeInputBox}
                    placeholder={"Name"}
                    value={index.varientName}
                    onChangeText={(text) => changeProducTypeName(text, key)}
                  />
                </View>
                <View>
                  {index.varientTypes.map((varient, key1) => {
                    return (
                      <View style={styles.typeLabelPriceView} key={key1}>
                        <TextInput
                          key="typeLabel"
                          style={styles.typeInputBox}
                          placeholder={("Type", key1, "Label")}
                          value={varient.label}
                          onChangeText={(text) =>
                            changeVarient(text, key, key1, "label")
                          }
                        />
                        <TextInput
                          key="typePrice"
                          style={styles.typeInputBox}
                          placeholder="Price"
                          keyboardType="number-pad"
                          value={varient.value.toString()}
                          onChangeText={(text) =>
                            changeVarient(+text, key, key1, "value")
                          }
                        />

                        {index.varientTypes.length > 1 &&
                        varient.subID == index.varientTypes.length - 1 ? (
                          <View style={styles.typeBoxDlt}>
                            <ButtonElement
                              key={key}
                              icon={
                                <Icon
                                  name="times"
                                  size={20}
                                  color="red"
                                  type="clear"
                                />
                              }
                              onPress={() =>
                                deleteSubType(index.typeID, varient.subID)
                              }
                              type="clear"
                            />
                          </View>
                        ) : null}
                      </View>
                    );
                  })}

                  <View style={styles.typeSubBView}>
                    <View style={styles.typeSubBView2}>
                      <ButtonElement
                        icon={
                          <Icon
                            name="plus"
                            size={15}
                            color="red"
                            type="clear"
                          />
                        }
                        onPress={() => addNewSubType(index.typeID)}
                        type="clear"
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        <View
          style={{
            flex: 0,
            alignItems: "flex-end",
          }}
        >
          <View style={styles.addNewTypeBView}>
            <ButtonElement
              icon={<Icon name="plus" size={20} color="red" type="clear" />}
              onPress={addNewType}
              type="clear"
            />
          </View>
        </View>
        <View style={styles.flexButton}>
          <View style={{ marginRight: 10 }}>
            <Button title="Back" color="red" onPress={props.backinputField} />
          </View>
          <View>
            <Button title="Next" color="red" onPress={showData} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  flexButton: {
    flex: 1,
    flexDirection: "row",
    marginTop: "8%",
    justifyContent: "center",
  },
  addNewTypeBView: {
    borderWidth: 3,
    width: 60,
    height: 40,
    borderColor: "red",
    marginTop: 10,
    marginRight: 10,
  },
  typeSubBView: {
    flex: 0,
    alignItems: "flex-end",
    bottom: 43,
    right: 15,
  },
  typeSubBView2: {
    borderWidth: 3,
    width: 35,
    height: 35,
    borderColor: "red",
    marginTop: 4,
  },
  typeBoxDlt: {
    flex: 0,
    alignItems: "flex-end",
    marginBottom: -30,
  },
  typeInputBox: {
    width: "90%",
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    backgroundColor: "white",
    paddingLeft: 15,
    margin: 2,
  },
  typeLabelPriceView: {
    flex: 0,
    flexDirection: "row",
    width: "40%",
    marginLeft: 10,
  },
  typeNameBox: {
    width: "100%",
    marginLeft: 10,
  },
  typesStyle: {
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 10,
    marginTop: 15,
    fontSize: 15,
  },
  typeBox: {
    width: "95%",
    marginTop: 10,
    borderWidth: 1,
    marginLeft: 10,
  },
  typeHeading: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});

export default EditProductVerieties;
