/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../config/axios-customize'
import { IUserCart } from '../../types/backend'

export const fetchListProduct = createAsyncThunk('product/fetchProduct', async (_product, _thunkAPI) => {
  const res = await axios.get('/api/v1/users')
  return res.data
})

export const fetchUserById = createAsyncThunk('product/fetchUserById', async (users: any, _thunkAPI) => {
  const res = await axios.get(`/api/v1/users/${users._id}`)
  return res.data
})

interface IState {
  listOneUser: IUserCart
  isCreateSuccess: boolean
  isUpdateSuccess: boolean
  isDeleteSuccess: boolean
}

const initialState: IState = {
  listOneUser: {
    _id: '',
    name: '',
    cart: [
      {
        _id: '',
        quatity: 0,
        product: {
          _id: '',
          name: '',
          price: 0,
          image: [''],
          brand: {
            _id: '',
            name: '',
            description: '',
            category: ''
          },
          description: '',
          slug: '',
          quantity: 0,
          discount: 0,
          sold: 0,
          discountStartDate: null,
          discountEndDate: null
        }
      }
    ]
  },
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetCreateProduct(state) {
      state.isCreateSuccess = false
    },
    resetUpadateProduct(state) {
      state.isUpdateSuccess = false
    },
    resetDeleteleUsers(state) {
      state.isDeleteSuccess = false
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      state.listOneUser = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
export const { resetCreateProduct, resetUpadateProduct, resetDeleteleUsers } = userSlice.actions

export default userSlice.reducer
