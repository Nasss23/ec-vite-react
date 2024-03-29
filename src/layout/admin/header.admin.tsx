import { Dropdown } from 'antd'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { callLogout } from '../../config/api'
import { setLogoutAction } from '../../redux/auth/account.slice'
import { Link, useNavigate } from 'react-router-dom'
import { ContactsOutlined, LogoutOutlined } from '@ant-design/icons'
import { IoPersonOutline } from 'react-icons/io5'
import { GiHamburgerMenu } from 'react-icons/gi'
const LayoutHeaderAdmin = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.account.isAuthenticated)
  const user = useAppSelector((state) => state.account.user)
  const [openMangeAccount, setOpenManageAccount] = useState<boolean>(false)
  console.log('openMangeAccount: ', openMangeAccount)

  const handleLogout = async () => {
    const res = await callLogout()
    if (res && res.data) {
      dispatch(setLogoutAction({}))
      navigate('/')
    }
  }

  const itemsDropdown = [
    {
      label: (
        <label style={{ cursor: 'pointer' }} onClick={() => setOpenManageAccount(true)}>
          Quản lý tài khoản
        </label>
      ),
      key: 'manage-account',
      icon: <ContactsOutlined />
    },
    {
      label: (
        <label style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
      key: 'logout',
      icon: <LogoutOutlined />
    }
  ]

  const itemsMenu = [
    {
      label: (
        <Link to={'/admin/home'} className='text-base'>
          Home
        </Link>
      ),
      key: 'home',
      icon: <ContactsOutlined />
    },
    {
      label: (
        <Link to={'/admin/category'} className='text-base'>
          Category
        </Link>
      ),
      key: 'category',
      icon: <ContactsOutlined />
    },
    {
      label: (
        <Link to={'/admin/brand'} className='text-base'>
          Brand
        </Link>
      ),
      key: 'brand',
      icon: <ContactsOutlined />
    },
    {
      label: (
        <Link to={'/admin/product'} className='text-base'>
          Product
        </Link>
      ),
      key: 'product',
      icon: <ContactsOutlined />
    },
    {
      label: (
        <Link to={'/'} className='text-base'>
          Back home
        </Link>
      ),
      key: 'back-home',
      icon: <ContactsOutlined />
    }
  ]
  return (
    <div className='flex items-center justify-between px-3 py-4 rounded-md bg-neutral-100'>
      <div>
        <div className='hidden lg:flex'>Hello</div>
        <div className='flex lg:hidden'>
          <Dropdown menu={{ items: itemsMenu }} trigger={['click']}>
            <div className='flex items-center gap-2'>
              <span className='text-xl'>
                <GiHamburgerMenu />
              </span>
              <span className=''>Menu</span>
            </div>
          </Dropdown>
        </div>
      </div>
      <div className='cursor-pointer '>
        {isAuthenticated === false ? (
          <Link to={'/auth/login'} className='flex items-center gap-2'>
            <span className='text-xl'>
              <IoPersonOutline />
            </span>
            Sign in
          </Link>
        ) : (
          <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
            <div className='flex items-center gap-2'>
              <span className='transition-all ease-linear hover:text-blue-400 decoration-slice'>{user?.name}</span>
              <div className='w-10 h-10'>
                <img
                  src='https://images.unsplash.com/photo-1492551557933-34265f7af79e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFkbWlufGVufDB8fDB8fHww'
                  alt=''
                  className='object-cover w-full h-full rounded-full'
                />
              </div>
            </div>
          </Dropdown>
        )}
      </div>
    </div>
  )
}

export default LayoutHeaderAdmin
