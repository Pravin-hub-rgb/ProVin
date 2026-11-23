import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


const initialState: string[] = ["Food", "Travel", "Shopping", "Bills", "Other"]


const categoriesSlice = createSlice({
    name: "categoies",
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<string>) => {
            const name = action.payload.trim();
            const exists = state.some(
                (c) => c.toLocaleLowerCase() === name.toLocaleLowerCase()
            )
            const reserved = name.toLowerCase() === "all";
            if (name && !exists && !reserved) {
                state.push(name);
            }
        }
    }
})

export const {addCategory} = categoriesSlice.actions;
export default categoriesSlice.reducer;