import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './layout/client/layout.tsx';
import Login from './pages/auth/login.tsx';
import Auth from './layout/client/auth.tsx';
import Register from './pages/auth/register.tsx';
import PageNotFound from './pages/error/pageError.tsx';
import HomePage from './pages/home/home.tsx';
import ProductPage from './pages/home/product.tsx';
import CategoriesPage from './pages/home/categories.tsx';
import ProductCategoryPage from './pages/home/productCategory.tsx';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hook.ts';
import { getAccount } from './redux/auth/account.slice.ts';

function App() {
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector((state) => state.account.isLoading);

	useEffect(() => {
		if (
			window.location.pathname === '/login' ||
			window.location.pathname === '/register'
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
	]);
	return (
		<>
			<RouterProvider router={router}></RouterProvider>
		</>
	);
}

export default App;
