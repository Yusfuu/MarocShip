import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState, AppThunk } from "app/store";

export interface userState {
    payload: any | null;
}

const initialState: userState = {
    payload: null
};


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<object>) => {
            state.payload = action.payload;
        },
        logOut: (state) => {
            state.payload = null;
        }
    }
});

export const { logIn, logOut } = userSlice.actions;


export default userSlice.reducer;
