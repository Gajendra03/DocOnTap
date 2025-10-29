import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    // Function to update user profile data using API
    const updateUserProfileData = async () => {
        try {
            const formData = new FormData()
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            formData.append('age', userData.age)
            image && formData.append('image', image)

            const { data } = await axios.post(
                backendUrl + '/api/user/update-profile',
                formData,
                { headers: { token } }
            )

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Format date to DD Mon YYYY
    const formatDate = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    }

    return userData ? (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-200 mt-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
                {isEdit ? (
                    <label htmlFor="image" className="relative cursor-pointer group">
                        <img
                            className="w-36 h-36 rounded-full object-cover border-4 border-primary shadow-md opacity-80 group-hover:opacity-100 transition"
                            src={image ? URL.createObjectURL(image) : userData.image}
                            alt="Profile"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition">
                            <img className="w-10" src={assets.upload_icon} alt="Upload" />
                        </div>
                        <input
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            id="image"
                            hidden
                        />
                    </label>
                ) : (
                    <img
                        className="w-36 h-36 rounded-full object-cover border-4 border-primary shadow-md"
                        src={userData.image}
                        alt="Profile"
                    />
                )}

                {isEdit ? (
                    <input
                        className="bg-gray-100 text-2xl font-semibold max-w-xs text-center mt-4 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary"
                        type="text"
                        onChange={(e) =>
                            setUserData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        value={userData.name}
                    />
                ) : (
                    <h2 className="font-bold text-2xl text-gray-800 mt-4">{userData.name}</h2>
                )}
            </div>

            <hr className="my-6 border-gray-300" />

            {/* Contact Information */}
            <section>
                <h3 className="text-primary font-semibold mb-3 text-lg">📞 Contact Information</h3>
                <div className="grid grid-cols-[120px_1fr] gap-y-3 text-gray-700">
                    <p className="font-medium">Email:</p>
                    <p className="text-blue-500">{userData.email}</p>

                    <p className="font-medium">Phone:</p>
                    {isEdit ? (
                        <input
                            className="bg-gray-100 rounded-md p-1 border border-gray-300 focus:ring-2 focus:ring-primary"
                            type="text"
                            onChange={(e) =>
                                setUserData((prev) => ({ ...prev, phone: e.target.value }))
                            }
                            value={userData.phone}
                        />
                    ) : (
                        <p className="text-blue-500">{userData.phone}</p>
                    )}

                    <p className="font-medium">Address:</p>
                    {isEdit ? (
                        <div className="flex flex-col gap-1">
                            <input
                                className="bg-gray-100 rounded-md p-1 border border-gray-300"
                                type="text"
                                onChange={(e) =>
                                    setUserData((prev) => ({
                                        ...prev,
                                        address: { ...prev.address, line1: e.target.value },
                                    }))
                                }
                                value={userData.address.line1}
                            />
                            <input
                                className="bg-gray-100 rounded-md p-1 border border-gray-300"
                                type="text"
                                onChange={(e) =>
                                    setUserData((prev) => ({
                                        ...prev,
                                        address: { ...prev.address, line2: e.target.value },
                                    }))
                                }
                                value={userData.address.line2}
                            />
                        </div>
                    ) : (
                        <p>
                            {userData.address.line1} <br /> {userData.address.line2}
                        </p>
                    )}
                </div>
            </section>

            <hr className="my-6 border-gray-300" />

            {/* Basic Information */}
            <section>
                <h3 className="text-primary font-semibold mb-3 text-lg">📝 Basic Information</h3>
                <div className="grid grid-cols-[120px_1fr] gap-y-3 text-gray-700">
                    <p className="font-medium">Gender:</p>
                    {isEdit ? (
                        <select
                            className="bg-gray-100 rounded-md border border-gray-300"
                            onChange={(e) =>
                                setUserData((prev) => ({ ...prev, gender: e.target.value }))
                            }
                            value={userData.gender}
                        >
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    ) : (
                        <p>{userData.gender}</p>
                    )}

                    <p className="font-medium">Birthday:</p>
                    {isEdit ? (
                        <input
                            className="bg-gray-100 rounded-md border border-gray-300"
                            type="date"
                            onChange={(e) =>
                                setUserData((prev) => ({ ...prev, dob: e.target.value }))
                            }
                            value={userData.dob}
                        />
                    ) : (
                        <p>{userData.dob}</p>
                    )}

                    <p className="font-medium">Age:</p>
                    {isEdit ? (
                        <input
                            className="bg-gray-100 rounded-md border border-gray-300"
                            type="number"
                            onChange={(e) =>
                                setUserData((prev) => ({ ...prev, age: e.target.value }))
                            }
                            value={userData.age || ''}
                            min="0"
                        />
                    ) : (
                        <p>{userData.age || 'Not Provided'}</p>
                    )}
                </div>
            </section>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-center">
                {isEdit ? (
                    <button
                        onClick={updateUserProfileData}
                        className="bg-primary text-white px-6 py-2 rounded-full shadow hover:bg-primary-dark transition"
                    >
                        Save Information
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEdit(true)}
                        className="border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            {/* Last Modified */}
            {userData.modifiedAt && (
                <p className="text-xs text-gray-500 mt-6 text-right italic">
                    Last Modified: {formatDate(userData.modifiedAt)}
                </p>
            )}
        </div>
    ) : null
}

export default MyProfile
