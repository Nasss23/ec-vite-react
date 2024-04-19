/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Card } from '../card'
import { IMeta, IProduct } from '@/types/backend'
import { callFetchProduct } from '@/config/api'

interface IProps {
  data: IProduct[]
  meta: IMeta
}

const ProductParams = (props: any) => {
  const { name } = props
  const [product, setProduct] = useState<IProps>()
  console.log('product: ', product)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchPhoneProduct(name)
        if (res && res.data) {
          setProduct(res.data)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    fetchData()
  }, [name])

  async function fetchPhoneProduct(name: string) {
    const res = await callFetchProduct(`name=${name}`)
    return res
  }

  return (
    <div className='flex gap-1 overflow-hidden overflow-x-auto lg:grid lg:grid-cols-5'>
      {product?.data.map((item: IProduct) => (
        <Card
          path={item._id}
          _id={item._id}
          key={item._id}
          discount={item.discount}
          title={item.name}
          image={item.image}
          price={item.price}
          sold={item.sold}
        ></Card>
      ))}
    </div>
  )
}

export default ProductParams
