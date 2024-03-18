/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { deleteCart, fetchListCart } from '@/redux/slice/cart.slice'
import { Empty } from 'antd'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const CartContent = () => {
  const dispatch = useAppDispatch()

  const infoUser = useAppSelector((state) => state.account.user)
  const carts = useAppSelector((state) => state.cart.listCart)

  useEffect(() => {
    dispatch(fetchListCart())
  }, [dispatch])

  const handleDeleteCart = (id: any) => {
    dispatch(deleteCart({ _id: id }))
  }

  const filterCart = carts.data.filter((cart) => cart.user === infoUser._id)

  if (!carts?.data)
    return (
      <div className='w-[400px]'>
        <Empty />
      </div>
    )
  return (
    <div className='lg:w-[450px] flex flex-col gap-5 w-[320px]'>
      <div className='flex flex-col '>
        {filterCart.map((item) => (
          <div
            className='flex justify-between gap-4 py-2 border border-x-transparent border-t-transparent border-neutral-200'
            key={item._id}
          >
            <div className='flex gap-2'>
              <Link to={`/product/${item.product?._id}`} className='w-10 h-10 cursor-pointer'>
                <img src={item.product?.image} alt='' className='object-cover rounded-md' />
              </Link>
              <h4 className='text-sm line-clamp-1 lg:w-[250px]'>{item.product?.name}</h4>
            </div>
            <div className='flex flex-col  gap-3 w-[120px]'>
              <div className='flex items-end gap-1'>
                <span>Giá:</span>
                <span className='font-medium text-blue-500 '>
                  {item.product?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span
                  className='text-red-400 transition-all ease-linear cursor-pointer hover:text-red-500 decoration-slice hover:font-semibold'
                  onClick={() => handleDeleteCart(item._id)}
                >
                  Xóa
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex items-center justify-between'>
        <span className='text-xs'>
          Có <span className='font-medium text-blue-500'>{filterCart.length}</span> sản phẩm
        </span>
        <Link to={'/cart'} className='px-4 py-2 font-medium text-white bg-blue-500 rounded-md'>
          Xem giỏ hàng
        </Link>
      </div>
    </div>
  )
}

export default CartContent
