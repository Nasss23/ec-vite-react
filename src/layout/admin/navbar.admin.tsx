import { NavLink } from 'react-router-dom'

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
    <div className='flex-col hidden h-screen col-span-2 gap-10 lg:flex bg-neutral-100 '>
      <div className='py-5'>
        <img src='' alt='' />
      </div>
      <div>
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
  )
}

export default LayoutNavbarAdmin
