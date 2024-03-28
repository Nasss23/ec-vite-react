import { Outlet } from 'react-router-dom'
import LayoutHeaderAdmin from './header.admin'
import LayoutNavbarAdmin from './navbar.admin'

const LayoutAdmin = () => {
  return (
    <div className='lg:grid lg:grid-cols-12 max-w-[1440px] mx-auto'>
      <LayoutNavbarAdmin></LayoutNavbarAdmin>
      <div className='lg:col-span-10'>
        <div className='flex flex-col gap-5 p-2 lg:px-5'>
          <LayoutHeaderAdmin></LayoutHeaderAdmin>
          <div className='p-3 rounded-md bg-neutral-100'>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutAdmin
