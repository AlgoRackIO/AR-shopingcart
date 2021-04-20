import React, { useState } from "react";
import { View } from "react-native";
import EditProductDes from "./EditPDetails";
import EditProductVerieties from "./EditPVerients";

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
          product={product}
          backinputField={backinputField}
          navigation={props.navigation}
        />
      )}
    </View>
  );
};

export default EditItems;
