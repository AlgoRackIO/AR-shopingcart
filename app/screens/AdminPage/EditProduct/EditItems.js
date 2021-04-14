import React, { useState } from "react";
import { Text, View } from "react-native";
import EditProductDes from "./EditProductDes";
import EditProductVerieties from "./EditProductVerieties";

const EditItems = (props) => {
  const [product, SetProduct] = useState(props.route.params.product);
  const [onDetailsPage, SetOnDetailsPage] = useState(true);

  const setNameAndDesc = (data) => {
    SetOnDetailsPage(false);
    SetProduct({
      ...product,
      name: data.name,
      description: data.description,
      imgURL: data.imgURL,
    });
  };

  const backinputField = () => {
    SetOnDetailsPage(true);
  };

  return (
    <View>
      {onDetailsPage ? (
        <EditProductDes
          product={product}
          onDetailsPage={onDetailsPage}
          onSave={setNameAndDesc}
        />
      ) : (
        <EditProductVerieties
          // onSave={setdataTypes}
          product={product}
          backinputField={backinputField}
          navigation={props.navigation}
        />
      )}
    </View>
  );
};

export default EditItems;
