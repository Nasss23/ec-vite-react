/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { useEffect } from 'react'
import { fetchListProduct } from '@/redux/slice/product.slice'
import { IProduct } from '@/types/backend'
import { Card } from '@/components/card'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const product = useAppSelector((state) => state.product.listProduct)

  useEffect(() => {
    dispatch(fetchListProduct())
  }, [])

  return (
    <div className='lg:space-y-[50px] space-y-[25px] content py-3 lg:py-0'>
      <div className='flex flex-col lg:gap-[48px] gap-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-[28px] font-medium leading-[44px] text-black'>Featured</h1>
          <span className='text-sm font-medium'>View all</span>
        </div>
        <div className='flex gap-1 overflow-hidden overflow-x-auto lg:grid lg:grid-cols-5'>
          {product?.data?.map((item: IProduct, _index: number) => (
            <Card
              path={item._id}
              _id={item._id}
              key={item._id}
              discount={item.discount}
              title={item.name}
              image={item.image}
              price={item.price}
              sold={item.sold}
            ></Card>
          ))}
        </div>
      </div>
      <div className=''></div>
    </div>
  )
}

export default HomePage
// ''
