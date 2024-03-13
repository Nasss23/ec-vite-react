/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from '@/components/label'
import ReactQuill from 'react-quill'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { Breadcrumb, Button, DatePicker, Input, InputNumber, Select } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
const { RangePicker } = DatePicker

const ProductCreateAdmin = () => {
  const dispatch = useAppDispatch()
  const brand = useAppSelector((state) => state.brand.listBrand)
  console.log('brand: ', brand)

  const value = brand.data
  const options = value.map((item) => ({
    label: <span>{item.name}</span>,
    value: item._id
  }))

  const handleBrandChange = (category: any) => {}

  return (
    <div className='space-y-3'>
      <div>
        <Breadcrumb
          items={[
            {
              title: <Link to={'/admin/product'}>Product</Link>
            },
            {
              title: <span className='font-medium '>Create product</span>
            }
          ]}
        />
      </div>
      <div className='p-5 bg-white rounded-md'>
        <form action='' className='space-y-5'>
          <div className='grid grid-cols-4 gap-5'>
            <div className='space-y-1'>
              <Label htmlFor='name'>Product Name</Label>
              <Input placeholder='Enter name' />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='price'>Price</Label>
              <InputNumber
                defaultValue={0}
                formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                className='w-full'
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='quantity'>Quantity</Label>
              <InputNumber
                defaultValue={0}
                formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                className='w-full'
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='discount'>Discount</Label>
              <InputNumber
                defaultValue={0}
                formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                className='w-full'
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='discountStartDate'>Discount Start Date</Label>
              <DatePicker showTime className='w-full' />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='discountEndDate'>Discount End Date</Label>
              <DatePicker showTime className='w-full' />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='category'>Brand</Label>
              <Select
                defaultValue='Chọn danh mục sản phẩm'
                onChange={handleBrandChange}
                options={options}
                className='w-full'
              />
            </div>
          </div>
          <div>
            <ReactQuill theme='snow' className='h-[300px] mb-10' />
          </div>
          <Button>Submit</Button>
        </form>
      </div>
    </div>
  )
}

export default ProductCreateAdmin
