import { createContext } from "react";
import { increaseQuantityLogic } from "../utils/helpers";
import { ADD_ITEM, DECREASE_QUANTITY, INCREASE_QUANTITY, REMOVE_ITEM } from "../utils/constants";

const CartContext = createContext({
    items: [{
        meal: {},
        quantity: 0
    }]
});

export const cartReducer = (state, action) => {

    switch (action.type) {
        case ADD_ITEM:
            
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
            
        case REMOVE_ITEM:
            return { items: state.items.filter(item => item.meal.id !== action.payload) };
        
        case INCREASE_QUANTITY:
            return {
                items : increaseQuantityLogic({ id: action.payload, arr: state.items })
            }
        case DECREASE_QUANTITY:
            
                const theItem = state.items.find(item => item.meal.id === action.payload)
                if (!theItem) return state;
                if (theItem.quantity === 1) {
                    return {
                        items: state.items.filter(item => item.meal.id !== action.payload)
                    }
                } else {
                    return {
                        items: state.items.map(item => item.meal.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item)
                    };
                }
            
        default:
            return state;
    }
};


export default CartContext;