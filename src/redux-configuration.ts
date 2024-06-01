import { createSlice, configureStore } from '@reduxjs/toolkit'
import { Product } from './data-model';
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [] as Product[]
    },
    reducers: {
        addProduct: (state, item) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.products.push(item.payload);
        },
        removeProduct: (state, item) => {
            const idx = state.products.indexOf(item.payload);
            state.products.splice(idx, 1);
        }
    }
});

const store = configureStore({
    reducer: productsSlice.reducer
});
export const { addProduct, removeProduct } = productsSlice.actions

export { store }