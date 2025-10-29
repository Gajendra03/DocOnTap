import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    // Format modifiedAt to DD MMM YYYY
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    }

    return profileData && (
        <div className="min-h-screen flex items-center justify-center w-screen p-4">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row gap-6 border-b pb-6">
                    <img
                        className="bg-[#42839b] w-full sm:w-48 h-48 object-cover rounded-lg shadow-md"
                        src={profileData.image}
                        alt=""
                    />
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-800">{profileData.name}</h1>
                        <p className="text-gray-600 mt-1">
                            {profileData.degree} - {profileData.speciality}
                        </p>
                        <span className="inline-block mt-2 px-3 py-1 text-sm bg-[#42839b] text-white rounded-full shadow">
                            {profileData.experience}
                        </span>
                    </div>
                </div>

                {/* About Section */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-800">About</h2>
                    {isEdit ? (
                        <textarea
                            onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                            className="w-full border rounded-md p-3 mt-2 outline-[#42839b]"
                            rows={6}
                            value={profileData.about}
                        />
                    ) : (
                        <p className="text-gray-600 mt-2">{profileData.about}</p>
                    )}
                </div>

                {/* Fees */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-800">Appointment Fee</h2>
                    {isEdit ? (
                        <input
                            type="number"
                            className="border rounded-md p-2 mt-2 outline-[#42839b]"
                            value={profileData.fees}
                            onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                        />
                    ) : (
                        <p className="text-gray-600 mt-2">{currency} {profileData.fees}</p>
                    )}
                </div>

                {/* Address */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-800">Address</h2>
                    {isEdit ? (
                        <div className="space-y-2 mt-2">
                            <input
                                type="text"
                                className="border rounded-md p-2 w-full outline-[#42839b]"
                                value={profileData.address.line1}
                                onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                placeholder="Address line 1"
                            />
                            <input
                                type="text"
                                className="border rounded-md p-2 w-full outline-[#42839b]"
                                value={profileData.address.line2}
                                onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                placeholder="Address line 2"
                            />
                        </div>
                    ) : (
                        <p className="text-gray-600 mt-2">
                            {profileData.address.line1}<br />{profileData.address.line2}
                        </p>
                    )}
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2 mt-6">
                    <input
                        type="checkbox"
                        onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                        checked={profileData.available}
                    />
                    <label className="text-gray-800">Available</label>
                </div>

                {/* Buttons */}
                <div className="mt-8">
                    {isEdit ? (
                        <button
                            onClick={updateProfile}
                            className="px-6 py-2 bg-[#42839b] text-white rounded-full shadow hover:bg-[#33677a] transition-all"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEdit(true)}
                            className="px-6 py-2 bg-[#42839b] text-white rounded-full shadow hover:bg-[#33677a] transition-all"
                        >
                            Edit
                        </button>
                    )}
                </div>

                {/* Last Modified */}
                {profileData.modifiedAt && (
                    <p className="text-xs text-gray-500 mt-6 text-right">
                        Last Modified: {formatDate(profileData.modifiedAt)}
                    </p>
                )}
            </div>
        </div>
    )
}

export default DoctorProfile;