import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyCart from "../screens/CustomerPage/MyCart";
import Users from "../screens/Users/Users";
import Admin from "../screens/AdminPage/Admin";
import ViewProducts from "../screens/AdminPage/ViewProducts";
import EditItems from "../screens/AdminPage/EditProduct/EditItems";
import AddProduct from "../screens/AdminPage/AddNewProduct/AddProduct";
import FinalProView from "../screens/AdminPage/AddNewProduct/FinalProView";
import Home from "../screens/CustomerPage/Home";
import ProductDisplay from "../screens/CustomerPage/ProductDisplay";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "../screens/Authentication/Auth";
import SignInScreen from "../screens/Authentication/SignInScreen";
import SignUpScreen from "./../screens/Authentication/SignUpScreen";
import EditProView from "../screens/AdminPage/EditProduct/EditProView";

const Navigations = () => {
  const Stack = createStackNavigator();
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
