"use client";

import { useEffect, useState } from "react";
import {useParams, useSearchParams} from "next/navigation"; // Import useParams from next/navigation
import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";
import Confettis from "../../components/confetti";

export default function BirthdayGreeting() {
    const params = useParams();
    const searchParams = useSearchParams();

    const name = params?.name ? decodeURIComponent(params.name as string) : "Guest";
    const imageUrl = searchParams.get("image");
    const [isConfettiActive, setIsConfettiActive] = useState(false);

    useEffect(() => {
        setIsConfettiActive(true);

        const timer = setTimeout(() => setIsConfettiActive(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {isConfettiActive && <Confettis />}

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-md w-full text-center z-10"
            >
                <motion.div
                    initial={{ rotate: -5 }}
                    animate={{ rotate: 5 }}
                    transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    className="inline-block mb-4"
                >
                    <PartyPopper className="h-16 w-16 text-yellow-500 mx-auto" />
                </motion.div>

                <motion.h2
                    className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Happy Birthday!
                </motion.h2>

                <motion.img
                    src={imageUrl!}
                    alt="Uploaded"
                    className="w-64 h-64 object-cover rounded-full mx-auto border-4 border-pink-500 shadow-lg mb-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                />

                <motion.div
                    className="text-2xl font-medium mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <span className="block text-gray-800">Wishing</span>
                    <span className="text-3xl font-bold text-pink-600 block my-2">{name}</span>
                    <span className="block text-gray-800">an amazing day filled with joy!</span>
                </motion.div>
            </motion.div>
        </div>
    );
}
