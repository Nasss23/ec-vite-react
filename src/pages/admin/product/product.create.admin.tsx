/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from '@/components/label'
import ReactQuill from 'react-quill'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { Breadcrumb, Button, DatePicker, Input, InputNumber, Select, Upload, message, ConfigProvider } from 'antd'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { callCreateProduct, callUploadSingleFile } from '@/config/api'
import { v4 as uuidv4 } from 'uuid'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useForm } from 'react-hook-form'
import { fetchListProduct, resetCreateProduct } from '@/redux/slice/product.slice'
import enUS from 'antd/lib/locale/en_US'
export interface IProductProps {
  _id?: string
  name?: string
  price?: number
  image?: string
  brand?: {
    _id?: string
    name: string
    description: string
    category: string
  }
  description?: string
  slug?: string
  quantity?: number
  discount?: number
  sold?: number
  discountStartDate?: Date | null
  discountEndDate?: Date | null
}
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

  const [loadingUpload, setLoadingUpload] = useState<boolean>(false)
  const [image, setImage] = useState<IProductLogo[]>([])

  const [previewOpen, setPreviewOpen] = useState(false)
  console.log('previewOpen: ', previewOpen)
  const [previewImage, setPreviewImage] = useState('')
  console.log('previewImage: ', previewImage)
  const [previewTitle, setPreviewTitle] = useState('')
  console.log('previewTitle: ', previewTitle)
  const [dataInit, setDataInit] = useState<IProductProps | null>(null)

  const c = () => {
    setDataInit(null)
  }
  console.log('c: ', c)

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

  const handleRemoveFile = (_file: any) => {
    setImage([])
  }

  const handleChange = (info: any) => {
    console.log('info: ', info)
    if (info.file.status === 'uploading') {
      setLoadingUpload(true)
    }
    if (info.file.status === 'done') {
      setLoadingUpload(false)
    }
    if (info.file.status === 'error') {
      setLoadingUpload(false)
      message.error('Đã có lỗi xảy ra khi upload file.')
    }
  }

  const handlePreview = async (file: any) => {
    if (!file.originFileObj) {
      setPreviewImage(file.url)
      setPreviewOpen(true)
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
      return
    }
    getBase64(file.originFileObj, (url: string) => {
      setPreviewImage(url)
      setPreviewOpen(true)
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    })
  }

  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 5
    if (!isLt2M) {
      message.error('Image must smaller than 5MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const handleUploadFileLogo = async ({ file, onSuccess, onError }: any) => {
    const res = await callUploadSingleFile(file, 'product')
    if (res && res.data) {
      setImage([
        {
          name: res.data?.fileName,
          uid: uuidv4()
        }
      ])
      if (onSuccess) onSuccess('ok')
    } else {
      if (onError) {
        setImage([])
        const error = new Error(res.data?.message)
        onError({ event: error })
      }
    }
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
          <div className='grid grid-cols-4 gap-5'>
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
              <ConfigProvider locale={enUS}>
                <Upload
                  name='logo'
                  listType='picture-card'
                  className='avatar-uploader'
                  maxCount={1}
                  multiple={false}
                  customRequest={handleUploadFileLogo}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  onRemove={(file) => handleRemoveFile(file)}
                  onPreview={handlePreview}
                  defaultFileList={
                    dataInit?._id
                      ? [
                          {
                            uid: uuidv4(),
                            name: dataInit?.image ?? '',
                            status: 'done',
                            url: `${import.meta.env.VITE_BACKEND_URL}/images/product/${dataInit?.image}`
                          }
                        ]
                      : []
                  }
                >
                  <div>
                    {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </ConfigProvider>
            </div>
          </div>
          <div>
            <ReactQuill theme='snow' className='h-[300px] mb-10' value={description} onChange={setDescription} />
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
