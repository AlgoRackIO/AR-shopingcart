import { createStore } from "redux";
import cartItemsReducer from "./cartItemReducer";

const store = createStore(cartItemsReducer);

export default store;
