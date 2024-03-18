/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { fetchListCart } from '@/redux/slice/cart.slice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart.listCart)
  const account = useAppSelector((state) => state.account.user)
  console.log('account: ', account)

  const storedItems = localStorage.getItem('selectedItems')
  const selectedItemsFromStorage = storedItems ? JSON.parse(storedItems) : []
  const [selectedItems, setSelectedItems] = useState<string[]>(selectedItemsFromStorage)

  const getSelectedCartItems = () => {
    return cart.data.filter((item) => selectedItems.includes(item._id))
  }
  useEffect(() => {
    // Lấy selectedItems từ localStorage khi component được render
    const storedItems = localStorage.getItem('selectedItems')
    if (storedItems) {
      setSelectedItems(JSON.parse(storedItems))
    }
    // Xóa selectedItems từ localStorage để tránh lưu trữ không cần thiết
    // localStorage.removeItem('selectedItems')
  }, [])

  useEffect(() => {
    dispatch(fetchListCart())
  }, [dispatch, selectedItems])

  const selectedCartItems = getSelectedCartItems()
  console.log('selectedCartItems: ', selectedCartItems)

  const totalPrice = () => {
    return selectedCartItems.reduce((total, item: any) => {
      if (selectedItems.includes(item._id)) {
        return total + item.product?.price * item.quantity
      }
      return total
    }, 0)
  }

  const payment = () => {
    localStorage.removeItem('selectedItems')
    navigate('/')
  }
  return (
    <div className='space-y-3 content'>
      <div className='flex flex-col gap-1 p-5 rounded-lg bg-neutral-200'>
        <span className='text-xl font-bold'>Thông tin khách hàng</span>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-1 text-lg font-medium'>
            <span>{account.name}</span>
            <span></span>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-1 p-5 rounded-lg bg-neutral-200'>
        <div className='grid grid-cols-12 px-5 py-3'>
          <div className='col-span-9'>Sản phẩm</div>
          <div className='col-span-1 text-right'>Số lượng</div>
          <div className='col-span-2 text-right'>Thành tiền</div>
        </div>
        <div>
          {selectedCartItems.map((item) => (
            <div className='grid grid-cols-12 px-5 py-3' key={item._id}>
              <div className='col-span-9'>
                <div className='flex gap-3'>
                  <div className='w-[50px] h-[50px]'>
                    <img src={item.product?.image} alt='' className='object-cover w-full h-full' />
                  </div>
                  <div>
                    <span className='text-sm font-normal'>{item.product?.name}</span>
                  </div>
                </div>
              </div>
              <div className='col-span-1 text-right'>
                <span>{item.quantity}</span>
              </div>
              <div className='col-span-2 text-right'>
                <span>{item?.product?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex items-center justify-between gap-1 p-5 rounded-lg bg-neutral-200'>
        <div className='space-x-5'>
          <span className='text-xl font-bold'>Tổng tiền thanh toán:</span>
          <span className='text-2xl font-semibold text-red-500'>
            {totalPrice().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </span>
        </div>
        <span
          className='px-10 py-3 font-medium text-white bg-red-500 rounded-lg cursor-pointer'
          onClick={() => payment()}
        >
          Thanh toán
        </span>
      </div>
    </div>
  )
}

export default PaymentPage
