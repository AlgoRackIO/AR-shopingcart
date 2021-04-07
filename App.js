import React from "react";
import Auth from "./app/screens/Authentication/Auth";
import SignInScreen from "./app/screens/Authentication/SignInScreen";
import SignUpScreen from "./app/screens/Authentication/SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./app/screens/CustomerPage/Home";
import ItemDisplay from "./app/screens/CustomerPage/ItemDisplay";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import MyCart from "./app/screens/CustomerPage/MyCart";
import Users from "./app/screens/Users/Users";
import Admin from "./app/screens/AdminPage/Admin";
import ViewItems from "./app/screens/AdminPage/ViewItems";
import EditItems from "./app/screens/AdminPage/EditItems";
import AddItem from "./app/screens/AdminPage/AddItem";
import AddItemTemp from "./app/screens/AdminPage/AddItemTemp";
import FileAdd from "./app/screens/AdminPage/FileAdd";

export default function App({ navigation }) {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
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
          <Stack.Screen name="AddItem" component={AddItem} />
          <Stack.Screen name="AddItemTemp" component={AddItemTemp} />
          <Stack.Screen
            name="FileAdd"
            component={FileAdd}
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
    </Provider>
  );
}
