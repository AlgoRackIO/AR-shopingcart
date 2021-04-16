import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    alignItems: "center",
    // justifyContent: "center",
  },
});

export default Loading;
