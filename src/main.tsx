import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './layout/layout.tsx';
import Login from './pages/auth/login.tsx';
import Auth from './layout/auth.tsx';
import Register from './pages/auth/register.tsx';
import PageNotFound from './pages/error/pageError.tsx';
import HomePage from './pages/home/home.tsx';
import ProductPage from './pages/home/product.tsx';
import CategoriesPage from './pages/home/categories.tsx';

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
				path: '/product',
				element: <ProductPage></ProductPage>,
			},
			{
				path: '/categories',
				element: <CategoriesPage></CategoriesPage>,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Suspense fallback={<div>Loading.....</div>}>
			<App>
				<RouterProvider router={router}></RouterProvider>
			</App>
		</Suspense>
	</React.StrictMode>,
);
