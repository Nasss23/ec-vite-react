import { Outlet } from 'react-router-dom'
import LayoutHeaderAdmin from './header.admin'
import LayoutNavbarAdmin from './navbar.admin'

const LayoutAdmin = () => {
  return (
    <div className='grid grid-cols-12 max-w-[1440px] mx-auto'>
      <LayoutNavbarAdmin></LayoutNavbarAdmin>
      <div className='col-span-10'>
        <div className='flex flex-col gap-5 px-5'>
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
