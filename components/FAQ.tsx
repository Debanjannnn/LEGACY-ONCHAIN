"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedShinyText } from "./magicui/animated-shiny-text";

const faqs = [
  {
    question: "How does EDU Chain ensure my will's security?",
    answer:
      "EDU Chain provides immutable, transparent records of your will. Its high-speed performance and EVM compatibility ensure your wishes are securely stored and executed exactly as intended, with minimal risk of tampering or fraud.",
  },
  {
    question: "What are the advantages of creating a will on EDU?",
    answer:
      "EDU offers fast transaction speeds, low costs, and eco-friendly operations. This means your will can be created, updated, and executed quickly and efficiently, with minimal environmental impact and transaction fees.",
  },
  {
    question: "Can I update my will after it's been created on EDU?",
    answer:
      "Yes, our platform allows you to update your will at any time. Changes are recorded on the EDU Chain, ensuring a clear audit trail while maintaining the flexibility to adapt to life changes.",
  },
  {
    question: "How does asset distribution work with a EDU-based will?",
    answer:
      "Assets are distributed according to the conditions set in your will's smart contract. This can include time-based releases, specific event triggers, or instant distribution upon verification of certain conditions.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative  text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display mb-4 text-white">
            Frequently Asked Questions
            <br />
            About EDU Wills
          </h2>
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="pb-4">
              <motion.button
                onClick={() => toggleFAQ(index)}
                className="w-full flex py-4 px-6 text-lg font-normal bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-lg transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatedShinyText>
                  <span className="truncate">{faq.question}</span>
                </AnimatedShinyText>
              </motion.button>

              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: openIndex === index ? 1 : 0,
                  height: openIndex === index ? "auto" : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-gray-300 px-6 mt-2 overflow-hidden"
              >
                {faq.answer}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}