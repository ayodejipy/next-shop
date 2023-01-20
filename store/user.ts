import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/user";

interface InitialStates {
    user: User | undefined;
}

const initialState: InitialStates = {
    user: null as unknown as any,
};

export const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUsers: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
    },
});

export const { getUsers } = user.actions;

export default user.reducer;
