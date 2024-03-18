/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from '@/components/card'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { fetchListBrand } from '@/redux/slice/brand.slice'
import { fetchListCategory } from '@/redux/slice/category.slice'
import { fetchListProduct, fetchListProductParams } from '@/redux/slice/product.slice'
import { Breadcrumb, Skeleton } from 'antd'
import { useEffect, useState } from 'react'
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
    <div className='flex flex-col gap-5 py-5 content'>
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
        {resBrand.length > 0 ? (
          <>
            <div className='flex items-center gap-2 py-2 overflow-hidden overflow-x-auto'>
              {resBrand.map((item, _index) => (
                <span
                  className={`px-5 py-2 text-xs font-medium uppercase border rounded-full cursor-pointer border-neutral-300 ${selectedBrands.includes(item.name) ? 'bg-blue-500 text-white' : ''}`}
                  key={item._id}
                  onClick={() => handleBrandClick(item.name)}
                >
                  {item.description}
                </span>
              ))}
            </div>
          </>
        ) : (
          <div className='flex items-center gap-2 py-2 overflow-hidden overflow-x-auto'>
            {Array(5)
              .fill(0)
              .map((_item, index) => (
                <Skeleton.Button active style={{}} size='large' key={index} />
              ))}
          </div>
        )}
      </div>
      <div className='p-1 bg-gray-100 rounded-md'>
        {resProduct.length > 0 ? (
          <div className='flex gap-1 overflow-hidden overflow-x-auto lg:grid lg:grid-cols-5'>
            {resProduct.map((item, _index) => (
              <Card
                _id={item._id}
                path={item._id}
                key={item._id}
                discount={item.discount}
                title={item.name}
                image={item.image}
                price={item.price}
                sold={item.sold}
              ></Card>
            ))}
          </div>
        ) : (
          <div className='flex items-center justify-center w-full '>
            <div className='grid w-full grid-cols-5 gap-1'>
              {Array(5)
                .fill(0)
                .map((_item, index) => (
                  <div className='flex flex-col gap-1' key={index}>
                    <Skeleton.Button active style={{ height: 240 }} block size='large' />
                    <Skeleton.Button active style={{}} block size='large' />
                    <div className='flex gap-1'>
                      <Skeleton.Button active style={{}} block size='small' />
                      <Skeleton.Button active style={{}} block size='small' />
                    </div>
                    <Skeleton.Button active style={{}} block size='large' />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryDetailsPage
