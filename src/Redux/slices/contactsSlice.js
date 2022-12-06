import { createSlice } from '@reduxjs/toolkit';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    add(state, action) {
      state.unshift(action.payload);
    },
    remove(state, action) {
      return state.filter(contact => contact.number !== action.payload);
    },
  },
});

export const { add, remove } = contactsSlice.actions;
