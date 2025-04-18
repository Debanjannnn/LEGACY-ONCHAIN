"use client"

import { ArrowRightIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, ChevronRight } from "lucide-react"
import { InfoCircledIcon } from "@radix-ui/react-icons"; // Import the info icon
import Link from "next/link"
import { AnimatedGradientText } from "./magicui/animated-gradient-text"
import { SparklesText } from "@/components/magicui/sparkles-text";
export default function Hero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden from-black to-black flex flex-col items-center justify-center text-center px-4 py-28">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl mx-auto space-y-8"
      >
        <div className="flex justify-center">
          <motion.div
            className={cn(
              "group rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white transition-all ease-in hover:cursor-pointer hover:bg-white/10"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-6 py-2 transition ease-out ">
              <span className="font-poppins">✨ Secure legacy planning</span>
              <ArrowRightIcon className="ml-2 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </motion.div>
        </div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="bg-clip-text font-poppins ">
            Secure Your Legacy
            <br />
            On EDU Chain
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Create smart wills, set milestone-based distributions, and ensure your legacy lives on through EDU Chain. Fast, secure, and eco-friendly.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >

          <button className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
            <Link href={"/create-will"}>  Start Your Will</Link>
          </button>

          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              <Link href={"/claimables"}>   Check My Claimables</Link>
            </span>
          </button>

        </motion.div>

        {/* Testnet notice */}
        <motion.div
          className="mt-8 flex items-center justify-center text-sm  rounded-md px-4 py-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >



          <AnimatedGradientText className="rounded-3xl">
            {/* <InfoCircledIcon className="mr-2 h-4 w-4" />{" "} */}
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              )}
            >
              We&apos;re live on the testnet! Some features are still being refined—your feedback is welcome. <br />
              Join us in testing and grab some free <Link href="https://www.hackquest.io/faucets/656476">EDU Tokens</Link> to get started.
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>

        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full filter blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse"
        animate={{
          x: [0, 5, 0],
          y: [0, -5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary rounded-full animate-pulse"
        animate={{
          x: [0, -8, 0],
          y: [0, 8, 0]
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-accent rounded-full animate-pulse"
        animate={{
          x: [0, 10, 0],
          y: [0, 5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
    </div>
  )
}