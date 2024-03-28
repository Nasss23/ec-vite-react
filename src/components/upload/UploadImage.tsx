/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigProvider, Upload, message } from 'antd'
import { useState } from 'react'
import enUS from 'antd/lib/locale/en_US'
import { callUploadSingleFile } from '@/config/api'
import { v4 as uuidv4 } from 'uuid'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

export interface IProps {
  _id?: string
  image?: string
}

const UploadImage = (props: any) => {
  const { setImage, folder } = props

  const [loadingUpload, setLoadingUpload] = useState<boolean>(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  console.log('previewOpen: ', previewOpen)
  const [previewImage, setPreviewImage] = useState('')
  console.log('previewImage: ', previewImage)
  const [previewTitle, setPreviewTitle] = useState('')
  console.log('previewTitle: ', previewTitle)
  const [dataInit] = useState<IProps | null>(null)

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

  return (
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
                  url: `${import.meta.env.VITE_BACKEND_URL}/images/${folder}/${dataInit?.image}`
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
  )
}

export default UploadImage
