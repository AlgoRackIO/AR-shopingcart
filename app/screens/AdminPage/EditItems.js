import React from "react";
import { Text } from "react-native";

const EditItems = (props) => {
  const id = props.route.params.id;
  return <Text>hello {id}</Text>;
};

export default EditItems;
