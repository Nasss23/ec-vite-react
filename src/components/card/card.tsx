/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { createCart, resetCreateCart } from '@/redux/slice/cart.slice'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

interface IProps {
  _id: string
  image: string
  title: string
  rate?: number
  price: number
  discount?: number
  path?: string
  sold?: number
}

const Card: React.FC<IProps> = (props: IProps) => {
  const { title = '', discount = 0, image = '', price, path, _id, sold } = props

  const dispatch = useAppDispatch()
  const isCreateSuccess = useAppSelector((state) => state.cart.isCreateSuccess)

  useEffect(() => {
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
    <div className='px-2 py-3 transition-all ease-linear bg-white border rounded-lg hover:shadow-2xl decoration-clone'>
      <Link to={`/product/${path}`} className='space-y-3'>
        <div className='h-[240px] flex items-center justify-center'>
          <img src={image} alt='' className='flex-shrink-0 object-cover w-full h-full' />
        </div>
        <div className=''>
          <p className='text-base leading-[22px] text-[#141718] font-semibold line-clamp-2'>{title}</p>
          {/* <Rate className='text-sm' value={rate} /> */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <span className='text-base leading-[26px] text-[#141718] font-semibold '>
                {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </span>
              <span className='text-sm line-through leading-[26px] text-red-400 font-medium '>{discount}%</span>
            </div>
            {sold && sold > 0 ? (
              <span className='text-xs text-gray-300'>Đã bán {sold}</span>
            ) : (
              <span className='text-xs text-gray-300'>Đã bán 0</span>
            )}
          </div>
        </div>
      </Link>
      <button
        className='w-full px-5 py-2 mt-2 font-medium text-white transition-all ease-linear bg-black rounded-lg hover:bg-blue-500 decoration-slice'
        onClick={handleButton}
      >
        Add to cart
      </button>
    </div>
  )
}

export default Card
