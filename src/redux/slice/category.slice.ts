/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCategory } from '../../config/api';

export const fetchListCategory = createAsyncThunk(
	'users/fetchUser',
	async (categoryId, thunkAPI) => {
		const res = await fetchCategory();
		return res.data;
	},
);

interface IState {
	listCategory: {
		data: {
			_id: string;
			name: string;
			description: string;
			brand: {
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
};

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(fetchListCategory.fulfilled, (state, action) => {
			// Add user to the state array
			state.listCategory = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const {} = categorySlice.actions;

export default categorySlice.reducer;
