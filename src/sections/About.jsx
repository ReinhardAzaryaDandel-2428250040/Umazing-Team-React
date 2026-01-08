import React from "react";

/* === IMPORT GAMBAR KUDA === */
import horse1 from "../assets/horses/horse1.png";
import horse2 from "../assets/horses/horse2.png";
import horse3 from "../assets/horses/horse3.png";
import horse4 from "../assets/horses/horse4.png";

/* === IMPORT GAMBAR ANGGOTA === */
import reinhard from "../assets/team/reinhard.png";
import member2 from "../assets/team/anggota2.png";
import member3 from "../assets/team/anggota3.png";
import member4 from "../assets/team/anggota4.png";
import member5 from "../assets/team/anggota5.png";

export default function About() {
  return (
    <section
      className="relative min-h-screen px-6 py-28 overflow-hidden
      bg-gradient-to-br from-[#14001f] via-[#2b0033] to-[#0f001a]"
    >
      {/* === GLOW BACKGROUND === */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-pink-500/30 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-40 w-[420px] h-[420px] bg-purple-600/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[140px]" />

      <div className="relative max-w-6xl mx-auto">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-500">Umazing Team</span>
          </h1>
          <p className="text-lg text-[#e9d5ff]">Sistem Prediksi jenis Kuda Berbasis Kecerdasan Buatan</p>
        </div>

        {/* ===== GALERI KUDA ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          {[horse1, horse2, horse3, horse4].map((img, i) => (
            <div
              key={i}
              className="rounded-3xl overflow-hidden
              bg-gradient-to-br from-white/10 to-white/5
              backdrop-blur-xl border border-white/20 shadow-2xl"
            >
              <img
                src={img}
                alt={`Horse ${i + 1}`}
                className="w-full h-[320px] object-cover
                hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* ===== TENTANG PROJECT ===== */}
        <div className="mb-24 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#f5d0fe]">Tentang Project</h2>
          <p className="text-lg leading-relaxed text-[#e9d5ff]">
            <b className="text-pink-400">Umazing Team</b> adalah project berbasis
            <b className="text-purple-400"> Artificial Intelligence</b> yang dirancang untuk memprediksi <b className="text-yellow-300">breed atau jenis kuda</b>
            melalui analisis citra visual.
            <br />
            <br />
            Sistem ini menggabungkan <b className="text-pink-300">Machine Learning</b>
            dan <b className="text-purple-300">Computer Vision</b> untuk mengekstraksi fitur visual, lalu menghasilkan prediksi performa yang lebih akurat dan terukur.
          </p>
        </div>

        {/* ===== VISI & MISI ===== */}
        <div className="grid md:grid-cols-2 gap-12 mb-28">
          <div
            className="p-8 rounded-3xl
            bg-gradient-to-br from-pink-500/20 to-purple-500/10
            backdrop-blur-xl border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-4 text-pink-300">Visi</h3>
            <p className="text-[#f1e8ff] leading-relaxed">Menjadi sistem prediksi berbasis AI yang inovatif, akurat, dan mampu berkembang ke berbagai bidang analisis visual modern.</p>
          </div>

          <div
            className="p-8 rounded-3xl
            bg-gradient-to-br from-purple-500/20 to-pink-500/10
            backdrop-blur-xl border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-4 text-purple-300">Misi</h3>
            <ul className="list-disc list-inside text-[#f1e8ff] space-y-2">
              <li>Mengembangkan model AI berbasis citra</li>
              <li>Mengintegrasikan teknologi modern</li>
              <li>Menyediakan sistem prediksi yang mudah digunakan</li>
            </ul>
          </div>
        </div>

        {/* ===== TIM ===== */}
        <div className="mb-28">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#f5d0fe]">Tim Pengembang</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 justify-items-center">
            <TeamCard img={reinhard} name="Reinhard Azarya Dandel" npm="2428250040" role="FUll Frontend React Developer" />
            <TeamCard img={member2} name=": M Zamzami Ashidiq" npm="2428250026" role="Perancang Database dan api Untuk React serta Flask" />
            <TeamCard img={member3} name=" Azzoriful Kayyas Alamsyah" npm="2428250043" role="Gitbook and  Kordinator" />
            <TeamCard img={member4} name="Stephen Euanggelion " npm="2428250028" role="Gitbook and Testing Meachine Learning " />
            <TeamCard img={member5} name="M. Harun Al Rasyid" npm="2428250068" role="Perancang , Train Dataset and deploy flask" />
          </div>
        </div>

        {/* ===== KONTAK ===== */}
        <div
          className="text-center p-10 rounded-3xl
          bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-fuchsia-500/30
          backdrop-blur-xl border border-white/20 shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-6 text-[#fde68a]">Hubungi Kami</h2>
          <p className="text-[#f1e8ff] mb-2">📧 Email: reinhardazaryadandel_2428250040@mhs.mdp.ac.id , muhammadzamzamiashidiq_2428250026@mhs.mdp.ac.id</p>
          <p className="text-[#f1e8ff] mb-2">📱 WhatsApp: 082192747272</p>
          <p className="text-[#f1e8ff]">📍 Jl. Rajawali No.14, 9 Ilir, Kec. Ilir Tim. II, Kota Palembang, Sumatera Selatan 30113</p>
        </div>
      </div>
    </section>
  );
}

/* ===== TEAM CARD ===== */
function TeamCard({ img, name, npm, role }) {
  return (
    <div className="text-center max-w-[220px]">
      <img
        src={img}
        alt={name}
        className="w-32 h-32 rounded-full mx-auto mb-4
        border-4 border-pink-400/40 object-cover"
      />
      <h3 className="font-semibold text-lg text-[#fde68a]">{name}</h3>
      <p className="text-sm text-[#e9d5ff]">NPM: {npm}</p>
      <p className="text-sm italic text-pink-300 mt-1">{role}</p>
    </div>
  );
}
