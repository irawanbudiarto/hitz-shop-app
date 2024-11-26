import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

//slice
import CartSlice from './CartSlice/CartSlice'
import FavouriteSlice from './FavouriteSlice/FavouriteSlice'
import { reduxStorage } from './storage'

const rootReducer = combineReducers({
  cart: CartSlice,
  favourite: FavouriteSlice,
})

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  //   blacklist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
