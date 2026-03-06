import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // action.payload is expected to be a "plant" object: { name, image, description, cost }
    addItem: (state, action) => {
      const plant = action.payload;

      // If item already exists, increment quantity; otherwise add it with quantity 1
      const existingItem = state.items.find((item) => item.name === plant.name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...plant, quantity: 1 });
      }
    },

    // action.payload can be either: { name: 'Snake Plant' } OR just 'Snake Plant'
    removeItem: (state, action) => {
      const name = typeof action.payload === 'string' ? action.payload : action.payload?.name;
      state.items = state.items.filter((item) => item.name !== name);
    },

    // action.payload expected: { name: string, amount: number }
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload || {};

      const itemToUpdate = state.items.find((item) => item.name === name);
      if (!itemToUpdate) return;

      // Keep quantity within valid bounds; remove if set to 0 or less
      if (Number(amount) <= 0) {
        state.items = state.items.filter((item) => item.name !== name);
        return;
      }

      itemToUpdate.quantity = Number(amount);
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
