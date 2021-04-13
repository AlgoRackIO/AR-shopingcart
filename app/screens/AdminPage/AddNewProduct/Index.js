import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import ProductDes from "./ProductDes";
import ProductVerieties from "./ProductVerieties";

const item_data = {
  id: 0,
  name: "",
  description: "",
  imgURL: [""],
  itemTypes: [
    {
      typeID: 0,
      varientName: "",
      varientTypes: [{ subID: 0, label: "", value: 0 }],
    },
  ],
};

const Index = ({ navigation }) => {
  const [onDetailsPage, SetOnDetailsPage] = useState(true);
  const [itemsData, setItemData] = useState([]);
  const [mainData, setMainData] = useState(item_data);

  const backinputField = () => {
    SetOnDetailsPage(true);
  };

  const getdata = (data) => {
    setMainData({ ...data.mainData, id: itemsData.length });
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "Final View",
          params: { mainData: mainData },
        },
      ],
    });
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
          varientTypes: [{ subID: 0, label: "", value: 0 }],
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
            { subID: index.varientTypes.length, label: "", value: 0 },
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

  const addImg = () => {
    setMainData({
      ...mainData,
      imgURL: [...mainData.imgURL, ""],
    });
  };

  const deleteImg = () => {
    setMainData({
      ...mainData,
      imgURL: mainData.imgURL.filter(
        (index, i) => i != mainData.imgURL.length - 1
      ),
    });
  };

  useEffect(() => {
    AsyncStorage.getItem("data", (err, result) => {
      setItemData(JSON.parse(result));
    });
  }, []);

  return (
    <View style={styles.mainView}>
      <ScrollView>
        {onDetailsPage ? (
          <ProductDes
            onSave={setNameAndDesc}
            name={mainData.name}
            description={mainData.description}
            imgURL={mainData.imgURL}
            onDetailsPage={onDetailsPage}
            mainData={mainData}
            addImg={addImg}
            deleteImg={deleteImg}
          />
        ) : (
          <View>
            <ProductVerieties
              onSave={setdataTypes}
              mainData={mainData}
              onDeleteType={deleteType}
              addNewType={addNewType}
              addNewSubType={addNewSubType}
              backinputField={backinputField}
              deleteSubType={deleteSubType}
              getdata={getdata}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "white",
    height: "100%",
  },
});

export default Index;
