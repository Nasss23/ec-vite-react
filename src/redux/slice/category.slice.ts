/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../config/axios-customize'
import { ICatagory, IMeta } from '../../types/backend'

interface IParams {
  _id?: string
  name?: string
  description?: string
}

export const fetchListCategory = createAsyncThunk('category/fetchListCategory', async (categoryId, thunkAPI) => {
  // Lấy trường name từ trạng thái Redux nếu có
  const res = await axios.get('/api/v1/category') // Thêm tham số query string name vào yêu cầu axios
  return res.data
})

export const fetchListCategoryParams = createAsyncThunk(
  'category/fetchListCategoryParams',
  async (categoryId: ICategory, thunkAPI) => {
    const res = await axios.get('/api/v1/category', { params: { name: categoryId.name } })
    return res.data
  }
)

interface ICategory {
  _id?: string
  name?: string
  description?: string
}
export const createACategory = createAsyncThunk('category/createACategory', async (createCate: ICategory, thunkAPI) => {
  const res = await axios.post('/api/v1/category', { ...createCate })
  const data = res.data
  if (data?._id) {
    thunkAPI.dispatch(fetchListCategory())
  }
  return data
})

export const updateACategory = createAsyncThunk('category/updateACategory', async (updateCate: ICategory, thunkAPI) => {
  const res = await axios.patch(`/api/v1/category/${updateCate._id}`, {
    ...updateCate
  })
  const data = res.data
  if (data) {
    thunkAPI.dispatch(fetchListCategory())
  }
  return data
})

export const deleteACategory = createAsyncThunk('category/deleteACategory', async (updateCate: any, thunkAPI) => {
  const res = await axios.delete(`/api/v1/category/${updateCate._id}`)
  const data = res.data
  thunkAPI.dispatch(fetchListCategory())
  return data
})

interface IState {
  listCategory: {
    data: ICatagory[]
    meta: IMeta
  }
  isCreateSuccess: boolean
  isUpdateSuccess: boolean
  isDeleteSuccess: boolean
}

const initialState: IState = {
  listCategory: {
    data: [
      {
        _id: '',
        name: '',
        description: '',
        brand: [
          {
            _id: '',
            name: '',
            description: ''
          }
        ]
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

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    resetCreateCategory(state) {
      state.isCreateSuccess = false
    },
    resetUpadateCategory(state) {
      state.isUpdateSuccess = false
    },
    resetDeleteleCategory(state) {
      state.isDeleteSuccess = false
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListCategory.fulfilled, (state, action) => {
      // Add user to the state array
      state.listCategory = action.payload
    })
    builder.addCase(createACategory.fulfilled, (state, action) => {
      // Add user to the state array
      state.isCreateSuccess = true
    })
    builder.addCase(updateACategory.fulfilled, (state, action) => {
      // Add user to the state array
      state.isUpdateSuccess = true
    })
    builder.addCase(deleteACategory.fulfilled, (state, action) => {
      // Add user to the state array
      state.isDeleteSuccess = true
    })
  }
})

// Action creators are generated for each case reducer function
export const { resetCreateCategory, resetUpadateCategory } = categorySlice.actions

export default categorySlice.reducer
