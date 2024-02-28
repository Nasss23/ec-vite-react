import React from 'react';

interface IProps {
	children: React.ReactNode;
	type: 'submit' | 'button' | 'reset' | undefined;
	className?: string;
	disabled?: boolean;
}

const Button = ({
	children,
	type = 'button',
	className = '',
	disabled,
	...props
}: IProps) => {
	return (
		<button
			type={type}
			className={`${className} py-4 px-8  w-full text-sm font-medium leading-5 uppercase text-white rounded-md ${
				disabled ? 'bg-base-500' : 'bg-primary-500'
			}`}
			{...props}>
			{children}
		</button>
	);
};

export default Button;
