import { useReducer } from "react";
import CartContext, { cartReducer } from "./shoppingCart";

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, {items: []});

    console.log('Cart state:', state);

    return (
        <CartContext.Provider value={{
            state,
            dispatch
        }}>
            {children}
        </CartContext.Provider>
    );
}
