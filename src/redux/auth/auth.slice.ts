/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../config/axios-customize';

interface IUser {
	_id: number;
	name: string;
	email: string;
}

// First, create the thunk
export const fetchListUser = createAsyncThunk(
	'users/fetchUser',
	async (userId, thunkAPI) => {
		const res = await axios.get('http://localhost:8000/api/v1/users');
		return res.data;
	},
);

interface IAuthPayload {
	email: string;
	name: string;
	password: string;
}

export const registerAuth = createAsyncThunk(
	'auth/registerAuth',
	async (payload: IAuthPayload, thunkAPI) => {
		const res = await fetch('http://localhost:8000/api/v1/auth/register', {
			method: 'POST',
			body: JSON.stringify({
				...payload,
			}),
			headers: {
				'Content-type': 'application/json',
			},
		});
		const data = await res.json();
		if (data && data.id) {
			//create success
			//fetch lại dữ liệu khi được thêm mới
			thunkAPI.dispatch(fetchListUser());
		}
		return data;
	},
);

const initialState: {
	listUser: IUser[];
	isCreateSuccess: boolean;
	isRefreshToken: boolean;
	errorRefreshToken: string;
} = {
	listUser: [],
	isCreateSuccess: false,
	isRefreshToken: false,
	errorRefreshToken: '',
};

export const authSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		resetCreate(state) {
			state.isCreateSuccess = false;
		},
		setRefreshTokenAction: (state, action) => {
			state.isRefreshToken = action.payload?.status ?? false;
			state.errorRefreshToken = action.payload?.message ?? '';
		},
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(fetchListUser.fulfilled, (state, action) => {
			// Add user to the state array
			state.listUser = action.payload;
		});
		builder.addCase(registerAuth.fulfilled, (state, action) => {
			// Add user to the state array
			state.isCreateSuccess = true;
		});
	},
});

// Action creators are generated for each case reducer function
export const { resetCreate, setRefreshTokenAction } = authSlice.actions;

export default authSlice.reducer;
