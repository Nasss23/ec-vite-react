/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../config/axios-customize'
import { ICart, IMeta } from '../../types/backend'

export const fetchListCart = createAsyncThunk('cart/fetchCart', async (_product, _thunkAPI) => {
  const res = await axios.get('/api/v1/carts')
  return res.data
})

interface ICartState {
  _id?: string
  product?: string
  quantity?: number // Đã sửa từ "quatity" thành "quantity"
}

export const createCart = createAsyncThunk('cart/createCart', async (createCart: ICartState, thunkAPI) => {
  const res = await axios.post('/api/v1/carts', { ...createCart })
  const data = res.data
  if (data?._id) {
    thunkAPI.dispatch(fetchListCart())
  }
  return data
})

export const updateCart = createAsyncThunk('cart/updateCart', async (updateCart: ICartState, thunkAPI) => {
  const res = await axios.patch(`/api/v1/carts/${updateCart._id}`, {
    ...updateCart,
    quantity: 1
  })
  const data = res.data
  if (data) {
    thunkAPI.dispatch(fetchListCart())
  }
  return data
})

export const incrementCart = createAsyncThunk('cart/incrementCart', async (updateCart: ICartState, thunkAPI) => {
  const res = await axios.get(`/api/v1/carts/${updateCart._id}`)
  const currentQuantity = res.data.quantity

  const updatedQuantity = currentQuantity + 1
  const updateRes = await axios.patch(`/api/v1/carts/${updateCart._id}`, {
    ...updateCart,
    quantity: updatedQuantity
  })

  const data = updateRes.data
  if (data) {
    thunkAPI.dispatch(fetchListCart())
  }
  return data
})

export const decrementCart = createAsyncThunk('cart/decrementCart', async (updateCart: ICartState, thunkAPI) => {
  const res = await axios.get(`/api/v1/carts/${updateCart._id}`)
  let currentQuantity = res.data.quantity

  let updatedQuantity = currentQuantity - 1
  updatedQuantity = Math.max(updatedQuantity, 1)

  const updateRes = await axios.patch(`/api/v1/carts/${updateCart._id}`, {
    ...updateCart,
    quantity: updatedQuantity
  })

  const data = updateRes.data
  thunkAPI.dispatch(fetchListCart())

  return data
})

export const deleteCart = createAsyncThunk('cart/deleteCart', async (detelete: any, thunkAPI) => {
  const res = await axios.delete(`/api/v1/carts/${detelete._id}`)
  const data = res.data
  thunkAPI.dispatch(fetchListCart())
  return data
})

interface IState {
  listCart: {
    data: ICart[]
    meta: IMeta
  }
  isCreateSuccess: boolean
  isUpdateSuccess: boolean
  isDeleteSuccess: boolean
}

const initialState: IState = {
  listCart: {
    data: [
      {
        _id: '',
        quantity: 0,
        product: {
          _id: '',
          name: '',
          price: 0,
          image: ''
        },
        user: ''
      }
    ],
    meta: {
      current: null,
      pageSize: null,
      pages: 1,
      total: 1
    }
  },
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCreateCart(state) {
      state.isCreateSuccess = false
    },
    resetUpadateCart(state) {
      state.isUpdateSuccess = false
    },
    resetDeleteleCart(state) {
      state.isDeleteSuccess = false
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListCart.fulfilled, (state, action) => {
      // Add user to the state array
      state.listCart = action.payload
    })
    builder.addCase(createCart.fulfilled, (state, _action) => {
      // Add user to the state array
      state.isCreateSuccess = true
    })
    builder.addCase(updateCart.fulfilled, (state, _action) => {
      // Add user to the state array
      state.isUpdateSuccess = true
    })
    builder.addCase(deleteCart.fulfilled, (state, _action) => {
      // Add user to the state array
      state.isDeleteSuccess = true
    })
  }
})

// Action creators are generated for each case reducer function
export const { resetCreateCart } = cartSlice.actions

export default cartSlice.reducer
