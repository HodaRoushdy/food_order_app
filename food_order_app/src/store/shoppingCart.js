import { createContext } from "react";

const CartContext = createContext({
    items: []
});

export const cartReducer = (state, action) => {
    console.log(state,"state in reducer")
    switch (action.type) {
        case 'addItem':
            return { items : [...state.items, action.payload]};
        case 'removeItem':
            return { items : state.items.filter((item) => item.id !== action.payload)};
        default:
            return state;
    }
};


export default CartContext;