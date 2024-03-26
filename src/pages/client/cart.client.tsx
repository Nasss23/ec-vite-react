/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { decrementCart, deleteCart, fetchListCart, incrementCart } from '@/redux/slice/cart.slice'
import { fetchListOrder } from '@/redux/slice/order.slice'
import { Breadcrumb, Checkbox } from 'antd'
import { useLayoutEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CartPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState<boolean>(false)

  const infoUser = useAppSelector((state) => state.account.user)
  const carts = useAppSelector((state) => state.cart.listCart)
  const order = useAppSelector((state) => state.order.listOrder)

  const filterCart = carts.data ? carts.data.filter((cart) => cart.user === infoUser._id) : []
  const itemsNotInOrder = filterCart.filter((cartItem) => {
    return !order.data
      ? true
      : !order.data.some((orderItem) => orderItem.cart?.some((orderCartItem) => orderCartItem._id === cartItem._id))
  })

  useLayoutEffect(() => {
    dispatch(fetchListCart())
    dispatch(fetchListOrder())
  }, [dispatch])

  const handleDeleteCart = (id: any) => {
    dispatch(deleteCart({ _id: id }))
  }

  // dùng GPT!!! hí hí:)))))
  const handleCheckboxChange = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  // dùng GPT!!! hí hí:)))))
  const handleSelectAllChange = () => {
    if (!selectAll) {
      const itemsNotInOrder = carts.data.filter((cartItem) => {
        return !order?.data?.some((orderItem) =>
          orderItem.cart?.some((orderCartItem) => orderCartItem._id === cartItem._id)
        )
      })
      const itemsNotInOrderIds = itemsNotInOrder.map((item) => item._id)
      setSelectedItems(itemsNotInOrderIds)
    } else {
      setSelectedItems([])
    }
    setSelectAll(!selectAll)
  }

  const increamentQuantity = async (id: string) => {
    dispatch(incrementCart({ _id: id }))
  }
  const decrementQuantity = async (id: string) => {
    dispatch(decrementCart({ _id: id }))
  }

  // dùng GPT!!! hí hí:)))))
  const totalPrice = () => {
    return filterCart.reduce((total, item: any) => {
      if (selectedItems.includes(item._id)) {
        return total + item.product?.price * item.quantity
      }
      return total
    }, 0)
  }

  const buy = () => {
    // Lưu selectedItems vào localStorage
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems))
    navigate('/payment')
  }

  return (
    <div className='py-5 lg:space-y-5 content '>
      <div>
        <Breadcrumb
          items={[
            {
              title: <Link to={'/'}>Home</Link>
            },
            {
              title: <span className='font-medium'>Cart</span>
            }
          ]}
        />
      </div>
      <div className='lg:w-[900px] mx-auto lg:space-y-4'>
        <div className='py-5'>
          <Checkbox onChange={handleSelectAllChange} checked={selectAll}>
            Chọn tất cả
          </Checkbox>
        </div>
        <div className='flex flex-col gap-3'>
          {itemsNotInOrder.map((item) => (
            <div className='p-4 border rounded-md border-neutral-400' key={item._id}>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 lg:gap-4'>
                  <Checkbox
                    onChange={() => handleCheckboxChange(item._id)}
                    checked={selectedItems.includes(item._id)}
                  ></Checkbox>
                  <div className='flex items-center gap-2 lg:items-start'>
                    <Link
                      to={`/product/${item.product?._id}`}
                      className='w-10 h-10 border rounded-md lg:w-20 lg:h-20 border-neutral-300'
                    >
                      <img src={item?.product?.image} alt='' className='object-cover w-full h-full' />
                    </Link>
                    <div className='lg:w-[300px] w-[100px]'>
                      <span className='text-sm lg:line-clamp-1 line-clamp-3'>{item?.product?.name}</span>
                    </div>
                  </div>
                </div>
                <div className='flex items-end gap-5 lg:items-center lg:gap-20'>
                  <div className='flex flex-col-reverse items-center gap-2 lg:gap-5 lg:flex-row'>
                    <div className='flex items-center'>
                      <span
                        className='px-2.5 border cursor-pointer  border-neutral-300'
                        onClick={() => decrementQuantity(item._id)}
                      >
                        -
                      </span>
                      <div className='px-3 border lg:px-4 border-neutral-300 border-x-transparent'>{item.quantity}</div>
                      <span
                        className='px-2 border cursor-pointer border-neutral-300'
                        onClick={() => increamentQuantity(item._id)}
                      >
                        +
                      </span>
                    </div>
                    <span className='text-sm text-red-400'>
                      {item?.product?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </span>
                  </div>
                  <button
                    className='text-xs transition-all ease-linear hover:text-red-500 decoration-slice lg:text-sm'
                    onClick={() => handleDeleteCart(item._id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex items-center justify-between space-y-4'>
          <div></div>
          <div className='flex items-start justify-between flex-1 gap-4 lg:items-center'>
            <div>
              <span className='font-medium lg:text-xl'>
                Tổng thanh toán ( <span className='text-blue-500'>{selectedItems.length}</span> sản phẩm)
              </span>
            </div>
            <div className='flex flex-col gap-2 lg:items-center lg:flex-row lg:gap-8'>
              <div className='font-medium text-blue-500 lg:text-xl'>
                {totalPrice().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </div>
              <button
                className={`${selectedItems.length > 0 ? 'flex lg:px-16 px-10 py-3 font-medium text-white bg-blue-500 rounded cursor-pointer' : 'flex px-10 lg:px-16 py-3 font-medium text-white bg-gray-500 rounded cursor-pointer'}`}
                onClick={() => buy()}
                disabled={selectedItems.length > 0 ? false : true}
              >
                Mua
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
