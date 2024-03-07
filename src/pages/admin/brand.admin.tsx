/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import {
	createABrand,
	fetchListBrand,
	resetCreateBrand,
	resetUpadateBrand,
	updateABrand,
} from '../../redux/slice/brand.slice';
import { useForm } from 'react-hook-form';
import { Button, Input, Modal, Select } from 'antd';
import { Label } from '../../components/label';
import { toast } from 'react-toastify';

interface IState {
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
}
interface IStateCategory {
	_id: string;
	name: string;
	description: string;
	category: string;
	brand: {
		_id: string;
		name: string;
		description: string;
	}[];
}

const BrandAdmin = () => {
	const { handleSubmit } = useForm({ mode: 'onSubmit' });
	const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
	const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const brand = useAppSelector((state) => state.brand.listBrand);
	console.log('brand: ', brand.data);
	const categoryData = useAppSelector((state) => state.category.listCategory);
	const isCreateSuccess = useAppSelector(
		(state) => state.brand.isCreateSuccess,
	);
	const isUpdateSuccess = useAppSelector(
		(state) => state.brand.isUpdateSuccess,
	);
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [category, setCategory] = useState<string>('');
	const [_id, setId] = useState<string>('');

	//Select category
	const value = categoryData.data;
	const options = value.map((item, index) => ({
		label: <span>{item.name}</span>,
		value: item._id,
	}));

	useEffect(() => {
		dispatch(fetchListBrand());
		if (isCreateSuccess === true) {
			setIsOpenCreateModal(false);
			setName('');
			setDescription('');
			setCategory('');
			toast.success('Thêm thành công');
			dispatch(resetCreateBrand());
		}
		if (isUpdateSuccess === true) {
			setIsOpenUpdateModal(false);
			toast.success('Cập nhật thành công');
			dispatch(resetUpadateBrand());
		}
	}, [isCreateSuccess, isUpdateSuccess]);

	const handleCreate = () => {
		console.log({ name, description, category });
		dispatch(createABrand({ name, description, category }));
	};

	const handleCategoryChange = (category: any) => {
		setCategory(category);
	};

	const handleUpdate = () => {
		dispatch(updateABrand({ name, description, _id, category }));
	};

	const handleOpenModal = (category: any) => {
		setId(category._id);
		setName(category.name);
		setDescription(category.description);
		setCategory(category.category._id);
		setIsOpenUpdateModal(true);
	};

	return (
		<>
			<div className='space-y-2'>
				<div className='flex items-center justify-between'>
					<div></div>
					<span
						className='px-3 py-2 font-medium text-white bg-blue-500 rounded-md cursor-pointer'
						onClick={() => setIsOpenCreateModal(true)}>
						Thêm danh mục
					</span>
				</div>
				<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
					<table className='w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400'>
						<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
							<tr>
								<th scope='col' className='px-6 py-3'>
									ID
								</th>
								<th scope='col' className='px-6 py-3 whitespace-nowrap'>
									Brand Name
								</th>
								<th scope='col' className='px-6 py-3'>
									Description
								</th>
								<th scope='col' className='px-6 py-3'>
									Product
								</th>
								<th scope='col' className='px-6 py-3'>
									Category
								</th>
								<th scope='col' className='px-6 py-3'>
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{brand?.data.map((item: IState, index: number) => (
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
									<td className='px-6 py-4 whitespace-nowrap'>
										{item.description}
									</td>
									<td className='px-6 py-4 whitespace-nowrap'></td>
									<td className='px-6 py-4 whitespace-nowrap'>
										{item.category.name}
									</td>
									<td className='flex items-center gap-3 px-6 py-4 text-right text-white'>
										<button
											className='px-3 py-2 bg-blue-500 rounded-md cursor-pointer'
											onClick={() => handleOpenModal(item)}>
											Edit
										</button>
										<button className='px-3 py-2 bg-red-500 rounded-md cursor-pointer'>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<Modal
				title='Create a category'
				open={isOpenCreateModal}
				onCancel={() => setIsOpenCreateModal(false)}
				footer={null}
				width={500}>
				<form className='space-y-3' onSubmit={handleSubmit(handleCreate)}>
					<div className='space-y-1'>
						<Label htmlFor='input'>Brand Name</Label>
						<Input value={name} onChange={(e) => setName(e.target.value)} />
					</div>
					<div className='space-y-1'>
						<Label htmlFor='description'>Description</Label>
						<Input.TextArea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<Label htmlFor='category'>Category</Label>
						<Select
							defaultValue='Chọn danh mục sản phẩm'
							onChange={handleCategoryChange}
							options={options}
							className='w-full'
						/>
					</div>
					<div className='flex justify-center'>
						<Button
							type='primary'
							htmlType='submit'
							className='w-[200px] bg-blue-500'>
							Submit
						</Button>
					</div>
				</form>
			</Modal>
			<Modal
				title='Create a category'
				open={isOpenUpdateModal}
				onCancel={() => setIsOpenUpdateModal(false)}
				footer={null}
				width={500}>
				<form className='space-y-3' onSubmit={handleSubmit(handleUpdate)}>
					{/* <div className='space-y-1'>
						<Label htmlFor='input'>Category Name</Label>
						<Input value={_id} onChange={(e) => setName(e.target.value)} />
					</div> */}
					<div className='space-y-1'>
						<Label htmlFor='input'>Brand Name</Label>
						<Input value={name} onChange={(e) => setName(e.target.value)} />
					</div>
					<div className='space-y-1'>
						<Label htmlFor='description'>Description</Label>
						<Input.TextArea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<Label htmlFor='category'>Category</Label>
						<Select
							value={category}
							onChange={handleCategoryChange}
							options={options}
							className='w-full'
						/>
					</div>
					<div className='flex justify-center'>
						<Button
							type='primary'
							htmlType='submit'
							className='w-[200px] bg-blue-500'>
							Submit
						</Button>
					</div>
				</form>
			</Modal>
		</>
	);
};

export default BrandAdmin;
