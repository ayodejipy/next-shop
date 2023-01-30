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
            state.user = initialState.user
        },
        addToCart: (state, action: PayloadAction<IProduct>) => {
            // check if product exists
            const index = state.cart?.findIndex((product) => product.item._id == action.payload._id)
            // increase quantity if it does
            if (typeof index == 'number' && index >= 0) {
                state.cart[index].quantity++;
                return
            }
            // add a new one to the end of the list
            state.cart?.push({item: action.payload, quantity: 1})
        }
    },
});

export const { getUsers, addToCart } = user.actions;

export default user.reducer;
