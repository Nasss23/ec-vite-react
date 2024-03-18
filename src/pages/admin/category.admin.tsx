/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hook'

import Swal from 'sweetalert2'
import { ICatagory } from '@/types/backend'
import ModalCategoryCreate from '../../components/modal/category/category.create.modal.admin'
import ModalCategoryUpdate from '../../components/modal/category/category.update.modal.admin'
import { deleteACategory, fetchListCategory } from '../../redux/slice/category.slice'

const CategoryAdmin = () => {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false)
  const [data, setData] = useState({})

  const dispatch = useAppDispatch()
  const category = useAppSelector((state) => state.category.listCategory)

  const brand = useAppSelector((state) => state.brand.listBrand)
  console.log('product: ', brand)

  useEffect(() => {
    dispatch(fetchListCategory())
  }, [])

  const handleOpenModal = (item: any) => {
    setData(item)
    setIsOpenUpdateModal(true)
  }

  const handleDelete = (id: any) => {
    Swal.fire({
      title: 'Bạn có chắc chắn xóa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Xóa thành công',
          icon: 'success'
        })
        dispatch(deleteACategory({ _id: id }))
      }
    })
  }

  return (
    <>
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <div></div>
          <span
            className='px-3 py-2 font-medium text-white bg-blue-500 rounded-md cursor-pointer'
            onClick={() => setIsOpenCreateModal(true)}
          >
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
              {category?.data.map((item: ICatagory, index: number) => (
                <tr
                  className='transition-all ease-linear bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 decoration-slice'
                  key={item._id}
                >
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {index + 1}
                  </th>
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{item.name}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.description}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.brand.length}</td>
                  <td className='flex items-center gap-3 px-6 py-4 text-right text-white'>
                    <button
                      className='px-3 py-2 bg-blue-500 rounded-md cursor-pointer'
                      onClick={() => handleOpenModal(item)}
                    >
                      Edit
                    </button>
                    <button
                      className='px-3 py-2 bg-red-500 rounded-md cursor-pointer'
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalCategoryCreate
        isOpenCreateModal={isOpenCreateModal}
        setIsOpenCreateModal={setIsOpenCreateModal}
      ></ModalCategoryCreate>

      <ModalCategoryUpdate
        isOpenUpdateModal={isOpenUpdateModal}
        setIsOpenUpdateModal={setIsOpenUpdateModal}
        data={data}
      ></ModalCategoryUpdate>
    </>
  )
}

export default CategoryAdmin
