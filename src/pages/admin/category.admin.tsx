/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { fetchListCategory } from '../../redux/slice/category.slice';

interface IState {
	_id: string;
	name: string;
	description: string;
	brand: {
		_id: string;
		name: string;
		description: string;
	}[];
}

const CategoryAdmin = () => {
	const dispatch = useAppDispatch();

	useLayoutEffect(() => {
		const fetchData = () => {
			dispatch(fetchListCategory());
		};
		fetchData();

		const intervalId = setInterval(fetchData, 10000);
		return () => clearInterval(intervalId);
	}, [dispatch]);
	const category = useAppSelector((state) => state.category.listCategory);
	console.log('category: ', category.data);

	return (
		<div>
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
				<table className='w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-6 py-3'>
								ID
							</th>
							<th scope='col' className='px-6 py-3'>
								Category Name
							</th>
							<th scope='col' className='px-6 py-3'>
								Description
							</th>
							<th scope='col' className='px-6 py-3'>
								Brand
							</th>
							<th scope='col' className='px-6 py-3'>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{category?.data.map((item: IState, index: number) => (
							<tr
								className='transition-all ease-linear bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 decoration-slice'
								key={item._id}>
								<th
									scope='row'
									className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
									{index + 1}
								</th>
								<td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
									{item.name}
								</td>
								<td className='px-6 py-4'>{item.description}</td>
								<td className='px-6 py-4'>{item.brand.length}</td>
								<td className='flex items-center gap-3 px-6 py-4 text-right text-white'>
									<span className='px-3 py-2 bg-blue-500 rounded-md cursor-pointer'>
										Edit
									</span>
									<span className='px-3 py-2 bg-red-500 rounded-md cursor-pointer'>
										Delete
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default CategoryAdmin;
