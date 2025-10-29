import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Header Section */}
      <div className="text-center pt-16">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          CONTACT <span className="text-primary">US</span>
        </motion.h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto text-lg">
          We’d love to hear from you. Let’s connect and create something amazing together.
        </p>
      </div>

      {/* Content Section */}
      <div className="my-16 flex flex-col md:flex-row justify-center items-center gap-12 px-6">
        
        {/* Image */}
        <motion.img
          src={assets.contact_image}
          alt="Contact"
          className="w-full md:max-w-[420px] rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        />

        {/* Info Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10 w-full max-w-lg border border-gray-100"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Our Office</h2>
              <p className="text-gray-600 mt-1">
                Jagamara, Khandagiri, Bhubaneswar <br /> Odisha, India
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">Contact Info</h2>
              <p className="text-gray-600 mt-1">
                Tel: +91-0674-456-7890 <br /> 
                Email: <a href="mailto:docontap.dev@gmail.com" className="text-primary hover:underline">docontap.dev@gmail.com</a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">Careers at Docontap</h2>
              <p className="text-gray-600 mt-1">
                Learn more about our teams and job openings.
              </p>
              <button className="mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-black transition duration-300 shadow-md">
                Explore Jobs
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
