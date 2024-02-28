import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className='text-center'>
				<h1 className='mb-4 font-semibold text-red-500 text-9xl'>404</h1>
				<p className='mb-4 text-2xl font-medium text-gray-600'>
					Oops! Looks like you're lost.
				</p>
				<div className='animate-bounce'>
					<svg
						className='w-20 h-20 mx-auto text-red-500'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
						/>
					</svg>
				</div>
				<p className='mt-4 text-2xl font-medium text-gray-600'>
					Let's get you back{' '}
					<Link to={'/'} className='text-blue-500 uppercase'>
						home
					</Link>
					.
				</p>
			</div>
		</div>
	);
};

export default PageNotFound;
