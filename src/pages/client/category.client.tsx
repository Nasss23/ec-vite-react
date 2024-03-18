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

  useEffect(() => {
    dispatch(fetchListCategory())
  }, [])
  return (
    <div className='flex flex-col py-5 lg:gap-5 content'>
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
        <div className='flex items-center gap-2 py-2 overflow-hidden overflow-x-auto'>
          <div className='flex gap-2'>
            {category.data.map((item: ICatagory) => (
              <Link
                to={`/category/${item._id}`}
                key={item._id}
                className='block px-5 py-2 text-xs font-medium uppercase border rounded-full cursor-pointer text-center border-neutral-300 w-[120px]'
              >
                {item.description}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
