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
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          quantity: action.payload.quantity,
        },
      ];
    // }

    case REMOVE_FROM_CART:
      return state.filter((cartItem) => cartItem.id !== action.payload);

    case CHANGE_ITEM_QUANTITY:
      var index = state.findIndex((index) => index.id == action.payload.id);
      state[index] = {
        id: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
        quantity: action.payload.quantity,
      };
      return [...state];
  }
  return state;
};

export default cartItemsReducer;
