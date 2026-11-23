import { combineReducers, configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expensesSlice";
import categoriesReducer from "./categoriesSlice"
import rateReducer from "./rateSlice"
import storage from "redux-persist/es/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const persistConfig = {
    key: "expense-tracker",
    storage,
    whitelist: ["expenses", "categories"],
}
const rootReducer = combineReducers({
    expenses: expensesReducer,
    categories: categoriesReducer,
    rate: rateReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch