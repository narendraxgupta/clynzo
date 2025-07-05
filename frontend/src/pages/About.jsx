import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to Clynzo — your modern solution for seamless doctor appointment scheduling and healthcare management. At Clynzo, we simplify the way you connect with healthcare providers, offering a smart and accessible platform tailored to your needs.</p>
          <p>We’re passionate about empowering patients and clinics with technology that works. From booking appointments to managing your health interactions, Clynzo ensures a smooth, efficient, and personalized experience every step of the way.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision at Clynzo is to revolutionize digital healthcare access. We aim to bridge the gap between people and providers, making healthcare faster, simpler, and more human for everyone involved.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY  <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY</b>
          <p>Book appointments instantly and manage everything from one simple dashboard.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE</b>
          <p>Access a trusted network of doctors and clinics at your fingertips — anytime, anywhere.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION</b>
          <p>Get tailored notifications, reminders, and suggestions to stay ahead of your health goals.</p>
        </div>
      </div>

    </div>
  )
}

export default About
