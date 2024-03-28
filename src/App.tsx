/* eslint-disable react-hooks/exhaustive-deps */
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Layout from './layout/client/layout.client.tsx'
import Login from './pages/auth/login.tsx'
import Auth from './layout/client/auth.client.tsx'
import Register from './pages/auth/register.tsx'
import PageNotFound from './pages/error/pageError.tsx'
import HomePage from './pages/client/home.client.tsx'
import ProductDetailsPage from './pages/client/product.details.client.tsx'
import CategoryPage from './pages/client/category.client.tsx'
import { useEffect } from 'react'
import { useAppDispatch } from './redux/hook.ts'
import { getAccount } from './redux/auth/account.slice.ts'
import LayoutAdmin from './layout/admin/layout.admin.tsx'
import HomeAdmin from './pages/admin/home.admin.tsx'
import CategoryAdmin from './pages/admin/category.admin.tsx'
import BrandAdmin from './pages/admin/brand.admin.tsx'
import ProductAdmin from './pages/admin/product.admin.tsx'
import ProductCreateAdmin from './pages/admin/product/product.create.admin.tsx'
import CartPage from './pages/client/cart.client.tsx'
import CategoryDetailsPage from './pages/client/category.details.client.tsx'
import PaymentPage from './pages/client/payment.client.tsx'
import ProductUpdateAdmin from './pages/admin/product/product.update.admin.tsx'

function App() {
  const dispatch = useAppDispatch()
  // const isLoading = useAppSelector((state) => state.account.isLoading);

  useEffect(() => {
    if (window.location.pathname === '/auth/login' || window.location.pathname === '/auth/register') return
    dispatch(getAccount())
  }, [])

  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      errorElement: <PageNotFound></PageNotFound>,
      children: [
        {
          path: 'auth',
          element: <Auth></Auth>,
          children: [
            {
              path: 'register',
              element: <Register></Register>
            },
            {
              path: 'login',
              element: <Login></Login>
            }
          ]
        },
        {
          path: '',
          element: <HomePage></HomePage>
        },
        {
          path: 'product',
          element: <CategoryPage></CategoryPage>
        },
        {
          path: 'product/:productId',
          element: <ProductDetailsPage></ProductDetailsPage>
        },
        {
          path: 'category',
          element: <CategoryPage></CategoryPage>
        },
        {
          path: 'category/:id',
          element: <CategoryDetailsPage></CategoryDetailsPage>
        },
        {
          path: 'cart',
          element: <CartPage></CartPage>
        },
        {
          path: 'payment',
          element: <PaymentPage></PaymentPage>
        }
      ]
    },
    {
      path: 'admin',
      element: <LayoutAdmin></LayoutAdmin>,
      errorElement: <PageNotFound></PageNotFound>,
      children: [
        {
          path: 'home',
          element: <HomeAdmin></HomeAdmin>
        },
        {
          path: 'category',
          element: <CategoryAdmin></CategoryAdmin>
        },
        {
          path: 'brand',
          element: <BrandAdmin></BrandAdmin>
        },
        {
          path: 'product',
          element: <ProductAdmin></ProductAdmin>
        },
        {
          path: 'product/create',
          element: <ProductCreateAdmin></ProductCreateAdmin>
        },
        {
          path: 'product/update/:id',
          element: <ProductUpdateAdmin></ProductUpdateAdmin>
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
