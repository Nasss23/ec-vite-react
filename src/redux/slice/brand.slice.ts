/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../config/axios-customize';

export const fetchListBrand = createAsyncThunk(
	'brand/fetchUser',
	async (brand, thunkAPI) => {
		const res = await axios.get('/api/v1/brand');
		return res.data;
	},
);

interface IBrand {
	_id?: string;
	name: string;
	description: string;
	category: string;
}
export const createABrand = createAsyncThunk(
	'brand/createABrand',
	async (createBrand: IBrand, thunkAPI) => {
		const res = await axios.post('/api/v1/brand', { ...createBrand });
		const data = res.data;
		if (data?._id) {
			thunkAPI.dispatch(fetchListBrand());
		}
		return data;
	},
);

export const updateABrand = createAsyncThunk(
	'brand/updateABrand',
	async (updateCate: IBrand, thunkAPI) => {
		const res = await axios.patch(`/api/v1/brand/${updateCate._id}`, {
			...updateCate,
		});
		const data = res.data;
		if (data) {
			thunkAPI.dispatch(fetchListBrand());
		}
		return data;
	},
);

export const deleteABrand = createAsyncThunk(
	'brand/deleteABrand',
	async (updateCate: any, thunkAPI) => {
		const res = await axios.delete(`/api/v1/brand/${updateCate._id}`);
		const data = res.data;
		thunkAPI.dispatch(fetchListBrand());
		return data;
	},
);

interface IState {
	listBrand: {
		data: {
			_id: string;
			name: string;
			description: string;
			category: {
				_id: string;
				name: string;
				description: string;
				brand: string[];
			};
			product: {
				_id: string;
				name: string;
				description: string;
			}[];
		}[];
		meta: {
			current: null;
			pageSize: null;
			pages: number;
			total: number;
		};
	};
	isCreateSuccess: boolean;
	isUpdateSuccess: boolean;
	isDeleteSuccess: boolean;
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
					brand: [''],
				},
				product: [
					{
						_id: '',
						name: '',
						description: '',
					},
				],
			},
		],
		meta: {
			current: null,
			pageSize: null,
			pages: 1,
			total: 1,
		},
	},
	isCreateSuccess: false,
	isUpdateSuccess: false,
	isDeleteSuccess: false,
};

export const brandSlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		resetCreateBrand(state) {
			state.isCreateSuccess = false;
		},
		resetUpadateBrand(state) {
			state.isUpdateSuccess = false;
		},
		resetDeleteleBrand(state) {
			state.isDeleteSuccess = false;
		},
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(fetchListBrand.fulfilled, (state, action) => {
			// Add user to the state array
			state.listBrand = action.payload;
		});
		builder.addCase(createABrand.fulfilled, (state, action) => {
			// Add user to the state array
			state.isCreateSuccess = true;
		});
		builder.addCase(updateABrand.fulfilled, (state, action) => {
			// Add user to the state array
			state.isUpdateSuccess = true;
		});
		builder.addCase(deleteABrand.fulfilled, (state, action) => {
			// Add user to the state array
			state.isDeleteSuccess = true;
		});
	},
});

// Action creators are generated for each case reducer function
export const { resetCreateBrand, resetUpadateBrand } = brandSlice.actions;

export default brandSlice.reducer;
