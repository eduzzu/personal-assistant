"use client";

import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import conversationsSlice from './slices/conversationsSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        conversations: conversationsSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;