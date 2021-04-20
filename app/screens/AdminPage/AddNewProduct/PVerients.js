import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button as ButtonElement } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

const ProductVerieties = (props) => {
  const [mainData, setMainData] = useState({
    ...props.mainData,
  });

  const showData = () => {
    props.getdata({ mainData });
  };

  useEffect(() => {
    setMainData(props.mainData);
  }, [props.mainData]);
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View>
        <Text style={styles.typeHeading}>Add items itemTypes</Text>
        {mainData.itemTypes.map((index, key) => {
          return (
            <View style={styles.typeBox} key={key}>
              <View>
                {mainData.itemTypes.length > 1 &&
                index.typeID == mainData.itemTypes.length - 1 ? (
                  <View style={styles.typeBoxDlt}>
                    <ButtonElement
                      key={key}
                      icon={
                        <Icon name="times" size={20} color="red" type="clear" />
                      }
                      onPress={() => props.deleteType(index.typeID)}
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
                    onChangeText={(text) => (index.varientName = text)}
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
                          onChangeText={(text) => (varient.label = text)}
                        />
                        <TextInput
                          key="typePrice"
                          style={styles.typeInputBox}
                          placeholder="Price"
                          keyboardType="number-pad"
                          onChangeText={(text) => (varient.value = +text)}
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
                                props.deleteSubType(index.typeID, varient.subID)
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
                        onPress={() => props.addNewSubType(index.typeID)}
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
              onPress={props.addNewType}
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

export default ProductVerieties;
