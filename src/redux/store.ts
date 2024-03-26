import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './auth/auth.slice'
import accountReducer from './auth/account.slice'
import categoryReducer from './slice/category.slice'
import brandReducer from './slice/brand.slice'
import productReducer from './slice/product.slice'
import cartReducer from './slice/cart.slice'
import userReducer from './slice/user.slice'
import orderReducer from './slice/order.slice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whiteList: ['category', 'brand']
}
const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  brand: brandReducer,
  account: accountReducer,
  product: productReducer,
  cart: cartReducer,
  users: userReducer,
  order: orderReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
