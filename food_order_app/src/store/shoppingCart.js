import { createContext } from "react";

const CartContext = createContext({
    items: [{
        meal: {},
        quantity: 0
    }]
});

export const cartReducer = (state, action) => {
    console.log(state,"state in reducer")
    switch (action.type) {
        case 'addItem':
            {
                const sameItem = state.items.find(item => item.meal.id === action.payload.id)
                if (sameItem) {
                return {
                    items: state.items.map(item =>
                        item.meal.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                };
            } else {
                return {
                    items: [...state.items, { meal: action.payload, quantity: 1 }]
                };
                }
            }
        case 'removeItem':
            return { items: state.items.filter(item => item.meal.id !== action.payload) };
        
        case 'increaseQuantity':
            return {
                items: state.items.map(item =>
                    item.meal.id === action.payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
        case 'decreaseQuantity':
            {
                const theItem = state.items.find(item => item.meal.id === action.payload)
                if (theItem.quantity === 1) {
                    return {
                        items: state.items.filter(item => item.meal.id !== action.payload)
                    }
                } else {
                    return {
                        items: state.items.map(item => item.meal.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item)
                    };
                }
            }
        default:
            return state;
    }
};


export default CartContext;