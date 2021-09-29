import { createContext, Dispatch, useReducer } from "react";
import { CartState, CartData, OrderInfo } from "../types/Cart";

type ActionType = {
  type: "CART_RETRIEVE_REQUEST" | "CART_RETRIEVE_SUCCESS" | "ORDER_SET";
  payload?: any;
};

type StateType = {
  cart: CartState;
  order: OrderInfo;
};

export const Store =
  createContext<{ state: StateType; dispatch: Dispatch<ActionType> }>(
    undefined
  );

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "CART_RETRIEVE_REQUEST":
      return {
        ...state,
        cart: { loading: true },
      };
    case "CART_RETRIEVE_SUCCESS":
      return {
        ...state,
        cart: { loading: false, data: action.payload },
      };
    case "ORDER_SET":
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const initialState: StateType = {
    cart: { loading: true },
    order:
      typeof window !== "undefined" &&
      window.localStorage.getItem("order_receipt")
        ? JSON.parse(window.localStorage.getItem("order_receipt"))
        : null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};
