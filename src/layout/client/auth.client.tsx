import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link, Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <div className='pt-5 content'>
      <Link to={'/'} className='flex items-center justify-end gap-2'>
        <span className='text-xl '>
          <IoIosArrowRoundBack />
        </span>
        <span className='text-base font-semibold leading-[34px]'>Back to the website</span>
      </Link>
      <div className='py-[44px]'>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Auth
