/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchAccount } from '../../config/api';

// First, create the thunk

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

		return data;
	},
);

export const getAccount = createAsyncThunk(
	'account/getAccount',
	async (payload, thunkAPI) => {
		const res = await callFetchAccount();
		return res.data;
	},
);

const initialState: {
	isCreateSuccess: boolean;
	isRefreshToken: boolean;
	errorRefreshToken: string;
} = {
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
		// builder.addCase(fetchListUser.fulfilled, (state, action) => {
		// 	// Add user to the state array
		// 	console.log('Check action', action);
		// 	state.listUser = action.payload;
		// });
		builder.addCase(registerAuth.fulfilled, (state, action) => {
			// Add user to the state array
			state.isCreateSuccess = true;
		});
	},
});

// Action creators are generated for each case reducer function
export const { resetCreate, setRefreshTokenAction } = authSlice.actions;

export default authSlice.reducer;
