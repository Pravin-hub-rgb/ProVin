import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface RateState {
    rate: number | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: RateState = {
    rate: null,
    status: "idle",
    error: null
}

export const fetchRate = createAsyncThunk(
    "rates/fetch",
    async (): Promise<number> => {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        return json.rates.INR;
    }
)

export const rateSlice = createSlice({
    name: "rate",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRate.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchRate.fulfilled, (state, action) => {
                state.rate = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchRate.rejected, (state, action) => {
                state.error = action.error.message ?? "Failed to fetch rate";
                state.status = "failed"
            })

    }
})

export default rateSlice.reducer;