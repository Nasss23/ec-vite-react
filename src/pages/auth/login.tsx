/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { Label } from '../../components/label';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, InputPassword } from '../../components/input';
import { Button } from '../../components/button';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginAuth } from '../../config/api';

interface IForm {
	username: string;
	password: string;
}

const schema = yup.object({
	username: yup.string().required('This is field required').email(''),
	password: yup
		.string()
		.required('This is field required')
		.min(8, 'Password must be 8 character '),
});

const Login = () => {
	const navigate = useNavigate();
	const {
		control,
		handleSubmit,
		formState: { errors, disabled },
	} = useForm<IForm>({
		mode: 'onSubmit',
		// resolver: yupResolver(schema),
	});

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleLogin = async (values: IForm) => {
		const { username, password } = values;
		try {
			const response = await loginAuth(username, password);
			if (response && response.data) {
				console.log('Login successful!', response.data);
				navigate('/');
			} else {
				console.log('Login failed.');
			}
		} catch (error) {
			console.error('An error occurred during login:', error);
		}
	};

	return (
		<div className='flex justify-center'>
			<div className='space-y-9 w-[600px]'>
				<h1 className='text-xl font-bold leading-5'>Sign in</h1>
				<form
					onSubmit={handleSubmit(handleLogin)}
					className='space-y-3'
					autoComplete='off'>
					<div className='space-y-5'>
						<div className='space-y-1'>
							<div className='space-y-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									placeholder='Email address'
									name='username'
									// value={username}
									onChange={(e) => setUsername(e.target.value)}
									errors={errors?.username}
									control={control}></Input>
							</div>
							{errors?.username && (
								<p className='text-red-500'>{errors?.username.message}</p>
							)}
						</div>
						<div className='space-y-1'>
							<div className='space-y-2'>
								<Label htmlFor='password'>Password</Label>
								<InputPassword
									placeholder='**********'
									name='password'
									errors={errors?.password}
									// value={password}
									onChange={(e) => setPassword(e.target.value)}
									control={control}></InputPassword>
							</div>
							{errors?.password && (
								<p className='text-red-500'>{errors?.password.message}</p>
							)}
						</div>
						<div className='flex items-center justify-between'>
							<div></div>
							<span className='text-xs font-normal leading-5 text-blue-500'>
								Forgot password
							</span>
						</div>
						<Button type='submit'>Submit</Button>
					</div>
					<div className='flex items-center space-x-3'>
						<div className='w-full border border-base-200'></div>
						<span className='text-sm font-medium leading-5 text-base-400'>
							OR
						</span>
						<div className='w-full border border-base-200'></div>
					</div>
					<Button
						type='button'
						className='flex items-center justify-center gap-2 !bg-base-800'>
						<span className='text-2xl'>
							<FcGoogle />
						</span>
						Sign in by google
					</Button>
					<div className='flex items-center justify-center gap-2'>
						<p className='text-sm font-medium leading-5 text-base-500'>
							Don’t have an account?
						</p>
						<Link
							to='/auth/register'
							className='text-base font-bold leading-5 underline text-select'>
							Sign up
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
