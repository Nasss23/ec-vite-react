import { Rate } from 'antd';
import { Link } from 'react-router-dom';

interface IProps {
	image: string;
	title: string;
	rate: number;
	price: number;
	discount: number;
}

const Card: React.FC<IProps> = (props: IProps) => {
	const { title = '', discount, image = '', price, rate = 3 } = props;
	const handleButton = () => {
		console.log('>>>> Click');
	};
	return (
		<div className='px-2 py-3 border rounded-lg shadow-lg '>
			<Link to='/categories/:id' className='space-y-3'>
				<div className='h-[280px] group'>
					<img
						src={image}
						alt=''
						className='flex-shrink-0 object-cover w-full h-full'
					/>
				</div>
				<div className=''>
					<p className='text-base leading-[22px] text-[#141718] font-semibold line-clamp-2'>
						{title}
					</p>
					<Rate className='text-sm' value={rate} />
					<div className='flex items-center gap-2'>
						<span className='text-base leading-[26px] text-[#141718] font-semibold '>
							${price}.00
						</span>
						<span className='text-sm line-through leading-[26px] text-red-400 font-medium '>
							${discount}.00
						</span>
					</div>
				</div>
			</Link>
			<button
				className='w-full px-5 py-2 mt-2 font-medium text-white bg-black rounded-lg'
				onClick={handleButton}>
				Add to cart
			</button>
		</div>
	);
};

export default Card;
