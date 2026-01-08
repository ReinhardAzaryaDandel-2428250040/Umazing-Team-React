import React from "react";
import { motion } from "framer-motion";
import heroImg from "../assets/hero1.png";

console.log("DEBUG heroImg path ->", heroImg);

export default function Home() {
  // === AMBIL NAMA USER (SAMA SEPERTI NAVBAR) ===
  const userName = localStorage.getItem("user_name");

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden
      bg-gradient-to-br from-[#12001f] via-[#24002e] to-[#0b0014]"
    >
      {/* === AURA GLOW === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        className="absolute -top-40 -left-40 w-[520px] h-[520px]
        rounded-full blur-[120px] bg-pink-500"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        className="absolute bottom-0 right-0 w-[420px] h-[420px]
        rounded-full blur-[120px] bg-purple-600"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        className="absolute top-1/3 right-1/4 w-[380px] h-[380px]
        rounded-full blur-[140px] bg-yellow-400"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-6 py-24
        flex flex-col md:flex-row items-center gap-14 z-10"
      >
        {/* ===== TEXT CONTENT ===== */}
        <div className="flex-1 text-center md:text-left">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="px-4 py-1
            bg-gradient-to-r from-purple-600 to-pink-600
            rounded-full text-xs uppercase tracking-wider
            inline-block shadow-lg text-[#fff6ff]"
          >
            event baru - Kuda tercepat Tahun 2026
          </motion.span>

          <h1
            className="leading-tight text-5xl md:text-6xl
            font-extrabold mt-4 mb-4 drop-shadow-lg
            text-[#fde68a]"
          >
            Selamat Datang <span className="text-[#f5d0fe]">{userName || "User"}</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500"> Di Umazing Team</span>
          </h1>

          <p className="text-lg md:text-xl mb-6 text-[#e9d5ff] drop-shadow-md">“Bukan sekadar menebak — Umazing Team menganalisis Jenis Kuda dengan pendekatan cerdas.”</p>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <a href="#character">
              <motion.button
                whileHover={{ scale: 1.08 }}
                className="px-6 py-3 rounded-full
                bg-gradient-to-r from-pink-500 to-purple-600
                text-[#fff6ff] font-semibold shadow-xl"
              >
                Explore Characters
              </motion.button>
            </a>

            <a href="#predict">
              <motion.button
                whileHover={{ scale: 1.08 }}
                className="px-6 py-3 rounded-full
                border border-white/40
                text-[#f5d0fe] font-semibold
                backdrop-blur-md"
              >
                Try Prediction
              </motion.button>
            </a>
          </div>
        </div>

        {/* ===== HERO IMAGE ===== */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="w-64 h-96 md:w-80 md:h-[520px] relative group">
            <div
              className="absolute inset-0 rounded-3xl
              bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-xl shadow-2xl border border-white/20"
            />

            <motion.img src={heroImg} alt="Umazing Hero" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="relative mx-auto h-full object-cover rounded-3xl" />

            {/* === GLOW RING === */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.15, opacity: 0.25 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute inset-0 rounded-3xl
              border-2 border-pink-400/60"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
