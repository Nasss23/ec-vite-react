/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { fetchListCart } from '@/redux/slice/cart.slice'
import { createOrder, fetchListOrder } from '@/redux/slice/order.slice'
import { useEffect, useState } from 'react'

const itemCart = 0
const PaymentPage = () => {
  // const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart.listCart)
  const account = useAppSelector((state) => state.account.user)
  const order = useAppSelector((state) => state.order.listOrder)

  const storedItems = localStorage.getItem('selectedItems')
  const selectedItemsFromStorage = storedItems ? JSON.parse(storedItems) : []
  const [selectedItems, setSelectedItems] = useState<string[]>(selectedItemsFromStorage)

  const getSelectedCartItems = () => {
    const carts = cart.data ? cart.data.filter((item) => selectedItems.includes(item._id)) : []
    const itemsNotInOrder = carts.filter((cartItem) => {
      return !order.data
        ? true
        : !order.data.some((orderItem) => orderItem.cart?.some((orderCartItem) => orderCartItem._id === cartItem._id))
    })
    return itemsNotInOrder
  }

  useEffect(() => {
    dispatch(fetchListOrder())
  }, [])

  useEffect(() => {
    // Lấy selectedItems từ localStorage khi component được render
    const storedItems = localStorage.getItem('selectedItems')
    if (storedItems) {
      setSelectedItems(JSON.parse(storedItems))
    }
    // Xóa selectedItems từ localStorage để tránh lưu trữ không cần thiết
    localStorage.removeItem('selectedItems')
  }, [])

  useEffect(() => {
    dispatch(fetchListCart())
  }, [dispatch, selectedItems])

  const selectedCartItems = getSelectedCartItems()

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
    // navigate('/')
    if (selectedCartItems.length >= itemCart) {
      dispatch(createOrder({ cart: selectedCartItems, totalPrice: totalPrice() }))
    }
  }
  return (
    <div className='py-5 space-y-3 content'>
      <div className='flex flex-col gap-1 p-5 rounded-lg bg-neutral-200'>
        <span className='text-base font-bold lg:text-xl'>Thông tin khách hàng</span>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-1 text-base font-medium lg:text-lg'>
            <span>{account.name}</span>
            <span></span>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-1 p-5 rounded-lg bg-neutral-200'>
        <div className='px-5 py-3 lg:grid lg:grid-cols-12'>
          <div className='col-span-9'>Sản phẩm</div>
          <div className='col-span-1 text-right'>Số lượng</div>
          <div className='col-span-2 text-right'>Thành tiền</div>
        </div>
        <div>
          {selectedCartItems.map((item) => (
            <div className='px-5 py-3 lg:grid lg:grid-cols-12' key={item._id}>
              <div className='lg:col-span-9'>
                <div className='flex gap-3'>
                  <div className='w-[50px] h-[50px]'>
                    <img src={item.product?.image} alt='' className='object-cover w-full h-full' />
                  </div>
                  <div>
                    <span className='text-sm font-normal'>{item.product?.name}</span>
                  </div>
                </div>
              </div>
              <div className='text-right lg:col-span-1'>
                <span>{item.quantity}</span>
              </div>
              <div className='text-right lg:col-span-2'>
                <span>{item?.product?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col items-end justify-between gap-1 p-5 rounded-lg lg:items-center bg-neutral-200 lg:flex-row'>
        <div className='flex items-center justify-between w-full space-x-5 lg:justify-start'>
          <span className='font-bold lg:text-xl'>Tổng tiền thanh toán:</span>
          <span className='font-semibold text-red-500 lg:text-2xl'>
            {totalPrice().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </span>
        </div>
        <button
          className={`${selectedCartItems.length <= 0 ? 'py-2 text-xs font-medium w-[150px] lg:w-[250px] text-center text-white bg-gray-500 rounded-lg cursor-pointer lg:text-sm lg:py-3 lg:px-10 px-4' : 'py-2 text-xs font-medium w-[150px] lg:w-[250px] text-center text-white bg-red-500 rounded-lg cursor-pointer lg:text-sm lg:py-3 lg:px-10 px-4'}`}
          onClick={() => payment()}
          disabled={selectedCartItems.length <= 0 ? true : false}
        >
          Thanh toán
        </button>
      </div>
    </div>
  )
}

export default PaymentPage
