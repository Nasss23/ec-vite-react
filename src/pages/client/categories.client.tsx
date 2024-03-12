import React from 'react'
import { Breadcrumb, Checkbox, Slider } from 'antd'
import { BiCategory } from 'react-icons/bi'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { Card } from '../../components/card'
import { CiSearch } from 'react-icons/ci'

const CategoriesPage = () => {
  return (
    <div>
      <div className='py-6 content'>
        <Breadcrumb
          className='text-base font-medium leading-5'
          items={[
            {
              title: <Link to='/'>Home</Link>
            },
            {
              title: 'Category'
            }
          ]}
        />
      </div>
      <div className='py-6 bg-[#E9E9E9]'>
        <div className='flex items-center justify-between content'>
          <div className='flex items-center gap-8'>
            <h1 className='text-xl font-bold leading-5 '>Phone</h1>
            <span className='text-base font-normal text-[#555] leading-5 '>110 items</span>
          </div>
          <div className='flex items-center gap-3 px-4 py-2 border border-neutral-400'>
            <span className='text-base font-normal text-[#555] leading-5 '>Sort by order</span>
            <span className='text-xl'>
              <MdOutlineKeyboardArrowDown />
            </span>
          </div>
        </div>
      </div>
      <div className='content py-9'>
        <div className='grid grid-cols-12'>
          <div className='col-span-2 pr-5 space-y-5 border border-y-transparent border-l-transparent border-neutral-300'>
            <div className='flex items-center gap-4 py-4'>
              <span className='text-xl'>
                <BiCategory />
              </span>
              <span className='text-lg font-bold leading-5'>All Category</span>
            </div>
            <div className='flex flex-col gap-3 pb-5 border border-x-transparent border-t-transparent border-neutral-300'>
              <span className='text-lg font-bold leading-5 '>Brand</span>
              <div className='flex items-center gap-3 px-4 py-2 border rounded-md border-neutral-300'>
                <input type='text' name='' id='' className='w-full' placeholder='Search' />
                <button>
                  <CiSearch />
                </button>
              </div>
              <div className='flex flex-col gap-1'>
                <Checkbox>Apple</Checkbox>
                <Checkbox>Samsung</Checkbox>
              </div>
            </div>
            <div className='flex flex-col gap-3 pb-5 border border-x-transparent border-t-transparent border-neutral-300'>
              <span className='text-lg font-bold leading-5 '>Shipped from</span>
              <div className='flex flex-col gap-1'>
                <Checkbox>TP.Hồ Chí Minh</Checkbox>
                <Checkbox>Hà Nội</Checkbox>
              </div>
            </div>
            <div className='flex flex-col gap-3 pb-5 border border-x-transparent border-t-transparent border-neutral-300'>
              <span className='text-lg font-bold leading-5 '>Price</span>
              <div className='flex flex-col gap-1'>
                <Slider min={0} max={50000} range defaultValue={[0, 50000]} />
              </div>
            </div>
          </div>
          <div className='col-span-10 pl-5'>
            <div className='grid grid-cols-4 gap-3'>
              {Array(9)
                .fill(0)
                .map((item, index) => (
                  <Card
                    key={index}
                    discount={40}
                    title='Shark - Mens cabretta white golf glove'
                    image='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llaox2hzjanq75_tn'
                    price={19}
                    rate={4}
                  ></Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage
