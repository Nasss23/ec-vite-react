/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { deleteProduct, fetchListProduct } from '@/redux/slice/product.slice'
import { IProduct } from '@/types/backend'
import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const ProductAdmin = () => {
  const dispatch = useAppDispatch()
  const product = useAppSelector((state) => state.product.listProduct)

  useLayoutEffect(() => {
    dispatch(fetchListProduct())
  }, [dispatch])

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
        dispatch(deleteProduct({ _id: id }))
      }
    })
  }

  return (
    <>
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <div></div>
          <Link
            to={'/admin/product/create'}
            className='px-3 py-2 font-medium text-white bg-blue-500 rounded-md cursor-pointer'
            // onClick={() => setIsOpenCreateModal(true)}
          >
            Thêm danh mục
          </Link>
        </div>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                  ID
                </th>
                <th scope='col' className='px-6 py-3 whitespace-nowrap !w-[300px]'>
                  Product Name
                </th>
                <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                  Price
                </th>
                <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                  Image
                </th>
                <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                  Sold
                </th>
                <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                  discount
                </th>
                <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                  Quantity
                </th>
                <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                  Brand
                </th>
                <th scope='col' className='px-6 py-3 whitespace-nowrap'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {product?.data.map((item: IProduct, index: number) => (
                <tr
                  className='transition-all ease-linear bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 decoration-slice'
                  key={item._id}
                >
                  <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {index + 1}
                  </th>
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white !w-[300px]'>
                    {item.name}
                  </td>
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {item.price}
                  </td>
                  <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    <div className='w-10 h-10'>
                      {item.image?.map((item, index) => (
                        <img key={index} src={`${import.meta.env.VITE_BACKEND_URL}/images/product/${item}`} alt='' />
                      ))}
                    </div>
                  </td>

                  <td className='px-6 py-4 whitespace-nowrap'>{item.sold}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.discount}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.quantity}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{item.brand?.name}</td>
                  <td className='flex items-center gap-3 px-6 py-4 text-right text-white'>
                    <Link
                      to={`/admin/product/update/${item?._id}`}
                      className='px-3 py-2 bg-blue-500 rounded-md cursor-pointer'
                    >
                      Edit
                    </Link>
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
    </>
  )
}

export default ProductAdmin
