import { Card } from '../../components/card';

interface IUser {
	_id: string;
	name: string;
	email: string;
}

const HomePage = () => {
	return (
		<div className='space-y-[50px] content'>
			<div className='flex flex-col gap-[48px]'>
				<div className='flex items-center justify-between'>
					<h1 className='text-[28px] font-medium leading-[44px] text-black'>
						Featured
					</h1>
					<span className='text-sm font-medium'>View all</span>
				</div>
				<div className='grid grid-cols-5 gap-2.5'>
					{Array(5)
						.fill(0)
						.map((item, index) => (
							<Card
								key={index}
								discount={40}
								title='Shark - Mens cabretta white golf glove'
								image='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llaox2hzjanq75_tn'
								price={19}
								rate={4}></Card>
						))}
				</div>
			</div>
			<div className=''></div>
		</div>
	);
};

export default HomePage;
// ''
