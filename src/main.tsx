import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { persistor, store } from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Suspense fallback={<div>Loading.....</div>}>
					<App></App>
				</Suspense>
				<ToastContainer />
			</PersistGate>
		</Provider>
	</React.StrictMode>,
);
