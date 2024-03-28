/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from '@/components/label'
import ReactQuill from 'react-quill'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { Breadcrumb, Button, DatePicker, Input, InputNumber, Select, message } from 'antd'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { callCreateProduct } from '@/config/api'
import { useForm } from 'react-hook-form'
import { fetchListProduct, resetCreateProduct } from '@/redux/slice/product.slice'
import { UploadImage } from '@/components/upload'
import { fetchListBrand } from '@/redux/slice/brand.slice'

interface IProductLogo {
  name: string
  uid: string
}

const ProductCreateAdmin = () => {
  const { handleSubmit } = useForm({ mode: 'onSubmit' })

  const dispatch = useAppDispatch()
  const brands = useAppSelector((state) => state.brand.listBrand)

  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(0)
  const [discount, setDiscount] = useState<number>(0)
  const [brand, setBrand] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<IProductLogo[]>([])

  const value = brands.data
  console.log('value: ', value)
  const options = value.map((item) => ({
    label: <span>{item.name}</span>,
    value: item._id
  }))

  useEffect(() => {
    dispatch(fetchListProduct())
    dispatch(fetchListBrand())
  }, [dispatch])

  const handleBrandChange = (brand: any) => {
    setBrand(brand)
  }

  const handleCreateProduct = async () => {
    const res = await callCreateProduct(name, price, discount, quantity, image[0]?.name, brand, description)
    if (res.data) {
      dispatch(resetCreateProduct())
      message.success('Thêm thành công')
    }
  }

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
        <form action='' className='space-y-5' onSubmit={handleSubmit(handleCreateProduct)}>
          <div className='grid grid-cols-1 gap-3 lg:gap-5 lg:grid-cols-4'>
            <div className='space-y-1'>
              <Label htmlFor='name'>Product Name</Label>
              <Input placeholder='Enter name' onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='price'>Price</Label>
              <InputNumber
                defaultValue={0}
                formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                onChange={(e: any) => setPrice(+e)}
                className='w-full'
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='quantity'>Quantity</Label>
              <InputNumber
                defaultValue={0}
                formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                className='w-full'
                onChange={(e: any) => setQuantity(+e)}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='discount'>Discount</Label>
              <InputNumber
                defaultValue={0}
                formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                onChange={(e: any) => setDiscount(+e)}
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
            <div className='space-y-1'>
              <Label htmlFor='category'>Image</Label>
              <UploadImage setImage={setImage} folder='product'></UploadImage>
            </div>
          </div>
          <div className=''>
            <ReactQuill
              theme='snow'
              className='h-[300px] lg:h-[600px] lg:mb-10 mb-14'
              value={description}
              onChange={setDescription}
            />
          </div>
          <Button type='primary' htmlType='submit' className='w-[200px] bg-blue-500'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ProductCreateAdmin
