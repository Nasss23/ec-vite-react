import React from 'react';
interface IProps {
	htmlFor: string;
	children: React.ReactNode;
}

const Label = ({ children, htmlFor = '' }: IProps) => {
	return (
		<label htmlFor={htmlFor}>
			{children}
			<span className='px-1 text-red-500'>*</span>
		</label>
	);
};

export default Label;
