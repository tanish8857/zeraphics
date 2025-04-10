import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('Vadodara')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!docImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData();
            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                    <h1 className="text-2xl font-bold">Add New Doctor</h1>
                    <p className="text-blue-100 opacity-90">Fill in the doctor's details to register them in the system</p>
                </div>

                <form onSubmit={onSubmitHandler} className="p-6">
                    <div className="flex flex-col lg:flex-row gap-8 mb-6">
                        {/* Left Column */}
                        <div className="w-full lg:w-1/2 space-y-5">
                            {/* Image Upload */}
                            <div className="flex items-center gap-5">
                                <label htmlFor="doc-img" className="cursor-pointer group relative">
                                    <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden border-2 border-gray-200 group-hover:border-blue-400 transition-all">
                                        {docImg ? (
                                            <img 
                                                src={URL.createObjectURL(docImg)} 
                                                alt="Doctor" 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <img src={assets.upload_area} alt="Upload" className="w-10 h-10 opacity-60" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-black bg-opacity-50 rounded-full p-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </label>
                                <div>
                                    <p className="font-medium text-gray-700">Doctor's Photo</p>
                                    <p className="text-sm text-gray-500">Click to upload profile picture</p>
                                </div>
                                <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden accept="image/*" />
                            </div>

                            {/* Personal Info */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        onChange={e => setName(e.target.value)}
                                        value={name}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                        type="text"
                                        placeholder="Dr. John Doe"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                        type="email"
                                        placeholder="doctor@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="w-full lg:w-1/2 space-y-5">
                            {/* Professional Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                                    <select
                                        onChange={e => setExperience(e.target.value)}
                                        value={experience}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                    >
                                        <option value="1 Year">1 Year</option>
                                        <option value="2 Year">2 Years</option>
                                        <option value="3 Year">3 Years</option>
                                        <option value="4 Year">4 Years</option>
                                        <option value="5 Year">5 Years</option>
                                        <option value="6 Year">6 Years</option>
                                        <option value="8 Year">8 Years</option>
                                        <option value="9 Year">9 Years</option>
                                        <option value="10 Year">10 Years</option>
                                        <option value="10 Year">10+ Years</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-gray-500">₹</span>
                                        <input
                                            onChange={e => setFees(e.target.value)}
                                            value={fees}
                                            className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                            type="number"
                                            placeholder="500"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <select
                                    onChange={e => setSpeciality(e.target.value)}
                                    value={speciality}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                >
                                    <option value="Vadodara">Vadodara</option>
                                    <option value="Ahmedabad">Ahmedabad</option>
                                    <option value="Surat">Surat</option>
                                    <option value="Nadiad">Nadiad</option>
                                    <option value="Anand">Anand</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                                <input
                                    onChange={e => setDegree(e.target.value)}
                                    value={degree}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                    type="text"
                                    placeholder="MBBS, MD, etc."
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    onChange={e => setAddress1(e.target.value)}
                                    value={address1}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                    type="text"
                                    placeholder="Clinic/Hospital name"
                                    required
                                />
                                <input
                                    onChange={e => setAddress2(e.target.value)}
                                    value={address2}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                    type="text"
                                    placeholder="Street, City, Pincode"
                                />
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">About Doctor</label>
                        <textarea
                            onChange={e => setAbout(e.target.value)}
                            value={about}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                            rows={4}
                            placeholder="Brief description about the doctor's expertise, achievements, etc."
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end border-t pt-6">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow hover:shadow-md transition-all hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Add Doctor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddDoctor