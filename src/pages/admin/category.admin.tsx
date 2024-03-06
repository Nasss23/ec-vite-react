/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useState } from 'react';
import {
	createACategory,
	deleteACategory,
	fetchListCategory,
	resetCreateCategory,
	resetUpadateCategory,
	updateACategory,
} from '../../redux/slice/category.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { Modal, Popconfirm, message } from 'antd';
import { Button, Input } from 'antd';
import { Label } from '../../components/label';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

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
	const { handleSubmit } = useForm({ mode: 'onSubmit' });
	const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
	const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [_id, setId] = useState<string>('');

	const dispatch = useAppDispatch();
	const category = useAppSelector((state) => state.category.listCategory);
	console.log('category: ', category.data);
	const isCreateSuccess = useAppSelector(
		(state) => state.category.isCreateSuccess,
	);
	const isUpdateSuccess = useAppSelector(
		(state) => state.category.isUpdateSuccess,
	);
	const isDeleteSuccess = useAppSelector(
		(state) => state.category.isDeleteSuccess,
	);

	useLayoutEffect(() => {
		const fetchData = () => {
			dispatch(fetchListCategory());
		};
		fetchData();
		if (isCreateSuccess === true) {
			setIsOpenCreateModal(false);
			setName('');
			setDescription('');
			toast.success('Thêm danh mục thành công');
			dispatch(resetCreateCategory());
		}

		if (isUpdateSuccess === true) {
			setIsOpenUpdateModal(false);
			toast.success('Sửa danh mục thành công');
			dispatch(resetUpadateCategory());
		}
	}, [dispatch, isCreateSuccess, isUpdateSuccess]);

	const handleCreate = async () => {
		dispatch(createACategory({ name, description }));
	};

	const handleUpdate = () => {
		dispatch(updateACategory({ name, description, _id }));
	};

	const handleOpenModal = (category: any) => {
		setId(category._id);
		setName(category.name);
		setDescription(category.description);
		setIsOpenUpdateModal(true);
	};

	const handleDelete = (id: any) => {
		Swal.fire({
			title: 'Bạn có chắc chắn xóa?',
			// text: ,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Đồng ý',
			cancelButtonText: 'Hủy',
		}).then((result) => {
			if (result.isConfirmed) {
				// Dispatch the delete action only if the user confirms
				dispatch(deleteACategory({ _id: id }));

				Swal.fire({
					title: 'Xóa thành công',
					// text: 'Danh mục đã bị xóa',
					icon: 'success',
				});
			}
		});
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
									<td className='px-6 py-4 whitespace-nowrap'>
										{item.description}
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										{item.brand.length}
									</td>
									<td className='flex items-center gap-3 px-6 py-4 text-right text-white'>
										<button
											className='px-3 py-2 bg-blue-500 rounded-md cursor-pointer'
											onClick={() => handleOpenModal(item)}>
											Edit
										</button>
										<button
											className='px-3 py-2 bg-red-500 rounded-md cursor-pointer'
											onClick={() => handleDelete(item._id)}>
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
						<Label htmlFor='input'>Category Name</Label>
						<Input value={name} onChange={(e) => setName(e.target.value)} />
					</div>
					<div className='space-y-1'>
						<Label htmlFor='description'>Description</Label>
						<Input.TextArea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
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
						<Label htmlFor='input'>Category Name</Label>
						<Input value={name} onChange={(e) => setName(e.target.value)} />
					</div>
					<div className='space-y-1'>
						<Label htmlFor='description'>Description</Label>
						<Input.TextArea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
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

export default CategoryAdmin;
