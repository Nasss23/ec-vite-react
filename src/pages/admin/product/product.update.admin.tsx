/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from '@/components/label'
import ReactQuill from 'react-quill'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { Breadcrumb, Button, DatePicker, Input, InputNumber, Select } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { fetchListProduct, fetchProductById, updateProduct } from '@/redux/slice/product.slice'
import { UploadImage } from '@/components/upload'

interface IProductLogo {
  name: string
  uid: string
}
const ProductUpdateAdmin = () => {
  const id = useParams()
  console.log('id: ', id)
  const { handleSubmit } = useForm({ mode: 'onSubmit' })

  const dispatch = useAppDispatch()
  const brands = useAppSelector((state) => state.brand.listBrand)

  const data = useAppSelector((state) => state.product.product)
  console.log('data: ', data)

  const [dataId, setDataId] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(0)
  const [discount, setDiscount] = useState<number>(0)
  const [brand, setBrand] = useState<string>('')
  console.log('brand: ', brand)
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<IProductLogo[]>([])

  useEffect(() => {
    if (id) {
      const productId = id.id
      dispatch(fetchProductById({ _id: productId }))
    }
  }, [dispatch, id])

  const value = brands.data
  const options = value.map((item) => ({
    label: <span>{item.name}</span>,
    value: item._id
  }))

  useEffect(() => {
    dispatch(fetchListProduct())
  }, [dispatch])

  const handleBrandChange = (brand: any) => {
    setBrand(brand)
  }

  useEffect(() => {
    if (data?._id) {
      setDataId(data?._id)
      setName(data?.name as string)
      setPrice(data?.price as number)
      setDiscount(data?.discount as number)
      setQuantity(data?.quantity as number)
      setDescription(data?.description as string)
      //   setBrand(data?.brand?._id as string)
      //   setImage(data?.image )
    }
  }, [data])

  const handleUpdateProduct = async () => {
    console.log('object, ', { _id: dataId, name, description, discount, price, quantity, image })
    dispatch(updateProduct({ _id: dataId, name, description, discount, price, quantity, image }))
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
        <form action='' className='space-y-5' onSubmit={handleSubmit(handleUpdateProduct)}>
          <div className='grid grid-cols-1 gap-3 lg:gap-5 lg:grid-cols-4'>
            <div className='space-y-1'>
              <Label htmlFor='name'>Product Name</Label>
              <Input placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='price'>Price</Label>
              <InputNumber
                defaultValue={0}
                value={price}
                formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                onChange={(e: any) => setPrice(+e)}
                className='w-full'
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='quantity'>Quantity</Label>
              <InputNumber
                defaultValue={0}
                value={quantity}
                formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                className='w-full'
                onChange={(e: any) => setQuantity(+e)}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='discount'>Discount</Label>
              <InputNumber
                value={discount}
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
            <div className='hidden space-y-1'>
              <Label htmlFor='category'>Brand</Label>
              <Select
                defaultValue='Chọn danh mục sản phẩm'
                onChange={handleBrandChange}
                options={options}
                className='w-full '
              />
            </div>
            <div className='hidden space-y-1'>
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

export default ProductUpdateAdmin
