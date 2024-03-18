/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { fetchListCategory } from '@/redux/slice/category.slice'
import { ICatagory } from '@/types/backend'
import { Breadcrumb } from 'antd'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const CategoryPage = () => {
  const dispatch = useAppDispatch()
  const category = useAppSelector((state) => state.category.listCategory)
  console.log('category: ', category)

  useEffect(() => {
    dispatch(fetchListCategory())
  }, [])
  return (
    <div className='flex flex-col gap-5 content'>
      <div>
        <Breadcrumb
          items={[
            {
              title: <Link to={'/'}>Trang chủ</Link>
            },
            {
              title: <span className='font-medium'>Danh mục</span>
            }
          ]}
          className='text-lg'
        />
      </div>
      <div>
        <div className='flex items-center gap-2'>
          {category.data.map((item: ICatagory) => (
            <Link
              to={`/category/${item._id}`}
              className='px-5 py-2 text-xs font-medium uppercase border rounded-full cursor-pointer border-neutral-300'
              key={item._id}
            >
              {item.description}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
