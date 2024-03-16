/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from '@/components/card'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { fetchListBrand } from '@/redux/slice/brand.slice'
import { fetchListCategory } from '@/redux/slice/category.slice'
import { fetchListProduct, fetchListProductParams } from '@/redux/slice/product.slice'
import { Breadcrumb, Empty } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const CategoryDetailsPage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const brand = useAppSelector((state) => state.brand.listBrand)
  const product = useAppSelector((state) => state.product.listProductParams)
  const category = useAppSelector((state) => state.category.listCategory)

  const resBrand = brand.data.filter((brand) => brand.category._id === id)
  const resCategory = category.data.filter((category) => category._id === id)
  const resProduct = product.data.filter((product) => product.brand.category === id)

  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  useEffect(() => {
    dispatch(fetchListBrand())
    dispatch(fetchListProduct())
    dispatch(fetchListCategory())
  }, [dispatch])

  const handleBrandClick = (brandName: string) => {
    let newSelectedBrands = [...selectedBrands]
    if (newSelectedBrands.includes(brandName)) {
      newSelectedBrands = newSelectedBrands.filter((brand) => brand !== brandName)
    } else {
      newSelectedBrands.push(brandName)
    }
    setSelectedBrands(newSelectedBrands)
    dispatch(fetchListProductParams({ name: newSelectedBrands }))
  }

  return (
    <div className='flex flex-col gap-5 content'>
      <div className='space-y-5'>
        <div>
          {resCategory.map((item) => (
            <Breadcrumb
              items={[
                {
                  title: <Link to={'/'}>Trang chủ</Link>
                },
                {
                  title: <Link to={'/category'}>Danh mục</Link>
                },
                {
                  title: <span className='font-medium'>{item.description}</span>
                }
              ]}
              className='text-lg'
              key={item._id}
            />
          ))}
        </div>
        <div className='flex items-center gap-2'>
          {resBrand.map((item, index) => (
            <span
              className={`px-5 py-2 text-xs font-medium uppercase border rounded-full cursor-pointer border-neutral-300 ${selectedBrands.includes(item.name) ? 'bg-blue-500 text-white' : ''}`}
              key={item._id}
              onClick={() => handleBrandClick(item.name)}
            >
              {item.description}
            </span>
          ))}
        </div>
      </div>
      <div className='p-1 bg-gray-100 rounded-md'>
        {resProduct.length > 0 ? (
          <div className='grid grid-cols-5 gap-1'>
            {resProduct.map((item, index) => (
              <Card
                _id={item._id}
                path={item._id}
                key={item._id}
                discount={item.discount}
                title={item.name}
                image={item.image}
                price={item.price}
              ></Card>
            ))}
          </div>
        ) : (
          <div className='flex items-center justify-center w-full h-[500px]'>
            <Empty />
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryDetailsPage
