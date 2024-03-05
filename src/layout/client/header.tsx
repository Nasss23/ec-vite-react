import { CiSearch } from 'react-icons/ci';
import { FaFacebookF, FaRegHeart, FaTelegramPlane } from 'react-icons/fa';
import { PiInstagramLogoFill } from 'react-icons/pi';
import { IconCategory } from '../../assets/icons';
import { IoIosArrowDown } from 'react-icons/io';
import { IoPersonOutline } from 'react-icons/io5';
import { BsCart2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className='mb-7'>
			<div className='py-[28px] content flex items-center justify-between'>
				<Link to={'/'} className='flex items-center gap-[6px]'>
					<img srcSet='Logo.png 2x' alt='Logo' />
					<h1 className='text-[32px] font-bold leading-[20px]'>Luminae</h1>
				</Link>
				<div className='flex items-center gap-3 px-3 py-3 border rounded border-neutral-200d'>
					<input
						type='text'
						name=''
						className='w-[277px]'
						placeholder='Search product'
					/>
					<span className='text-xl'>
						<CiSearch />
					</span>
				</div>
				<div className='flex items-center gap-3 text-sm font-normal leading-5'>
					<span className='w-[96px]'>About us</span>
					<span className='w-[96px]'>Blog</span>
					<span className='w-[96px]'>Contact us</span>
					<span className='w-[96px]'>Help & support</span>
				</div>
				<div className='flex items-center gap-3 text-[22px] text-base-300'>
					<span>
						<PiInstagramLogoFill />
					</span>
					<span>
						<FaFacebookF />
					</span>
					<span>
						<FaTelegramPlane />
					</span>
				</div>
			</div>
			<div className='py-5 bg-black'>
				<div className='flex items-center justify-between content'>
					<div className='flex items-center gap-[80px]'>
						<Link to={'/categories'} className='flex items-center gap-1'>
							<IconCategory></IconCategory>
							<span className='text-xl font-bold leading-5 text-white'>
								Category
							</span>
						</Link>
						<div className='flex items-center gap-8 text-xs leading-5 text-white'>
							<span className='flex items-center gap-1 '>
								USD <IoIosArrowDown />
							</span>
							<span className='flex items-center gap-1 '>
								English <IoIosArrowDown />
							</span>
						</div>
					</div>
					<div className='flex items-center gap-10 text-xs leading-5 text-white'>
						<Link to={'/auth/login'} className='flex items-center gap-2'>
							<span className='text-xl'>
								<IoPersonOutline />
							</span>
							Sign in
						</Link>
						<div className='flex items-center gap-2'>
							<span className='text-xl'>
								<FaRegHeart />
							</span>
							Favorites
						</div>
						<div className='flex items-center gap-2'>
							<div className='flex items-center gap-2'>
								<span className='text-xl'>
									<BsCart2 />
								</span>
								Cart
							</div>
							<div className='flex items-center justify-center w-5 h-5 rounded-full bg-secondary-400'>
								3
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
