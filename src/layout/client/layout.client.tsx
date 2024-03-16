import { Outlet } from 'react-router-dom'
import Footer from './footer.client'
import Header from './header.client'

const Layout = () => {
  return (
    <>
      <Header></Header>
      <div className='py-5'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Layout
