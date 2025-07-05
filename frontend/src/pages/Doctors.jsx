import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='px-4'>
      <p className='text-gray-600 text-lg mt-6'>Browse through the doctors specialist.</p>

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-6'>
        {/* Filter Button for Mobile */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-1 px-3 border rounded text-sm sm:hidden transition-all ${showFilter ? 'bg-blue-500 text-white' : ''}`}
        >
          Filters
        </button>

        {/* Filter Options */}
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec, idx) => (
            <p
              key={idx}
              onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === spec ? 'bg-[#E2E5FF] text-black' : ''}`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
              className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500'
            >
              <img className='bg-[#EAEFFF] w-full h-40 object-cover' src={item.image} alt={item.name} />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                  <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                  <p>{item.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className='text-[#262626] text-lg font-medium mt-1'>{item.name}</p>
                <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
