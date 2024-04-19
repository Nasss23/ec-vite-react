/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from './axios-customize' // Use the same import statement

//Auth account
export const registerAuth = (name: string, email: string, password: string) => {
  return axios.post('/api/v1/auth/register', {
    name,
    email,
    password
  })
}

export const loginAuth = (username: string, password: string) => {
  return axios.post('/api/v1/auth/login', {
    username,
    password
  })
}

export const callFetchAccount = () => {
  return axios.get('/api/v1/auth/account')
  // return axios.get<IBackendRes<IGetAccount>>('/api/v1/auth/account');
}
export const callRefreshToken = () => {
  return axios.get('/api/v1/auth/refresh')
}

export const callLogout = () => {
  return axios.post('/api/v1/auth/logout')
}

//API USER
export const fetchData = () => {
  return axios.get('/api/v1/users')
}

//API CATEGORY
export const createCategory = (name: string, description: string) => {
  return axios.post('/api/v1/category', { name, description })
}

export const fetchCategory = () => {
  return axios.get('/api/v1/category')
}

//API User
export const fetchUserById = (id: string) => {
  return axios.get(`/api/v1/users/${id}`)
}

export const callUploadSingleFile = async (file: any, folderType: string) => {
  const bodyFormData = new FormData()
  bodyFormData.append('file', file)
  return axios({
    method: 'post',
    url: '/api/v1/file/upload',
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data',
      folder_type: folderType
    }
  })
}

export const callCreateProduct = (
  name: string,
  price: number,
  discount: number,
  quantity: number,
  image: string,
  brand: string,
  description: string
) => {
  return axios.post('/api/v1/product', {
    name,
    price,
    discount,
    quantity,
    image,
    brand,
    description
  })
}

export const callFetchProduct = (query: string) => {
  return axios.get(`/api/v1/product?${query}`)
}
