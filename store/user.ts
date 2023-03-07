import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/user";
import type { IProduct, ICartProduct } from "@/types/product";

interface InitialStates {
    user: User;
    cart: ICartProduct[];
}

const initialState: InitialStates = {
    user: null as unknown as any,
    cart: [],
};

export const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUsers: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = initialState.user;
        },
        emptyCart: (state) => {
            state.cart = initialState.cart;
        },
        addToCart: (state, action: PayloadAction<IProduct>) => {
            // check if product exists
            const index = state.cart?.findIndex((product) => product.item._id == action.payload._id);
            // increase quantity if it does
            if (typeof index == "number" && index >= 0) {
                state.cart[index].quantity++;
                return;
            }
            // add a new one to the end of the list
            state.cart?.push({ item: action.payload, quantity: 1 });
        },
        increaseItem: (state, action: PayloadAction<ICartProduct>) => {
            const productIndex = state.cart.findIndex((cartItem) => cartItem.item._id == action.payload.item._id);
            state.cart[productIndex].quantity++;
        },
        decreaseItem: (state, action: PayloadAction<ICartProduct>) => {
            const productIndex = state.cart.findIndex((cartItem) => cartItem.item._id == action.payload.item._id);
            if (action.payload.quantity > 1) {
                state.cart[productIndex].quantity--;
            } else {
                state.cart.splice(productIndex, 1);
            }
        },
        removeItem: (state, action: PayloadAction<ICartProduct>) => {
            const product = action.payload;
            const productIndex = state.cart.findIndex((cartItem) => cartItem.item._id == action.payload.item._id);
            state.cart.splice(productIndex, 1);
        },
    },
});

export const { getUsers, clearUser, addToCart, increaseItem, decreaseItem, removeItem, emptyCart } = user.actions;

export default user.reducer;
