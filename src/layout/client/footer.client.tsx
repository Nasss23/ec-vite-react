import { PiTelegramLogoDuotone } from 'react-icons/pi'
import { FiFacebook } from 'react-icons/fi'
import { FaInstagram } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'

const Footer = () => {
  return (
    <footer className=''>
      <div className='bg-[#D1E2EB] lg:py-[60px] py-5'>
        <div className='content'>
          <div className='grid grid-cols-12 gap-8 lg:gap-0'>
            <div className='space-y-4 lg:space-y-[25px] text-sm leading-5 text-base-600 lg:col-span-3 col-span-6'>
              <span className='font-bold'>Company</span>
              <ul className='space-y-[15px]'>
                <li>About Us</li>
                <li>Our Store</li>
                <li>Contact us</li>
              </ul>
            </div>
            <div className='space-y-4 lg:space-y-[25px] text-sm leading-5 text-base-600 lg:col-span-3 col-span-6'>
              <span className='font-bold'>Career Opportunities</span>
              <ul className='space-y-[15px]'>
                <li>Selling Programs</li>
                <li>Advertise</li>
                <li>Cooperation </li>
              </ul>
            </div>
            <div className='space-y-4 lg:space-y-[25px] text-sm leading-5 text-base-600 lg:col-span-3 col-span-6'>
              <span className='font-bold'>How to Buy</span>
              <ul className='space-y-[15px]'>
                <li>Making Payments</li>
                <li>Delivery Options</li>
                <li>Buyer Protection</li>
                <li>New User Guide</li>
              </ul>
            </div>
            <div className='space-y-4 lg:space-y-[25px] text-sm leading-5 text-base-600 lg:col-span-3 col-span-6'>
              <span className='font-bold'>Help</span>
              <ul className='space-y-[15px]'>
                <li>Contacts Us</li>
                <li>FAQ</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <></>
        </div>
      </div>
      <div className='py-6 content'>
        <div className='flex items-center justify-between '>
          <div className='flex items-center gap-5'>
            <img srcSet='visa.png 2x' alt='' />
            <img srcSet='master.png 2x' alt='' />
            <img srcSet='paypal.png 2x' alt='' />
          </div>
          <span className='flex items-center gap-1 text-xs leading-5'>
            English <IoIosArrowDown />
          </span>
        </div>
        <div className='my-2 border lg:my-3 border-neutral-200'></div>
        <div className='flex flex-col gap-4 lg:py-3 lg:items-center lg:justify-between'>
          <p className='text-sm leading-5 text-[#262626]'>165-179 Forster Road City of Monash, Melbourne, Australia</p>
          <p className='text-sm leading-5 text-[#9D9D9D]'>©2023 Copyright in reserved for lumine shop</p>
          <div className='flex items-center gap-3 text-[22px] text-base-400'>
            <span>
              <FaInstagram />
            </span>
            <span>
              <FiFacebook />
            </span>
            <span>
              <PiTelegramLogoDuotone />
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
