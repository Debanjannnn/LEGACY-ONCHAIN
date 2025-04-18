"use client"

import { motion } from "framer-motion"


import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";
import { SparklesText } from "./magicui/sparkles-text";

const steps = [
  {
    title: "Create Your Will",
    description:
      "Set up your digital will on Open Campus blockchain, specifying beneficiaries and asset distribution.",
  },
  {
    title: "Define Conditions",
    description:
      "Establish time-based or event-triggered conditions for asset release using smart contracts.",
  },
  {
    title: "Secure with PHAROS",
    description:
      "Your will is securely stored and executed on the fast and eco-friendly Open Campus blockchain.",
  },
  {
    title: "Easy Management",
    description:
      "Update your will anytime with our user-friendly interface, reflecting life changes instantly.",
  },
];

export default function WillInfo() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-3">
        <div className="grid md:grid-cols-2 gap-72 ">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text  bg-gradient-to-r from-white via-gray-200 to-gray-400">
              Creating Your <br /> Will  on <br /><SparklesText text="PHAROS Chain " className="text-gray-300" /> 
            </h2>
            <p className="text-gray-400 mb-8">
              Secure your legacy with ease using our PHAROS-powered digital will platform.
              Secure your legacy with ease using our PHAROS-powered digital will platform.
              Our smart contract technology ensures your wishes are executed exactly as you
              intend, with the speed and efficiency of PHAROS Chain.
            </p>
          </motion.div>

          {/* Right Column - Terminal */}
          <div className="w-full">
            <Terminal className="w-full text-left scroll-my-0 font-robotoMono">
              <div className="space-y-2 overflow-hidden">
                <TypingAnimation className="block">&gt; Create Your Will</TypingAnimation>

                <AnimatedSpan delay={1500} className="block text-green-500">
                  <span>
                    ✔ Set up your digital will on PHAROS Chain, specifying beneficiaries and asset distribution.
                  </span>
                </AnimatedSpan>

                <AnimatedSpan delay={2000} className="block text-green-500">
                  <span>✔ Define Conditions</span>
                </AnimatedSpan>

                <AnimatedSpan delay={2500} className="block text-green-500">
                  <span>
                    ✔ Establish time-based or event-triggered conditions for asset release using smart contracts.
                  </span>
                </AnimatedSpan>

                <AnimatedSpan delay={3000} className="block text-green-500">
                  <span>✔ Secure with Blockchain</span>
                </AnimatedSpan>

                <AnimatedSpan delay={3500} className="block text-green-500">
                  <span>
                    ✔ Your will is securely stored and executed on the fast and eco-friendly PHAROS Chain.
                  </span>
                </AnimatedSpan>

                <AnimatedSpan delay={4000} className="block text-green-500">
                  <span>✔ Easy Management.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={4500} className="block text-green-500">
                  <span>
                    ✔ Update your will anytime with our user-friendly interface, reflecting life changes instantly.
                  </span>
                </AnimatedSpan>

                <TypingAnimation delay={6500} className="block text-muted-foreground">
                  Digital will setup completed successfully.
                </TypingAnimation>

                <TypingAnimation delay={7000} className="block text-muted-foreground">
                  Check your will
                </TypingAnimation>
              </div>
            </Terminal>
          </div>
        </div>
      </div>
    </section>
  );
}

