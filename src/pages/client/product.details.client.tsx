/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { createCart, resetCreateCart } from '@/redux/slice/cart.slice'
import { fetchProductById } from '@/redux/slice/product.slice'
import { Breadcrumb, Empty } from 'antd'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const ProductDetailsPage = () => {
  const { productId } = useParams() // Lấy `productId` từ URL

  const _id = productId
  const dispatch = useAppDispatch()
  const product = useAppSelector((state) => state.product.product)
  const isCreateSuccess = useAppSelector((state) => state.cart.isCreateSuccess)

  useEffect(() => {
    dispatch(fetchProductById({ _id: productId }))
    if (isCreateSuccess === true) {
      dispatch(resetCreateCart())
    }
  }, [isCreateSuccess])

  const handleButton = () => {
    if (_id) {
      dispatch(createCart({ product: _id, quantity: 1 }))
    }
  }

  if (!product)
    return (
      <div className='py-5 lg:pb-7 lg:py-0'>
        <Empty></Empty>
      </div>
    )

  return (
    <div className='py-5 space-y-5 lg:pb-7 lg:py-0 content'>
      <div>
        <Breadcrumb
          items={[
            {
              title: <Link to={'/'}>Home</Link>
            },
            {
              title: <span className='font-medium'>{product.name}</span>
            }
          ]}
        />
      </div>
      <div className='flex flex-col gap-5 lg:grid lg:grid-cols-12'>
        <div className='lg:col-span-5'>
          <div className='w-full lg:h-[530px] flex justify-center'>
            <div className='w-[200px] lg:w-full lg:h-full'>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/images/product/${product.image}`}
                alt=''
                className='object-cover w-full h-full'
              />
            </div>
          </div>
        </div>
        <div className='space-y-3 lg:col-span-7'>
          <h2 className='lg:text-[28px] lg:leading-[44px] leading-6 text-lg font-medium'>{product.name}</h2>
          <span className='text-lg font-medium text-red-500 lg:text-2xl'>
            {product.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </span>
          <div className='flex items-center gap-5'>
            <button
              className='px-5 py-2 mt-2 font-medium text-white bg-blue-500 rounded-lg w-[400px]'
              onClick={handleButton}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage
