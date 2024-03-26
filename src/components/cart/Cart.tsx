/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { fetchListCart } from '@/redux/slice/cart.slice'
import { Popover } from 'antd'
import { useLayoutEffect } from 'react'
import { BsCart2 } from 'react-icons/bs'
import CartContent from './CartContent'
import { fetchListOrder } from '@/redux/slice/order.slice'

const Cart = () => {
  const dispatch = useAppDispatch()
  const infoUser = useAppSelector((state) => state.account.user)
  const carts = useAppSelector((state) => state.cart.listCart)
  const order = useAppSelector((state) => state.order.listOrder)

  const filterCart = carts.data.filter((cart) => cart.user === infoUser._id)
  const itemsNotInOrder = filterCart.filter((cartItem) => {
    return !order.data.some((orderItem) => orderItem.cart?.some((orderCartItem) => orderCartItem._id === cartItem._id))
  })

  useLayoutEffect(() => {
    dispatch(fetchListCart())
    dispatch(fetchListOrder())
  }, [dispatch])

  return (
    <div>
      <Popover
        content={<CartContent></CartContent>}
        title='Giỏ hàng'
        // trigger='click'
        placement='bottom'
        // open={open}
        // onOpenChange={handleOpenChange}
      >
        <div className='flex items-center gap-2 '>
          <div className='flex items-center gap-2'>
            <span className='text-xl'>
              <BsCart2 />
            </span>
            <span className='hidden lg:block'>Cart</span>
          </div>
          <div className='flex items-center justify-center text-white rounded-full w-7 h-7 bg-secondary-400'>
            {itemsNotInOrder?.length}
          </div>
        </div>
      </Popover>
    </div>
  )
}

export default Cart
