import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <img className='mb-5 w-75' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Clynzo is your smart solution for hassle-free doctor appointments. Trusted by thousands, Clynzo helps you find the right healthcare professional, book appointments instantly, and manage your medical visits—all in one place.

            Say goodbye to waiting lines and hello to seamless healthcare access—anytime, anywhere.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91 123456789</li>
            <li>support@clynzo.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>© {new Date().getFullYear()} @ The Boring Company - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
