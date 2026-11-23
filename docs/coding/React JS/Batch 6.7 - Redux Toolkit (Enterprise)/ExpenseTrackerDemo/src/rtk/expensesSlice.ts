import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Expense } from "../types/expense";
type ExpenseState = {
    items: Expense[],
    filter: string,
}
const initialState: ExpenseState = {
    items: [{
        id: "1",
        date: "2026-11-20T15:00:00",
        title: "Bus fare",
        category: "Travel",
        amount: 2,
    },
    {
        id: "2",
        date: "2026-11-20T13:15:00",
        title: "Lunch",
        category: "Food",
        amount: 12
    },],
    filter: "All"
}

const expensesSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload
        },
        addExpense: (state, action: PayloadAction<Expense>) => {
            state.items.push(action.payload)
        },
        deleteExpense: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
        }
    }
})

export const { setFilter, addExpense, deleteExpense } = expensesSlice.actions;

export default expensesSlice.reducer;