/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hook'

import { deleteABrand, fetchListBrand } from '../../redux/slice/brand.slice'
import Swal from 'sweetalert2'
import { IBrand } from '../../types/backend'
import ModalBrandCreate from '../../components/modal/brand/brand.create.modal.admin'
import ModalBrandUpdate from '../../components/modal/brand/brand.update.modal.admin'

const BrandAdmin = () => {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const brand = useAppSelector((state) => state.brand.listBrand)
  const [data, setData] = useState({})

  useEffect(() => {
    dispatch(fetchListBrand())
  }, [])

  const handleOpenModal = (item: any) => {
    setData(item)
    setIsOpenUpdateModal(true)
  }

  const handleDelete = (id: any) => {
    Swal.fire({
      title: 'Bạn có chắc chắn xóa?',
      // text: ,
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
        dispatch(deleteABrand({ _id: id }))
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
            Thêm
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
              {brand?.data.map((item: IBrand, index: number) => (
                <tr
                  className='transition-all ease-linear bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 decoration-slice'
                  key={item._id}
                >
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {index + 1}
                  </th>
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{item.name}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.description}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.product?.length}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.category?.name}</td>
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
      <ModalBrandCreate
        isOpenCreateModal={isOpenCreateModal}
        setIsOpenCreateModal={setIsOpenCreateModal}
      ></ModalBrandCreate>
      <ModalBrandUpdate
        data={data}
        isOpenUpdateModal={isOpenUpdateModal}
        setIsOpenUpdateModal={setIsOpenUpdateModal}
      ></ModalBrandUpdate>
    </>
  )
}

export default BrandAdmin
