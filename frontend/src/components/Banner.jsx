import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Banner = () => {
    const navigate = useNavigate()

    // Animation variants for text (fade + slide + scale)
    const textVariant = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { delay: i * 0.25, duration: 0.6, ease: "easeOut" }
        })
    }

    // Rotating phrases for the last line
    const phrases = [
        "Now available in 15+ Languages 🌐",
        "Available in Hindi, Tamil, Bengali...",
        "Book in your preferred language 🩺"
    ]

    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % phrases.length)
        }, 2500) // change every 2.5 sec
        return () => clearInterval(interval)
    }, [])

    return (
        <div
            className="flex rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 overflow-hidden shadow-xl"
            style={{
                background: `linear-gradient(135deg, #42839b 0%, #5ea3b9 100%)`
            }}
        >
            {/* ------- Left Side ------- */}
            <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    className="text-white"
                >
                    <motion.p
                        custom={0}
                        variants={textVariant}
                        className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold"
                    >
                        Book Appointment
                    </motion.p>

                    <motion.p
                        custom={1}
                        variants={textVariant}
                        className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-4xl font-medium"
                    >
                        With 100+ Trusted Doctors
                    </motion.p>

                    {/* Looping animated text */}
                    <div className="mt-6 text-base sm:text-lg font-light tracking-wide h-6">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={phrases[index]}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                            >
                                {phrases[index]}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

            {/* ------- Right Side ------- */}
            <div className="hidden md:flex md:w-1/2 lg:w-[370px] relative items-end justify-center">
                <motion.img
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="w-full max-w-md drop-shadow-2xl"
                    src={assets.appointment_img}
                    alt=""
                    style={{ objectFit: "contain", bottom: 0 }}
                />
            </div>
        </div>
    )
}

export default Banner
