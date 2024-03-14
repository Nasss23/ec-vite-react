import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { createCart, resetCreateCart } from '@/redux/slice/cart.slice'
import { fetchProductById } from '@/redux/slice/product.slice'
import { Breadcrumb } from 'antd'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const ProductPage = () => {
  const { productId } = useParams() // Lấy `productId` từ URL

  console.log('productId: ', productId)
  const _id = productId
  const dispatch = useAppDispatch()
  const product = useAppSelector((state) => state.product.listOneProduct)
  console.log('product: ', product)
  const isCreateSuccess = useAppSelector((state) => state.cart.isCreateSuccess)

  useEffect(() => {
    dispatch(fetchProductById({ _id: productId }))
    if (isCreateSuccess === true) {
      dispatch(resetCreateCart())
    }
  }, [isCreateSuccess])

  const handleButton = () => {
    if (_id) {
      dispatch(createCart({ product: _id }))
    }
  }

  return (
    <div className='space-y-5 pb-7 content'>
      <div>
        <Breadcrumb
          items={[
            {
              title: <Link to={'/'}>Home</Link>
            }
            // {
            //   // title: <span className='font-medium'>{product.name}</span>
            // }
          ]}
        />
      </div>
      <div className='grid grid-cols-12 gap-5'>
        <div className='col-span-5'>
          <div className='w-full h-[530px]'>
            <img src={product.image} alt='' className='object-cover w-full h-full' />
          </div>
        </div>
        <div className='col-span-7'>
          <h2 className='text-[28px] leading-[44px] font-medium'>{product.name}</h2>
          <span className='text-2xl font-medium text-red-500'>
            {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </span>
          <button className='w-full px-5 py-2 mt-2 font-medium text-white bg-black rounded-lg ' onClick={handleButton}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
