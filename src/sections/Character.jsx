import React from "react";
import { motion } from "framer-motion";
import Modal from "../components/Modal";

const API_URL = "https://api-kuda-production.up.railway.app/api/jenis-kuda";

function pickField(obj, candidates) {
  if (!obj) return undefined;
  for (const key of candidates) if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") return obj[key];

  for (const k of Object.keys(obj)) {
    const lower = k.toLowerCase();
    for (const c of candidates) if (lower.includes(c)) return obj[k];
  }
  return undefined;
}

export default function Character() {
  const [horses, setHorses] = React.useState([]);
  const [visible, setVisible] = React.useState(12);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selected, setSelected] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetch(API_URL)
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;

        if (Array.isArray(data)) {
          const flattened = data.flatMap((item) => {
            const jenisName = item.jenis ?? item.type ?? item.name ?? "Unknown";
            if (Array.isArray(item.data_kuda)) return item.data_kuda.map((k) => ({ ...k, jenis: jenisName }));
            if (Array.isArray(item.data)) return item.data.map((k) => ({ ...k, jenis: jenisName }));
            return [];
          });
          setHorses(flattened.length > 0 ? flattened : data);
        } else if (Array.isArray(data?.data)) {
          setHorses(data.data);
        } else {
          setHorses([]);
        }
      })
      .catch(() => mounted && setError("Gagal mengambil data kuda"))
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  const items = horses.slice(0, visible);
  const selectedDesc = pickField(selected || {}, ["deskripsi", "description", "detail"]) || "Tidak ada deskripsi detail.";

  return (
    <section
      className="relative py-28 overflow-hidden
      bg-gradient-to-br from-[#12001f] via-[#24002e] to-[#0b0014]"
    >
      {/* === AURA BACKGROUND (HOME STYLE) === */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-[120px] bg-pink-500" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full blur-[120px] bg-purple-600" />

      <div className="max-w-7xl mx-auto px-6">
        {/* ===== HEADER ===== */}
        <div className="mb-16 text-center md:text-left">
          <span className="px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs uppercase tracking-wider inline-block shadow-lg text-[#fff6ff]">Umazing Team</span>

          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#fde68a] drop-shadow">Galeri Hero Kuda</h1>

          <p className="mt-3 max-w-xl text-[#e9d5ff]">Pilih karakter kuda dan pelajari keunggulan, data, serta potensinya secara visual.</p>
        </div>

        {/* ===== LOADING ===== */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-60 rounded-2xl bg-white/10 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-400 font-medium">{error}</p>
        ) : (
          <>
            {(() => {
              const grouped = items.reduce((acc, h) => {
                const key = h.jenis || "Unknown";
                if (!acc[key]) acc[key] = [];
                acc[key].push(h);
                return acc;
              }, {});

              return Object.entries(grouped).map(([jenisName, list]) => {
                const rows = [];
                for (let i = 0; i < list.length; i += 3) rows.push(list.slice(i, i + 3));

                return rows.map((row, rowIndex) => (
                  <div key={`${jenisName}-${rowIndex}`} className="mb-14">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#f5d0fe] mb-5 drop-shadow">{jenisName}</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {row.map((horse, i) => {
                        const nama = pickField(horse, ["nama", "name"]) || `Kuda ${i + 1}`;
                        const tahun = pickField(horse, ["tahunlahir", "tahun_lahir", "tahun", "year"]) || "-";
                        const image = pickField(horse, ["gambar", "image", "foto", "thumbnail"]) || "";

                        return (
                          <motion.div
                            key={horse.id ?? `${jenisName}-${i}`}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setSelected(horse)}
                            className="cursor-pointer rounded-2xl overflow-hidden
                              bg-gradient-to-br from-white/15 to-white/5
                              backdrop-blur-xl border border-white/20
                              shadow-lg hover:shadow-2xl transition"
                          >
                            <div className="flex gap-4 p-4">
                              <div className="w-28 h-28 md:w-36 md:h-36 rounded-lg overflow-hidden bg-black/30">
                                {image ? <img src={image} alt={nama} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center w-full h-full text-[#e9d5ff]">No Image</div>}
                              </div>

                              <div className="flex-1">
                                <h3 className="text-[#fde68a] font-semibold truncate">{nama}</h3>

                                <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-pink-500/90 text-[#fff1f2]">{tahun}</span>

                                <ul className="mt-4 text-xs space-y-1">
                                  {Object.entries(horse).map(([k, v]) => {
                                    if (["gambar", "image", "foto", "thumbnail", "created_at", "updated_at", "jenis", "id"].includes(k)) return null;

                                    const value = v === null || v === undefined ? "-" : typeof v === "object" ? JSON.stringify(v) : String(v);

                                    return (
                                      <li key={k} className="flex gap-2">
                                        <span className="w-24 text-pink-300 font-medium capitalize">{k}:</span>
                                        <span className="text-[#e9d5ff] break-all">{value}</span>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ));
              });
            })()}

            {visible < horses.length && (
              <div className="mt-16 text-center">
                <button
                  onClick={() => setVisible((v) => v + 12)}
                  className="px-6 py-3 rounded-full
                    bg-gradient-to-r from-pink-500 to-purple-600
                    text-[#fff6ff] font-semibold shadow-xl
                    hover:scale-105 transition"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}

        {/* ===== MODAL ===== */}
        <Modal open={!!selected} onClose={() => setSelected(null)} title={pickField(selected || {}, ["nama", "name"]) || "Detail Kuda"}>
          {selected && (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-52 h-64 rounded-xl overflow-hidden bg-black/30">
                <img src={pickField(selected, ["gambar", "image", "foto"]) || "https://via.placeholder.com/400x600"} alt="Horse" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#fde68a]">{pickField(selected, ["nama", "name"])}</h3>

                <p className="mt-3 text-sm text-[#e9d5ff] leading-relaxed">{selectedDesc.slice(0, 300)}</p>

                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-lg bg-white/20 text-[#f5d0fe] hover:bg-white/30">
                    Close
                  </button>

                  <a
                    href="/predict"
                    className="px-6 py-3 rounded-full
                      border border-white/40
                      text-[#fff6ff] font-semibold backdrop-blur-md"
                  >
                    Try Prediction
                  </a>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}
