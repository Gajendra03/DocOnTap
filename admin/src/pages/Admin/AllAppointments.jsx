import React, { useEffect, useState, useContext } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPaymentHistory, setSelectedPaymentHistory] = useState([])

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  const handlePaymentDetails = (paymentHistory) => {
    console.log("Raw paymentHistory:", paymentHistory)

    if (Array.isArray(paymentHistory)) {
      setSelectedPaymentHistory(paymentHistory)
    } else if (paymentHistory && typeof paymentHistory === "object") {
      setSelectedPaymentHistory([paymentHistory])
    } else {
      setSelectedPaymentHistory([])
    }

    setShowPaymentModal(true)
  }

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        {/* Table Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr_0.5fr] py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Status</p>
          <p>Payment History</p>
        </div>

        {/* Table Rows */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr_0.5fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
          >
            <p className='max-sm:hidden'>{index + 1}</p>

            {/* Patient */}
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} className='w-8 h-8 rounded-full' alt="" />
              <p>{item.userData.name}</p>
            </div>

            {/* Age */}
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            {/* Doctor */}
            <div className='flex items-center gap-2'>
              <img src={item.docData.image} className='w-8 h-8 rounded-full bg-gray-200' alt="" />
              <p>{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p>{currency}{item.amount}</p>

            {/* Status */}
            {item.cancelled ? (
              <p className='text-red-400 text-xs font-medium'>Cancelled</p>
            ) : item.isCompleted ? (
              <p className='text-green-500 text-xs font-medium'>Completed</p>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className='w-10 cursor-pointer'
                src={assets.cancel_icon}
                alt=""
              />
            )}

            {/* Actions Menu */}
            <div className="relative">
              <button
                className="text-lg font-bold px-2 py-1 rounded hover:bg-gray-200"
                onClick={() => handlePaymentDetails(item.paymentHistory)}
              >
                ︙
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[500px] max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-3">Payment History</h2>

            {selectedPaymentHistory && selectedPaymentHistory.length > 0 ? (
              <div className="space-y-4">
                {selectedPaymentHistory.map((p, idx) => (
                  <div key={idx} className="border rounded-lg p-3 bg-gray-50">
                    <p className="text-sm"><span className="font-semibold">Appointment ID:</span> {p.appointmentId || "N/A"}</p>
                    <p className="text-sm"><span className="font-semibold">Payment ID:</span> {p.paymentId || "N/A"}</p>
                    <p className="text-sm"><span className="font-semibold">Payment Through:</span> {p.payment_through || "N/A"}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No payment history available.</p>
            )}

            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => setShowPaymentModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllAppointments
