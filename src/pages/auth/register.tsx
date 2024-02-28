/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { Label } from '../../components/label';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, InputPassword } from '../../components/input';
import { Button } from '../../components/button';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

interface IForm {
	email: string;
	name: string;
	password: string;
}

const schema = yup.object({
	name: yup.string().required('This is field required'),
	email: yup.string().required('This is field required').email(''),
	password: yup
		.string()
		.required('This is field required')
		.min(8, 'Password must be 8 character '),
});

const Register = () => {
	const {
		control,
		handleSubmit,
		formState: { errors, disabled },
	} = useForm<IForm>({
		mode: 'onSubmit',
		resolver: yupResolver(schema),
	});

	const handleRegister = (e: any) => {
		console.log(e);
	};
	return (
		<div className='flex justify-center'>
			<div className='space-y-9 w-[600px]'>
				<h1 className='text-xl font-bold leading-5'>Sign up</h1>
				<form
					action=''
					onSubmit={handleSubmit(handleRegister)}
					className='space-y-3'>
					<div className='space-y-5'>
						<div className='space-y-1'>
							<div className='space-y-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									type='email'
									placeholder='Email address'
									name='email'
									errors={errors?.email}
									control={control}></Input>
							</div>
							{errors?.email && (
								<p className='text-red-500'>{errors?.email.message}</p>
							)}
						</div>
						<div className='space-y-1'>
							<div className='space-y-2'>
								<Label htmlFor='name'>Username</Label>
								<Input
									placeholder='Username'
									name='name'
									errors={errors?.name}
									control={control}></Input>
							</div>
							{errors?.name && (
								<p className='text-red-500'>{errors?.name.message}</p>
							)}
						</div>
						<div className='space-y-1'>
							<div className='space-y-2'>
								<Label htmlFor='password'>Password</Label>
								<InputPassword
									type='password'
									placeholder='**********'
									name='password'
									errors={errors?.password}
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
						<Button
							type='submit'
							disabled={
								errors.email || errors.name || (errors.password && !disabled)
									? true
									: false
							}>
							Submit
						</Button>
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
							Already have an account?
						</p>
						<Link
							to='/auth/login'
							className='text-base font-bold leading-5 underline text-select'>
							Sign in
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
