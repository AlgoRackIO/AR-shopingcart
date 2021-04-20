import React from "react";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import Navigations from "./app/Natigation/Index";

const App = () => {
  return (
    <Provider store={store}>
      <Navigations />
    </Provider>
  );
};

export default App;
