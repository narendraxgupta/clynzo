import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const navigate = useNavigate()

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSolts = async () => {
    setDocSlots([])

    let today = new Date()
    let newSlots = []

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`
        const isSlotAvailable = !docInfo.slots_booked?.[slotDate]?.includes(formattedTime)

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      // If no slots available, insert placeholder so the day still appears
      if (timeSlots.length === 0) {
        timeSlots.push({
          datetime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + i),
          time: null
        })
      }

      newSlots.push(timeSlots)
    }

    setDocSlots(newSlots)
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book appointment')
      return navigate('/login')
    }

    const date = docSlots[slotIndex][0].datetime
    const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getDoctosData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (doctors.length > 0) fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) getAvailableSolts()
  }, [docInfo])

  return docInfo ? (
    <div className='px-4 max-w-7xl mx-auto'>

      {/* Doctor Info Section */}
      <div className='flex flex-col sm:flex-row gap-6 mt-6'>
        <img className='bg-blue-100 w-full sm:max-w-xs rounded-lg' src={docInfo.image} alt={docInfo.name} />

        <div className='flex-1 border border-gray-300 rounded-lg p-6 bg-white shadow-sm'>
          <div className='flex items-center gap-2 text-2xl font-semibold text-gray-700'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="Verified" />
          </div>

          <div className='flex items-center gap-2 mt-2 text-sm text-gray-500'>
            <p>{docInfo.degree} – {docInfo.speciality}</p>
            <span className='px-2 py-0.5 border rounded-full text-xs'>{docInfo.experience}</span>
          </div>

          <div className='mt-4'>
            <p className='flex items-center gap-2 text-sm font-medium text-[#262626]'>
              About <img className='w-3' src={assets.info_icon} alt="Info" />
            </p>
            <p className='text-sm text-gray-600 mt-1'>{docInfo.about}</p>
          </div>

          <p className='text-sm text-gray-600 font-medium mt-4'>
            Appointment fee: <span className='text-gray-800'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Section */}
      <div className='mt-10'>
        <p className='text-lg font-medium text-gray-700 mb-3'>Booking slots</p>

        {/* Days Scroll */}
        <div className='flex gap-3 overflow-x-auto no-scrollbar pb-2'>
          {docSlots.map((slots, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`min-w-[60px] text-center px-3 py-4 rounded-xl cursor-pointer transition-all ${slotIndex === index ? 'bg-blue-500 text-white' : 'border border-gray-300 text-gray-700'
                }`}
            >
              <p className='text-sm'>{slots[0] && daysOfWeek[slots[0].datetime.getDay()]}</p>
              <p className='font-medium text-base'>{slots[0]?.datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time Scroll */}
        <div className='flex gap-3 overflow-x-auto no-scrollbar mt-4 pb-2'>
          {docSlots[slotIndex]?.map((slot, i) =>
            slot.time ? (
              <button
                key={i}
                onClick={() => setSlotTime(slot.time)}
                className={`px-5 py-2 text-sm rounded-full whitespace-nowrap border ${slot.time === slotTime ? 'bg-blue-500 text-white border-blue-500' : 'text-gray-600 border-gray-300'
                  }`}
              >
                {slot.time.toLowerCase()}
              </button>
            ) : (
              <p key={i} className='text-sm text-gray-400 italic'>No slots</p>
            )
          )}
        </div>

        <button
          onClick={bookAppointment}
          className='mt-6 bg-blue-500 hover:bg-blue-600 text-white text-sm px-8 py-3 rounded-full transition-all'
        >
          Book an appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />

    </div>
  ) : null
}

export default Appointment
