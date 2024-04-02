/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '@/config/axios-customize'

// First, create the thunk

export const getAccount = createAsyncThunk('account/getAccount', async (_payload, _thunkAPI) => {
  const res = await axios.get('/api/v1/auth/account')
  return res.data
})

interface IState {
  isAuthenticated: boolean
  isLoading: boolean
  isRefreshToken: boolean
  errorRefreshToken: string
  user: {
    _id: string
    email: string
    name: string
    role: string
  }
}

const initialState: IState = {
  isAuthenticated: false,
  isLoading: true,
  isRefreshToken: false,
  errorRefreshToken: '',
  user: {
    _id: '',
    email: '',
    name: '',
    role: ''
  }
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUserLoginInfo: (state, action) => {
      state.isAuthenticated = true
      state.isLoading = false
      state.user._id = action?.payload?._id
      state.user.email = action.payload.email
      state.user.name = action.payload.name
      state.user.role = action?.payload?.role
    },
    setLogoutAction: (state, _action) => {
      localStorage.removeItem('access_token')
      state.isAuthenticated = false
      state.user = {
        _id: '',
        email: '',
        name: '',
        role: ''
      }
    },
    setRefreshTokenAction: (state, action) => {
      state.isRefreshToken = action.payload?.status ?? false
      state.errorRefreshToken = action.payload?.message ?? ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAccount.pending, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = false
        state.isLoading = true
      }
    })

    builder.addCase(getAccount.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true
        state.isLoading = false
        state.user._id = action?.payload?.user._id
        state.user.email = action.payload.user?.email
        state.user.name = action.payload.user?.name
        state.user.role = action?.payload?.user?.role
      }
    })

    builder.addCase(getAccount.rejected, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = false
        state.isLoading = false
      }
    })
  }
})

// Action creators are generated for each case reducer function
export const { setRefreshTokenAction, setLogoutAction, setUserLoginInfo } = accountSlice.actions

export default accountSlice.reducer
