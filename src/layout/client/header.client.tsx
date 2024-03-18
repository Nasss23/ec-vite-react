/* eslint-disable react-hooks/exhaustive-deps */
import { CiSearch } from 'react-icons/ci'
import { ContactsOutlined, LogoutOutlined } from '@ant-design/icons'
import { FaFacebookF, FaRegHeart, FaTelegramPlane } from 'react-icons/fa'
import { PiInstagramLogoFill } from 'react-icons/pi'
import { IconCategory } from '../../assets/icons'
import { IoIosArrowDown } from 'react-icons/io'
import { IoPersonOutline } from 'react-icons/io5'
import { BsCart2 } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { useEffect, useState } from 'react'
import { Avatar, Dropdown, Spin } from 'antd'
import { callLogout } from '../../config/api'
import { fetchListCart } from '@/redux/slice/cart.slice'
import { Cart } from '@/components/cart'
import { setLogoutAction } from '@/redux/auth/account.slice'
import { fetchListProductParams } from '@/redux/slice/product.slice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.account.isAuthenticated)
  const user = useAppSelector((state) => state.account.user)
  const cart = useAppSelector((state) => state.cart.listCart)

  const product = useAppSelector((state) => state.product.listProductParams)

  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    dispatch(fetchListCart())
  }, [])

  useEffect(() => {
    if (search.trim() !== '') {
      dispatch(fetchListProductParams({ name: search }))
    }
  }, [search, dispatch])

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
    // {
    //   label: <Link to={'/admin/home'}>Trang Quản Trị</Link>,
    //   key: 'admin',
    //   icon: <DashOutlined />
    // },
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

  return (
    <header className='lg:space-y-5'>
      <div className='flex items-center justify-between content'>
        <div className='flex flex-col flex-1 gap-5 lg:hidden'>
          <div className='flex items-center justify-between flex-1 '>
            <div>
              {isAuthenticated === false ? (
                <Link to={'/auth/login'} className='flex items-center gap-2'>
                  <span className='text-xl'>
                    <IoPersonOutline />
                  </span>
                </Link>
              ) : (
                <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                  <Avatar size={35}>{user.name}</Avatar>
                </Dropdown>
              )}
            </div>

            <Link to={'/'} className='flex items-center gap-[6px]'>
              <div className='w-10 lg:w-full lg:h-full'>
                <img srcSet='Logo.png 2x' alt='Logo' />
              </div>
              <h1 className='lg:text-[32px] font-bold leading-[20px] text-[22px]'>Luminae</h1>
            </Link>
            <div className='lg:hidden '>
              {cart ? (
                <Cart></Cart>
              ) : (
                <Link to={'/auth/login'} className='flex items-center gap-2 '>
                  <div className='flex items-center gap-2'>
                    <span className='text-xl'>
                      <BsCart2 />
                    </span>
                  </div>
                  <div className='flex items-center justify-center text-white rounded-full w-7 h-7 bg-secondary-400'>
                    0
                  </div>
                </Link>
              )}
            </div>
          </div>
          <div className='relative flex items-center justify-between flex-1 gap-3 px-3 py-3 border rounded border-neutral-200d'>
            <input
              type='text'
              value={search}
              className='w-[277px]'
              placeholder='Search product'
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className='text-xl'>
              <CiSearch />
            </button>
            {search && product.data ? (
              <div className='absolute left-0 w-full p-4 space-y-2 bg-white border rounded top-14 border-neutral-300'>
                {product.data.length > 0 ? (
                  <>
                    {product.data.slice(0, 3).map((item) => (
                      <Link to={`/product/${item._id}`} key={item._id} className='flex gap-5 py-2 '>
                        <div className='w-10 h-10'>
                          <img src={item.image} alt='' className='object-cover w-full h-full' />
                        </div>
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </>
                ) : (
                  <div className='flex justify-center'>
                    <Spin />
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <Link to={'/'} className='lg:flex items-center gap-[6px] hidden'>
          <img srcSet='Logo.png 2x' alt='Logo' />
          <h1 className='text-[32px] font-bold leading-[20px]'>Luminae</h1>
        </Link>
        <div className='relative items-center hidden gap-3 px-3 py-3 border rounded lg:flex border-neutral-200d'>
          <input
            type='text'
            value={search}
            className='w-[277px]'
            placeholder='Search product'
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className='text-xl'>
            <CiSearch />
          </button>
          {search && product.data ? (
            <div className='absolute left-0 w-full p-4 space-y-2 bg-white border rounded top-14 border-neutral-300'>
              {product.data.length > 0 ? (
                <>
                  {product.data.slice(0, 3).map((item) => (
                    <Link to={`/product/${item._id}`} key={item._id} className='flex gap-5 py-2 '>
                      <div className='w-10 h-10'>
                        <img src={item.image} alt='' className='object-cover w-full h-full' />
                      </div>
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </>
              ) : (
                <div className='flex justify-center'>
                  <Spin />
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className='items-center hidden gap-3 text-sm font-normal leading-5 text-center lg:flex'>
          <span className='w-[96px]'>About us</span>
          <span className='w-[96px]'>Blog</span>
          <span className='w-[96px]'>Contact us</span>
          <span className='w-[96px]'>Help & support</span>
        </div>
        <div className='lg:flex hidden items-center gap-3 text-[22px] text-base-300'>
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
      <div className='hidden py-5 bg-black lg:block'>
        <div className='flex items-center justify-between content'>
          <div className='flex items-center gap-[80px]'>
            <Link to={'/category'} className='flex items-center gap-1'>
              <IconCategory></IconCategory>
              <span className='text-xl font-bold leading-5 text-white'>Danh mục</span>
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
          <div className='flex items-center gap-10 text-xs leading-5 text-white cursor-pointer'>
            <div className='flex items-center gap-2'>
              <span className='text-xl'>
                <FaRegHeart />
              </span>
              Favorites
            </div>
            {cart ? (
              <Cart></Cart>
            ) : (
              <Link to={'/auth/login'} className='flex items-center gap-2 '>
                <div className='flex items-center gap-2'>
                  <span className='text-xl'>
                    <BsCart2 />
                  </span>
                  Cart
                </div>
                <div className='flex items-center justify-center rounded-full w-7 h-7 bg-secondary-400'>0</div>
              </Link>
            )}
            <div className='transition-all transform cursor-pointer hover:text-secondary-300 decoration-slice'>
              {isAuthenticated === false ? (
                <Link to={'/auth/login'} className='flex items-center gap-2'>
                  <span className='text-xl'>
                    <IoPersonOutline />
                  </span>
                  Sign in
                </Link>
              ) : (
                <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                  <div className='flex items-center gap-1'>
                    <span>Welcome</span>
                    <span className='text-sm font-semibold'>{user?.name}</span>
                  </div>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
