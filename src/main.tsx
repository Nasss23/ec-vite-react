import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './layout/layout.tsx';
import Login from './pages/auth/login.tsx';
import Auth from './layout/auth.tsx';
import Register from './pages/auth/register.tsx';
import PageNotFound from './pages/error/pageError.tsx';
import HomePage from './pages/home/home.tsx';
import ProductPage from './pages/home/product.tsx';
import CategoriesPage from './pages/home/categories.tsx';
import ProductCategoryPage from './pages/home/productCategory.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { ToastContainer } from 'react-toastify';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Suspense fallback={<div>Loading.....</div>}>
			<Provider store={store}>
				<App>
					<RouterProvider router={router}></RouterProvider>
				</App>
				<ToastContainer />
			</Provider>
		</Suspense>
	</React.StrictMode>,
);
