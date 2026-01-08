import React from "react";
import { motion } from "framer-motion";

export default function Predict() {
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [progress, setProgress] = React.useState(0);

  const API_URL = "https://zam09ash-api-model-kuda.hf.space/predict";
  const CONFIDENCE_THRESHOLD = 0.79;

  React.useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;

    // ✅ POPUP KONFIRMASI
    const isHorse = window.confirm("Apakah foto yang kamu input foto kuda?");

    if (!isHorse) {
      setResult({
        error: "Harap Masukan Foto Kuda",
      });
      return;
    }

    setLoading(true);
    setResult(null);
    setProgress(10);

    try {
      const timer = setInterval(() => setProgress((p) => Math.min(95, p + Math.random() * 10)), 300);

      const fd = new FormData();
      fd.append("image", file);

      const res = await fetch(API_URL, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        throw new Error("API gagal memproses gambar");
      }

      const data = await res.json();

      clearInterval(timer);
      setProgress(100);

      // ✅ LOGIKA CONFIDENCE
      if (data.confidence >= CONFIDENCE_THRESHOLD) {
        setResult({
          breed: data.breed,
          confidence: data.confidence,
        });
      } else {
        setResult({
          unknown: true,
          confidence: data.confidence,
        });
      }
    } catch (err) {
      console.error(err);
      setResult({ error: err.message });
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 500);
    }
  }

  return (
    <section
      id="predict"
      className="relative py-24 min-h-screen overflow-hidden
      bg-gradient-to-br from-[#140b23] via-[#22103a] to-[#320f3a] text-slate-100"
    >
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-pink-500/40 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-purple-600/40 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold">Horse Breed Prediction</h1>
          <p className="mt-3 text-slate-200/80 max-w-2xl mx-auto">Unggah gambar kuda untuk mengetahui jenisnya.</p>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-white/10 to-white/5
          backdrop-blur-xl border border-white/10 rounded-3xl
          p-6 md:p-10 shadow-2xl grid md:grid-cols-3 gap-6"
        >
          {/* upload */}
          <div className="flex flex-col gap-4 items-center">
            <label className="w-full cursor-pointer">
              <div className="border-2 border-dashed border-pink-400/40 hover:border-pink-500 rounded-xl p-6 text-center">
                <div className="text-pink-300 font-semibold">Upload Gambar Kuda</div>
                <div className="text-sm text-slate-300">JPG / PNG / WEBP</div>
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
              </div>
            </label>

            <button
              disabled={!file || loading}
              className="w-full px-6 py-3 rounded-full
              bg-gradient-to-r from-pink-500 to-purple-600
              font-semibold disabled:opacity-50"
            >
              {loading ? "Menganalisis..." : "Prediksi"}
            </button>

            {loading && (
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-purple-600" style={{ width: `${progress}%` }} />
              </div>
            )}
          </div>

          {/* preview */}
          <div className="flex items-center justify-center">
            <div className="w-full h-64 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
              {preview ? <img src={preview} alt="preview" className="w-full h-full object-cover" /> : <span className="text-slate-400">Preview akan muncul di sini</span>}
            </div>
          </div>

          {/* result */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold mb-2 text-pink-200">Hasil Prediksi</h3>

            {result ? (
              result.error ? (
                <p className="text-red-300">{result.error}</p>
              ) : result.unknown ? (
                <div className="text-red-300 space-y-2">
                  <p>Maaf, kuda tidak termasuk dari jenis apa pun dari dataset.</p>
                  <p className="text-sm text-slate-300">Confidence: {(result.confidence * 100).toFixed(2)}%</p>
                </div>
              ) : (
                <div className="text-slate-200 space-y-2">
                  <p>
                    <span className="font-semibold">Jenis Kuda:</span> {result.breed}
                  </p>
                  <p>
                    <span className="font-semibold">Confidence:</span> {(result.confidence * 100).toFixed(2)}%
                  </p>
                </div>
              )
            ) : (
              <p className="text-slate-400 text-sm">Belum ada hasil prediksi.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
