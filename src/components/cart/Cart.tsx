/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { fetchListCart } from '@/redux/slice/cart.slice'
import { Popover } from 'antd'
import { useEffect } from 'react'
import { BsCart2 } from 'react-icons/bs'
import CartContent from './CartContent'

const Cart = (props: any) => {
  const { open, handleOpenChange } = props

  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart.listCart)

  useEffect(() => {
    dispatch(fetchListCart())
  }, [dispatch])

  return (
    <Popover
      content={<CartContent></CartContent>}
      title='Giỏ hàng'
      trigger='click'
      placement='bottom'
      open={open}
      onOpenChange={handleOpenChange}
    >
      <div className='flex items-center gap-2 '>
        <div className='flex items-center gap-2'>
          <span className='text-xl'>
            <BsCart2 />
          </span>
          Cart
        </div>
        <div className='flex items-center justify-center rounded-full w-7 h-7 bg-secondary-400'>{cart.data.length}</div>
      </div>
    </Popover>
  )
}

export default Cart
