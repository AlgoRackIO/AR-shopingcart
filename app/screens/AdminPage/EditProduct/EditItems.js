import React, { useState } from "react";
import { Text } from "react-native";
import EditProductDes from "./EditProductDes";

const EditItems = (props) => {
  const product = props.route.params.product;
  const [onDetailsPage, SetOnDetailsPage] = useState(true);
  return <EditProductDes product={product} onDetailsPage={onDetailsPage} />;
};

export default EditItems;
