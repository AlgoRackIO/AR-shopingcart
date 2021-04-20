import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyCart from "../screens/CustomerPage/MyCart";
import Users from "../screens/Users/Index";
import Admin from "../screens/AdminPage/Index";
import ViewProducts from "../screens/AdminPage/PDisplay";
import EditItems from "../screens/AdminPage/EditProduct/Index";
import AddProduct from "../screens/AdminPage/AddNewProduct/Index";
import FinalProView from "../screens/AdminPage/AddNewProduct/PView";
import Home from "../screens/CustomerPage/Index";
import ProductDisplay from "../screens/CustomerPage/PDisplay";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "../screens/Authentication/Index";
import SignInScreen from "../screens/Authentication/SignInScreen";
import SignUpScreen from "./../screens/Authentication/SignUpScreen";
import EditProView from "../screens/AdminPage/EditProduct/EditPView";
import AsyncStorage from "@react-native-community/async-storage";
import data from "./../data/data";

const Navigations = () => {
  const Stack = createStackNavigator();

  useEffect(() => {
    AsyncStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTitleStyle: {
            color: "red",
          },
        }}
        initialRouteName="Users"
      >
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="Authentication" component={Auth} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen
          name="MyCart"
          component={MyCart}
          options={{
            headerShown: true,
            headerTitleStyle: {
              alignSelf: "center",
              marginRight: 50,
              color: "red",
            },
          }}
        />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen
          name="ViewProducts"
          component={ViewProducts}
          options={{
            title: "Products",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="EditItems"
          component={EditItems}
          options={{
            title: "Update Product",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Add Product"
          component={AddProduct}
          options={{
            title: "Final View",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="EditProView"
          component={EditProView}
          options={{
            title: "Final View",
            headerShown: true,
            headerTitleStyle: {
              alignSelf: "center",
              marginLeft: 30,
              color: "red",
            },
          }}
        />
        <Stack.Screen
          name="Final View"
          component={FinalProView}
          options={{
            title: "Final View",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="ProductDisplay"
          component={ProductDisplay}
          options={{
            headerTitleStyle: {
              alignSelf: "center",
              marginRight: 50,
            },
            title: "Product",
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;
