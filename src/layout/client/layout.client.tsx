import { Outlet } from 'react-router-dom'
import Footer from './footer.client'
import Header from './header.client'

const Layout = () => {
  return (
    <>
      <div className='lg:py-[28px] py-8'>
        <Header></Header>
        <div className='lg:py-5'>
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}

export default Layout
