import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button as ButtonElement } from "react-native-elements";
import { data } from "../../data/data";

const item_data = {
  id: data.length,
  name: "",
  description: "",
  imgURL: "",
  itemTypes: [
    {
      typeID: 0,
      varientName: "",
      varientTypes: [{ subID: 0, name: "", price: 0 }],
    },
  ],
};

const AddItem = ({ navigation }) => {
  const [onDetailsPage, SetOnDetailsPage] = useState(true);
  const [mainData, setMainData] = useState(item_data);
  const backinputField = () => {
    SetOnDetailsPage(true);
  };

  const getdata = (data) => {
    setMainData(data.mainData);
    navigation.navigate("FileAdd");
  };

  const setNameAndDesc = (data) => {
    SetOnDetailsPage(data.SetOnDetailsPage);
    setMainData({
      ...mainData,
      name: data.name,
      description: data.description,
      imgURL: data.imgURL,
    });
  };

  const setdataTypes = (mainData) => {
    setMainData(mainData);
  };

  const addNewType = () => {
    setMainData({
      ...mainData,
      itemTypes: [
        ...mainData.itemTypes,
        {
          typeID: mainData.itemTypes.length,
          varientName: "",
          varientTypes: [{ subID: 0, name: "", price: 0 }],
        },
      ],
    });
  };

  const addNewSubType = (id) => {
    setMainData({
      ...mainData,
      itemTypes: mainData.itemTypes.map((index) => {
        if (id == index.typeID) {
          index.varientTypes = [
            ...index.varientTypes,
            { subID: index.varientTypes.length, name: "", price: 0 },
          ];
        }
        return index;
      }),
    });
  };

  const deleteType = (id) => {
    setMainData({
      ...mainData,
      itemTypes: mainData.itemTypes.filter((index) => {
        if (id != index.typeID) {
          return index;
        }
      }),
    });
  };

  const deleteSubType = (id, subID) => {
    setMainData({
      ...mainData,
      itemTypes: mainData.itemTypes.map((index) => {
        if (id == index.typeID) {
          index.varientTypes = index.varientTypes.filter(
            (varient) => varient.subID != subID
          );
        }
        return index;
      }),
    });
  };

  return (
    <View style={styles.mainView}>
      <ScrollView>
        {onDetailsPage ? (
          <GetInputField
            onSave={setNameAndDesc}
            name={mainData.name}
            description={mainData.description}
            imgURL={mainData.imgURL}
            onDetailsPage={onDetailsPage}
            mainData={mainData}
          />
        ) : (
          <View>
            <GetItemTypes
              onSave={setdataTypes}
              mainData={mainData}
              onDeleteType={deleteType}
              addNewType={addNewType}
              addNewSubType={addNewSubType}
              backinputField={backinputField}
              deleteSubType={deleteSubType}
              getdata={getdata}
              mainData={mainData}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const GetInputField = (props) => {
  const [name, setName] = useState(props.name);
  const [description, SetDescription] = useState(props.description);
  const [onDetailsPage, SetOnDetailsPage] = useState(props.onDetailsPage);
  const [imgURL, setImgURl] = useState(props.imgURL);

  const goTypePage = () => {
    if (name && description && imgURL) {
      SetOnDetailsPage(true);
      props.onSave({ name, description, onDetailsPage, imgURL });
    } else {
      Alert.alert("Kindly Fill Each box!");
    }
  };

  return (
    <View style={styles.inputNameMView}>
      <Text style={styles.headText}>Kindly Fill Item Details</Text>
      <View style={styles.inputNameBoxView}>
        <TextInput
          key="Name"
          style={styles.inputNameDes}
          placeholder="name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          key="ImgURL"
          style={styles.inputNameDes}
          placeholder="Img URl"
          value={imgURL}
          onChangeText={setImgURl}
        />
        <TextInput
          key="description"
          style={[styles.inputNameDes, { height: 70 }]}
          placeholder="description"
          value={description}
          onChangeText={(text) => SetDescription(text)}
        />
        <View style={styles.inputNameNextB}>
          <Button title="Next" color="red" onPress={goTypePage} />
        </View>
      </View>
    </View>
  );
};

const GetItemTypes = (props) => {
  const [mainData, setMainData] = useState(props.mainData);

  const showData = () => {
    props.getdata({ mainData });
  };

  useEffect(() => {
    setMainData(props.mainData);
  }, [props.mainData]);
  return (
    <View>
      <Text style={styles.typeHeading}>Add items itemTypes</Text>
      {mainData.itemTypes.map((index, key) => (
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
                  onPress={() => props.onDeleteType(index.typeID)}
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
                placeholder={" Name"}
                onChangeText={(text) => (index.varientName = text)}
              />
            </View>
            <View>
              {index.varientTypes.map((varient, key1) => (
                <View style={styles.typeLabelPriceView} key={key1}>
                  <TextInput
                    key="typeLabel"
                    style={styles.typeInputBox}
                    placeholder={("Type", key1, "Label")}
                    onChangeText={(text) => (varient.name = text)}
                  />
                  <TextInput
                    key="typePrice"
                    style={styles.typeInputBox}
                    placeholder="Price"
                    keyboardType="number-pad"
                    onChangeText={(text) => (varient.price = +text)}
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
              ))}

              <View style={styles.typeSubBView}>
                <View style={styles.typeSubBView2}>
                  <ButtonElement
                    icon={
                      <Icon name="plus" size={15} color="red" type="clear" />
                    }
                    onPress={() => props.addNewSubType(index.typeID)}
                    type="clear"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      ))}
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
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  mainView: {
    backgroundColor: "white",
    height: "100%",
  },
  addNewTypeBView: {
    borderWidth: 3,
    width: 60,
    height: 40,
    borderColor: "red",
    marginTop: 10,
    marginRight: 10,
  },

  inputNameDes: {
    width: "80%",
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    backgroundColor: "white",
    paddingLeft: 15,
    margin: 2,
  },
  inputNameNextB: {
    width: "40%",
    marginTop: 20,
  },
  inputNameBoxView: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    marginTop: "10%",
  },
  inputNameMView: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    marginTop: "10%",
  },
  typeHeading: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  typeBox: {
    width: "95%",
    marginTop: 10,
    borderWidth: 1,
    marginLeft: 10,
  },
  typeBoxDlt: {
    flex: 0,
    alignItems: "flex-end",
    marginBottom: -30,
  },
  typeNameBox: {
    width: "100%",
    marginLeft: 10,
  },
  typeLabelPriceView: {
    flex: 0,
    flexDirection: "row",
    width: "40%",
    marginLeft: 10,
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
  nameScreen: {
    flex: 1,
    alignItems: "center",
    width: "90%",
    marginTop: "10%",
  },
  nameSButton: {
    width: "20%",
    marginTop: 20,
  },
  inputView: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    width: "100%",
    marginTop: 10,
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
    paddingLeft: 15,
    margin: 2,
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
  typesStyle: {
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 10,
    marginTop: 15,
    fontSize: 15,
  },
  headText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "red",
    marginTop: 80,
  },
  inputBox: {
    width: "90%",
    height: 80,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
    paddingLeft: 15,
    margin: 2,
  },

  button: {
    width: "20%",
  },
  flexButton: {
    flex: 1,
    flexDirection: "row",
    marginTop: "8%",
    justifyContent: "center",
  },
  flexInput: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AddItem;
