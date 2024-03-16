/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { decrementCart, deleteCart, fetchListCart, incrementCart } from '@/redux/slice/cart.slice'
import { Breadcrumb, Checkbox } from 'antd'
import { useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const dispatch = useAppDispatch()
  const infoUser = useAppSelector((state) => state.account.user)
  const carts = useAppSelector((state) => state.cart.listCart)
  const filterCart = carts.data.filter((cart) => cart.user === infoUser?._id)

  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState<boolean>(false)

  useLayoutEffect(() => {
    dispatch(fetchListCart())
  }, [dispatch])

  const handleDeleteCart = (id: any) => {
    dispatch(deleteCart({ _id: id }))
  }

  // dùng GPT!!! hí hí:)))))
  const handleCheckboxChange = (id: string) => {
    if (selectedItems.includes(id)) {
      // Nếu phần tử với id đã tồn tại trong mảng selectedItems
      // Thực hiện loại bỏ phần tử đó khỏi mảng selectedItems
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    } else {
      // Nếu phần tử với id không tồn tại trong mảng selectedItems
      // Thêm phần tử đó vào mảng selectedItems
      setSelectedItems([...selectedItems, id])
    }
  }

  // dùng GPT!!! hí hí:)))))
  const handleSelectAllChange = () => {
    if (!selectAll) {
      const allItemIds = carts.data.filter((cart) => cart.user === infoUser?._id).map((cart) => cart._id)
      setSelectedItems(allItemIds)
    } else {
      setSelectedItems([])
    }
    setSelectAll(!selectAll)
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

  const increamentQuantity = async (id: string) => {
    dispatch(incrementCart({ _id: id }))
  }
  const decrementQuantity = async (id: string) => {
    dispatch(decrementCart({ _id: id }))
  }

  return (
    <div className='space-y-5 content pb-7'>
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
      <div className='w-[900px] mx-auto space-y-4'>
        <div className='p-5'>
          <Checkbox onChange={handleSelectAllChange} checked={selectAll}>
            Chọn tất cả
          </Checkbox>
        </div>
        <div className='flex flex-col gap-3'>
          {filterCart.map((item, index) => (
            <div className='p-4 border rounded-md border-neutral-400' key={item._id}>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <Checkbox
                    onChange={() => handleCheckboxChange(item._id)}
                    checked={selectedItems.includes(item._id)}
                  ></Checkbox>
                  <div className='flex gap-2'>
                    <Link
                      to={`/product/${item.product?._id}`}
                      className='w-20 h-20 border rounded-md border-neutral-300'
                    >
                      <img src={item?.product?.image} alt='' className='object-cover w-full h-full' />
                    </Link>
                    <div className='w-[300px]'>
                      <span className='text-sm line-clamp-1'>{item?.product?.name}</span>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-20'>
                  <div className='flex items-center gap-5'>
                    <div className='flex items-center'>
                      <span
                        className='px-2 border cursor-pointer border-neutral-300'
                        onClick={() => decrementQuantity(item._id)}
                      >
                        -
                      </span>
                      <div className='px-4 border border-neutral-300 border-x-transparent'>{item.quantity}</div>
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
                    className='transition-all ease-linear hover:text-red-500 decoration-slice'
                    onClick={() => handleDeleteCart(item._id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex items-center justify-between'>
          <div></div>
          <div className='flex items-center gap-4'>
            <div>
              <span className='text-xl font-medium'>
                Tổng thanh toán ( <span className='text-blue-500'>{selectedItems.length}</span> sản phẩm)
              </span>
            </div>
            <div className='text-xl font-medium text-blue-500'>
              {totalPrice().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </div>
            <span className='flex px-16 py-3 font-medium text-white bg-blue-500 rounded cursor-pointer'>Mua</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
