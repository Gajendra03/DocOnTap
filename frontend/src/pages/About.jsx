import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Header */}
      <div className="text-center pt-16">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ABOUT <span className="text-primary">US</span>
        </motion.h1>
        <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
          Your trusted partner in managing your healthcare needs conveniently and efficiently.
        </p>
      </div>

      {/* About Content */}
      <div className="my-16 flex flex-col md:flex-row gap-12 px-6 md:px-16 items-center">
        
        {/* Image */}
        <motion.img
          src={assets.about_image}
          alt="About Docontap"
          className="w-full md:max-w-[420px] rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        />

        {/* Text */}
        <motion.div
          className="flex flex-col gap-6 md:w-3/5 text-gray-700 leading-relaxed"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p>
            Welcome to <span className="font-semibold text-primary">Docontap</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. We understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p>
            We are committed to excellence in healthcare technology — continuously enhancing our platform with the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Docontap supports you every step of the way.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Our Vision</h2>
          <p>
            Our vision is to create a seamless healthcare experience for every user — bridging the gap between patients and healthcare providers, making it easier to access the care you need, when you need it.
          </p>
        </motion.div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">WHY <span className="text-primary">CHOOSE US</span></h2>
      </div>

      <div className="flex flex-col md:flex-row gap-8 px-6 md:px-16 pb-20">
        {[
          {
            title: "EFFICIENCY",
            desc: "Streamlined appointment scheduling that fits into your busy lifestyle."
          },
          {
            title: "CONVENIENCE",
            desc: "Access to a network of trusted healthcare professionals in your area."
          },
          {
            title: "PERSONALIZATION",
            desc: "Tailored recommendations and reminders to help you stay on top of your health."
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            className="flex-1 bg-white border border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:bg-primary hover:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
            <p className="text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default About
