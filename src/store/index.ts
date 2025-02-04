// src/store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage for web

// Configure persist settings
const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['auth'], // Optionally, only persist specific slices
};

const rootReducer = combineReducers({
  auth: authReducer,
  // add other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disable serializable check for redux-persist
      serializableCheck: false,
    }),
});


// TypeScript helpers
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
