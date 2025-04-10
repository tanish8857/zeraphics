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

            setIsEdit(false)
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

    return profileData && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                    {/* Doctor Image Section */}
                    <div className="md:w-1/3 p-6 flex flex-col items-center">
                        <div className="relative">
                            <img 
                                className="w-48 h-48 rounded-full object-cover border-4 border-blue-100 shadow-lg" 
                                src={profileData.image} 
                                alt={profileData.name} 
                            />
                            {profileData.available ? (
                                <span className="absolute bottom-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    Available
                                </span>
                            ) : (
                                <span className="absolute bottom-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    Unavailable
                                </span>
                            )}
                        </div>
                        
                        <div className="mt-6 text-center">
                            <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
                            <p className="text-blue-600 font-medium">{profileData.speciality}</p>
                            <div className="flex items-center justify-center mt-2 space-x-2">
                                <span className="text-gray-600">{profileData.degree}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-600">{profileData.experience} years experience</span>
                            </div>
                        </div>
                        
                        <div className="mt-4 w-full">
                            <div className="bg-blue-50 rounded-lg p-4">
                                <p className="text-sm font-medium text-gray-600">Appointment Fee</p>
                                <p className="text-xl font-bold text-blue-700">
                                    {isEdit ? (
                                        <input 
                                            type="number" 
                                            className="w-full p-2 border border-blue-300 rounded"
                                            value={profileData.fees}
                                            onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                                        />
                                    ) : (
                                        `${currency} ${profileData.fees}`
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Doctor Details Section */}
                    <div className="md:w-2/3 p-6 border-l border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">Profile Information</h3>
                            {isEdit ? (
                                <div className="space-x-2">
                                    <button 
                                        onClick={() => setIsEdit(false)}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={updateProfile}
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => setIsEdit(true)}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>

                        {/* About Section */}
                        <div className="mb-6">
                            <h4 className="text-lg font-medium text-gray-800 mb-2">About</h4>
                            {isEdit ? (
                                <textarea 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    rows={5}
                                    value={profileData.about}
                                    onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                                />
                            ) : (
                                <p className="text-gray-600 whitespace-pre-line">{profileData.about}</p>
                            )}
                        </div>

                        {/* Address Section */}
                        <div className="mb-6">
                            <h4 className="text-lg font-medium text-gray-800 mb-2">Address</h4>
                            <div className="space-y-2">
                                {isEdit ? (
                                    <>
                                        <input 
                                            type="text" 
                                            className="w-full p-2 border border-gray-300 rounded"
                                            value={profileData.address.line1}
                                            onChange={(e) => setProfileData(prev => ({ 
                                                ...prev, 
                                                address: { ...prev.address, line1: e.target.value } 
                                            }))}
                                        />
                                        <input 
                                            type="text" 
                                            className="w-full p-2 border border-gray-300 rounded"
                                            value={profileData.address.line2}
                                            onChange={(e) => setProfileData(prev => ({ 
                                                ...prev, 
                                                address: { ...prev.address, line2: e.target.value } 
                                            }))}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p className="text-gray-600">{profileData.address.line1}</p>
                                        <p className="text-gray-600">{profileData.address.line2}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Availability Section */}
                        <div className="flex items-center">
                            <label className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input 
                                        type="checkbox" 
                                        className="sr-only" 
                                        checked={profileData.available}
                                        onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                                        disabled={!isEdit}
                                    />
                                    <div className={`block w-14 h-8 rounded-full ${profileData.available ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
                                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${profileData.available ? 'transform translate-x-6' : ''}`}></div>
                                </div>
                                <div className="ml-3 text-gray-700 font-medium">
                                    {profileData.available ? 'Currently Available' : 'Currently Unavailable'}
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile