import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'

const Header = () => {
  const headingText = "Book Appointment With Trusted Doctors"
  const words = headingText.split(" ")
  const [loopKey, setLoopKey] = useState(0) // for restarting animation

  // Restart animation loop every few seconds
  useEffect(() => {
    const totalTime = words.length * 500 + 1000 // ms for all words + pause
    const interval = setInterval(() => {
      setLoopKey(prev => prev + 1) // changes key → animation restarts
    }, totalTime)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
      
      {/* --------- Header Left --------- */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>

        {/* Word-by-word from left to right */}
        <motion.p
          key={loopKey} // resets on each loop
          className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight flex flex-wrap'
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: i * 0.5,
                duration: 0.5
              }}
              className="mr-2"
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
          <img className='w-28' src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors, 
            <br className='hidden sm:block' /> 
            schedule your appointment hassle-free.
          </p>
        </div>

        <a href='#speciality' className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
          Book appointment <img className='w-3' src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* --------- Header Right --------- */}
      <div className='md:w-1/2 relative'>
        <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
      </div>
    </div>
  )
}

export default Header
