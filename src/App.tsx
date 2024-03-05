import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './layout/client/layout.client.tsx';
import Login from './pages/auth/login.tsx';
import Auth from './layout/client/auth.client.tsx';
import Register from './pages/auth/register.tsx';
import PageNotFound from './pages/error/pageError.tsx';
import HomePage from './pages/client/home.client.tsx';
import ProductPage from './pages/client/product.client.tsx';
import CategoriesPage from './pages/client/categories.client.tsx';
import ProductCategoryPage from './pages/client/category.client.tsx';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hook.ts';
import { getAccount } from './redux/auth/account.slice.ts';
import LayoutAdmin from './layout/admin/layout.admin.tsx';
import HomeAdmin from './pages/admin/home.admin.tsx';
import CategoryAdmin from './pages/admin/category.admin.tsx';
import BrandAdmin from './pages/admin/brand.admin.tsx';

function App() {
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector((state) => state.account.isLoading);

	useEffect(() => {
		if (
			window.location.pathname === '/auth/login' ||
			window.location.pathname === '/auth/register'
		)
			return;
		dispatch(getAccount());
	}, []);

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
							element: <Register></Register>,
						},
						{
							path: 'login',
							element: <Login></Login>,
						},
					],
				},
				{
					path: '',
					element: <HomePage></HomePage>,
				},
				{
					path: 'product',
					element: <ProductCategoryPage></ProductCategoryPage>,
				},
				{
					path: 'categories',
					element: <CategoriesPage></CategoriesPage>,
				},
				{
					path: 'categories/:id',
					element: <ProductPage></ProductPage>,
				},
			],
		},
		{
			path: 'admin',
			element: <LayoutAdmin></LayoutAdmin>,
			errorElement: <PageNotFound></PageNotFound>,
			children: [
				{
					path: '',
					element: <HomeAdmin></HomeAdmin>,
				},
				{
					path: 'category',
					element: <CategoryAdmin></CategoryAdmin>,
				},
				{
					path: 'brand',
					element: <BrandAdmin></BrandAdmin>,
				},
			],
		},
	]);
	return (
		<>
			<RouterProvider router={router}></RouterProvider>
		</>
	);
}

export default App;
