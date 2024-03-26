/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../config/axios-customize'
import { IMeta, IOrder } from '../../types/backend'

export const fetchListOrder = createAsyncThunk('order/fetchOrder', async (_product, _thunkAPI) => {
  const res = await axios.get('/api/v1/order')
  return res.data
})

interface IOrderState {
  _id?: string
  cart: {
    _id: string
  }[]
  totalPrice: number
}

export const createOrder = createAsyncThunk('order/createOrder', async (createOrder: IOrderState, thunkAPI) => {
  const res = await axios.post('/api/v1/order', { ...createOrder })
  const data = res.data
  if (data?._id) {
    thunkAPI.dispatch(fetchListOrder())
  }
  return data
})

export const updateOrder = createAsyncThunk('order/updateOrder', async (updateOrder: IOrderState, thunkAPI) => {
  const res = await axios.patch(`/api/v1/order/${updateOrder._id}`, {
    ...updateOrder,
    quantity: 1
  })
  const data = res.data
  if (data) {
    thunkAPI.dispatch(fetchListOrder())
  }
  return data
})

export const deleteOrder = createAsyncThunk('order/deleteOrder', async (detelete: any, thunkAPI) => {
  const res = await axios.delete(`/api/v1/order/${detelete._id}`)
  const data = res.data
  thunkAPI.dispatch(fetchListOrder())
  return data
})

interface IState {
  listOrder: {
    data: IOrder[]
    meta: IMeta
  }
  isCreateSuccess: boolean
  isUpdateSuccess: boolean
  isDeleteSuccess: boolean
}

const initialState: IState = {
  listOrder: {
    data: [
      {
        _id: '',
        cart: [
          {
            _id: ''
          }
        ],
        totalPrice: 0
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

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetCreateOrder(state) {
      state.isCreateSuccess = false
    },
    resetUpadateorder(state) {
      state.isUpdateSuccess = false
    },
    resetDeleteleorder(state) {
      state.isDeleteSuccess = false
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListOrder.fulfilled, (state, action) => {
      // Add user to the state array
      state.listOrder = action.payload
    })
    builder.addCase(createOrder.fulfilled, (state, _action) => {
      // Add user to the state array
      state.isCreateSuccess = true
    })
    builder.addCase(updateOrder.fulfilled, (state, _action) => {
      // Add user to the state array
      state.isUpdateSuccess = true
    })
    builder.addCase(deleteOrder.fulfilled, (state, _action) => {
      // Add user to the state array
      state.isDeleteSuccess = true
    })
  }
})

// Action creators are generated for each case reducer function
export const { resetCreateOrder } = orderSlice.actions

export default orderSlice.reducer
