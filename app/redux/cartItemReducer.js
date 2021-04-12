import {
  ADD_TO_CART,
  CHANGE_ITEM_QUANTITY,
  REMOVE_FROM_CART,
} from "./CartItem";

const initialState = [];

const cartItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [
        ...state,
        {
          id: state.length,
          name: action.payload.name,
          price: action.payload.price,
          quantity: action.payload.quantity,
        },
      ];

    case REMOVE_FROM_CART:
      return state.filter((cartItem) => cartItem.id !== action.payload);

    case CHANGE_ITEM_QUANTITY:
      var index = state.findIndex((index) => index.id == action.payload.id);
      console.log(index, state[index]);
      state[index] = {
        ...state[index],
        id: action.payload.id,
        quantity: action.payload.quantity,
        // name: action.payload.name,
        // price: action.payload.price,
      };
      return [...state];
  }
  return state;
};

export default cartItemsReducer;
