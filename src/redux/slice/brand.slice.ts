/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../config/axios-customize'
import { IBrand, IMeta } from '../../types/backend'

export const fetchListBrand = createAsyncThunk('brand/fetchUser', async (_brand, _thunkAPI) => {
  const res = await axios.get('/api/v1/brand')
  return res.data
})

interface IBrandState {
  _id?: string
  name: string
  description: string
  category: string
}
export const createABrand = createAsyncThunk('brand/createABrand', async (createBrand: IBrandState, thunkAPI) => {
  const res = await axios.post('/api/v1/brand', { ...createBrand })
  const data = res.data
  if (data?._id) {
    thunkAPI.dispatch(fetchListBrand())
  }
  return data
})

export const updateABrand = createAsyncThunk('brand/updateABrand', async (updateCate: IBrandState, thunkAPI) => {
  const res = await axios.patch(`/api/v1/brand/${updateCate._id}`, {
    ...updateCate
  })
  const data = res.data
  if (data) {
    thunkAPI.dispatch(fetchListBrand())
  }
  return data
})

export const deleteABrand = createAsyncThunk('brand/deleteABrand', async (detelete: any, thunkAPI) => {
  const res = await axios.delete(`/api/v1/brand/${detelete._id}`)
  const data = res.data
  thunkAPI.dispatch(fetchListBrand())
  return data
})

interface IState {
  listBrand: {
    data: IBrand[]
    meta: IMeta
  }
  isCreateSuccess: boolean
  isUpdateSuccess: boolean
  isDeleteSuccess: boolean
}

const initialState: IState = {
  listBrand: {
    data: [
      {
        _id: '',
        name: '',
        description: '',
        category: {
          _id: '',
          name: '',
          description: '',
          brand: ['']
        }
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

export const brandSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    resetCreateBrand(state) {
      state.isCreateSuccess = false
    },
    resetUpadateBrand(state) {
      state.isUpdateSuccess = false
    },
    resetDeleteleBrand(state) {
      state.isDeleteSuccess = false
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListBrand.fulfilled, (state, action) => {
      // Add user to the state array
      state.listBrand = action.payload
    })
    builder.addCase(createABrand.fulfilled, (state, _action) => {
      // Add user to the state array
      state.isCreateSuccess = true
    })
    builder.addCase(updateABrand.fulfilled, (state, _action) => {
      // Add user to the state array
      state.isUpdateSuccess = true
    })
    builder.addCase(deleteABrand.fulfilled, (state, _action) => {
      // Add user to the state array
      state.isDeleteSuccess = true
    })
  }
})

// Action creators are generated for each case reducer function
export const { resetCreateBrand, resetUpadateBrand } = brandSlice.actions

export default brandSlice.reducer
