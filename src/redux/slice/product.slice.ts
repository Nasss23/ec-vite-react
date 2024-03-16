/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../config/axios-customize'
import { IBrand, IMeta, IProduct } from '../../types/backend'

export const fetchListProduct = createAsyncThunk('product/fetchProduct', async (product, thunkAPI) => {
  const res = await axios.get('/api/v1/product')
  return res.data
})

export const fetchListProductParams = createAsyncThunk(
  'product/fetchListProductParams',
  async (product: IProductState, thunkAPI) => {
    const res = await axios.get('/api/v1/product', { params: { name: product.name } })
    return res.data
  }
)

export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (product: IProductState, thunkAPI) => {
    const res = await axios.get(`/api/v1/product/${product._id}`)
    return res.data
  }
)

interface IProductState {
  _id?: string
  name?: string | string[]
  price?: number
  image?: string
  brand?: IBrand
  description?: string
  quantity?: number
  discount?: number
  discountStartDate?: Date | null
  discountEndDate?: Date | null
}
export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (createProduct: IProductState, thunkAPI) => {
    const res = await axios.post('/api/v1/product', { ...createProduct })
    const data = res.data
    if (data?._id) {
      thunkAPI.dispatch(fetchListProduct())
    }
    return data
  }
)

export const updateProduct = createAsyncThunk('product/updateProduct', async (updateCate: IProductState, thunkAPI) => {
  const res = await axios.patch(`/api/v1/product/${updateCate._id}`, {
    ...updateCate
  })
  const data = res.data
  if (data) {
    thunkAPI.dispatch(fetchListProduct())
  }
  return data
})

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (detelete: any, thunkAPI) => {
  const res = await axios.delete(`/api/v1/product/${detelete._id}`)
  const data = res.data
  thunkAPI.dispatch(fetchListProduct())
  return data
})

interface IState {
  listProduct: {
    data: IProduct[]
    meta: IMeta
  }
  listProductParams: {
    data: IProduct[]
    meta: IMeta
  }
  product: IProduct
  isCreateSuccess: boolean
  isUpdateSuccess: boolean
  isDeleteSuccess: boolean
}

const initialState: IState = {
  listProduct: {
    data: [
      {
        _id: '',
        name: '',
        price: 0,
        image: '',
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
    ],
    meta: {
      current: null,
      pageSize: null,
      pages: 1,
      total: 1
    }
  },
  listProductParams: {
    data: [
      {
        _id: '',
        name: '',
        price: 0,
        image: '',
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
    ],
    meta: {
      current: null,
      pageSize: null,
      pages: 1,
      total: 1
    }
  },
  product: {
    _id: '',
    name: '',
    price: 0,
    image: '',
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
  },
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetCreateProduct(state) {
      state.isCreateSuccess = false
    },
    resetUpadateProduct(state) {
      state.isUpdateSuccess = false
    },
    resetDeleteleProduct(state) {
      state.isDeleteSuccess = false
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListProduct.fulfilled, (state, action) => {
      // Add user to the state array
      state.listProduct = action.payload
    })
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      // Add user to the state array
      state.product = action.payload
    })
    builder.addCase(createProduct.fulfilled, (state, action) => {
      // Add user to the state array
      state.isCreateSuccess = true
    })
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      // Add user to the state array
      state.isUpdateSuccess = true
    })
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      // Add user to the state array
      state.isDeleteSuccess = true
    })
    builder.addCase(fetchListProductParams.fulfilled, (state, action) => {
      // Add user to the state array
      state.listProductParams = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
export const { resetCreateProduct, resetUpadateProduct } = productSlice.actions

export default productSlice.reducer
