import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify'

const DoctorAppointments = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  const handleJoinMeeting = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/provide-link-to-btn", { appointmentId })
      if (data.success) {
        toast.success("Zoom link created successfully")
        const newTab = window.open("", "_blank");
        newTab.location.href = data.zoomLink;

      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // const handleAddPrescription = async (appointmentId) => {
  //   // For now, navigate to a placeholder page
  //   const { data } = await axios.post(backendUrl + '/api/doctor/add-prescription', { appointmentId }, { headers: { dToken } });
  //   window.open(`/add-prescription`, '_blank')
  // }

  return (
    <div className='w-full max-w-6xl m-5 '>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        {/* Table Header */}
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Join</p>
          <p>Prescription</p>
          <p>Action</p>
        </div>

        {/* Table Rows */}
        {appointments.map((item, index) => (
          <div
            className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
            key={index}
          >
            {/* Index */}
            <p className='max-sm:hidden'>{index + 1}</p>

            {/* Patient */}
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} className='w-8 h-8 rounded-full' alt="" />
              <p>{item.userData.name}</p>
            </div>

            {/* Payment */}
            <div>
              <p
                className={`text-xs inline border px-2 rounded-full ${item.payment ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'
                  }`}
              >
                {item.payment ? '✔' : '✖'}
              </p>
            </div>

            {/* Age */}
            <p className='max-sm:hidden'>{item.userData.age}</p>

            {/* Date & Time */}
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            {/* Join Section */}
            {item.cancelled ? (
              <p className='text-red-500 text-xs font-medium'>Cancelled</p>
            ) : item.isCompleted ? (
              <p className='text-green-500 text-xs font-medium'>Completed</p>
            ) : item.payment ? (
              <button
                onClick={() => handleJoinMeeting(item._id)}
                className='bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 transition'
              >
                Join Meeting
              </button>
            ) : (
              <p className='text-red-500 text-xs font-medium'>Not Paid</p>
            )}

            {/* Prescription Section */}
            {item.cancelled ? (
              <p className="text-red-500 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : item.payment ? (
              <div className="bg-green-500 rounded hover:bg-green-600 transition flex items-center justify-center px-3 py-1">
                <NavLink
                  to={`/add-prescription/${item._id}`}
                  className="text-white text-xs font-medium"
                >
                  Add
                </NavLink>
              </div>
            ) : (
              <p className="text-red-500 text-xs font-medium">Not Paid</p>
            )}



            {/* Action */}
            {item.cancelled
              ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              : item.isCompleted
                ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                : <div className='flex'>
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className='w-10 cursor-pointer'
                    src={assets.cancel_icon}
                    alt="Cancel"
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className='w-10 cursor-pointer'
                    src={assets.tick_icon}
                    alt="Complete"
                  />
                </div>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorAppointments
