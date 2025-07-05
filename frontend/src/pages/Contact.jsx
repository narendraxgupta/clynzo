import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500'>
            Clynzo Health Tech Pvt. Ltd. <br />
            4th Floor, Innov8 Co-Works, Saket District Centre <br />
            New Delhi – 110017, India
          </p>
          <p className='text-gray-500'>
            Tel: +91 123456789 <br />
            Email: support@clynzo.com
          </p>
          <p className='font-semibold text-lg text-gray-600'>CAREERS AT CLYNZO</p>
          <p className='text-gray-500'>
            We’re building the future of healthcare in India. Join us to make a real impact.
          </p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>
            Explore Jobs
          </button>
        </div>
      </div>

    </div>
  )
}

export default Contact
