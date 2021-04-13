import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyCart from "../screens/CustomerPage/MyCart";
import Users from "../screens/Users/Users";
import Admin from "../screens/AdminPage/AdminHome/Admin";
import ViewItems from "../screens/AdminPage/ViewItems";
import EditItems from "../screens/AdminPage/EditProduct/EditItems";
import Index from "../screens/AdminPage/AddNewProduct/Index";
import FinalProView from "../screens/AdminPage/AddNewProduct/FinalProView";
import Home from "../screens/CustomerPage/Home";
import ItemDisplay from "../screens/CustomerPage/ItemDisplay";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "../screens/Authentication/Auth";
import SignInScreen from "../screens/Authentication/SignInScreen";
import SignUpScreen from "./../screens/Authentication/SignUpScreen";

const Navigations = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Users">
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="Authentication" component={Auth} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MyCart" component={MyCart} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="ViewItems" component={ViewItems} />
        <Stack.Screen name="EditItems" component={EditItems} />
        <Stack.Screen name="Add Product" component={Index} />
        <Stack.Screen
          name="Final View"
          component={FinalProView}
          options={{
            title: "File Added",
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "My home",
          }}
        />
        <Stack.Screen name="ItemDisplay" component={ItemDisplay} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;
