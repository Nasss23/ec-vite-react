import { FaArrowLeft } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'

const nav = [
  {
    key: 1,
    title: 'Home',
    path: '/admin/home',
    icon: <></>
  },
  {
    key: 2,
    title: 'Category',
    path: '/admin/category',
    icon: <></>
  },
  {
    key: 3,
    title: 'Brand',
    path: '/admin/brand',
    icon: <></>
  },
  {
    key: 4,
    title: 'Product',
    path: '/admin/product',
    icon: <></>
  }
]

const LayoutNavbarAdmin = () => {
  const className =
    'flex items-center gap-2 px-5 py-2 text-base font-medium transition-all ease-linear rounded-md decoration-slice'
  return (
    <div className='flex flex-col justify-between min-h-screen col-span-2 bg-neutral-100'>
      <div className='flex-col hidden gap-10 lg:flex '>
        <Link to={'/'} className='lg:flex items-center gap-[6px] hidden lg:px-5 lg:pt-7'>
          <h1 className='text-3xl font-bold leading-[20px]'>Admin</h1>
        </Link>
        <div className=''>
          <nav>
            {nav.map((item) => (
              <NavLink
                key={item.key}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? `${className} bg-blue-500 text-white` : `${className} text-gray-500`
                }
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      <div className='flex items-center gap-3 px-5 py-2'>
        <FaArrowLeft />
        <Link to={'/'} className='text-lg font-bold'>
          Back home
        </Link>
      </div>
    </div>
  )
}

export default LayoutNavbarAdmin
