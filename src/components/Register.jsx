import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("https://api-kuda-production.up.railway.app/api/register", { name, email, password }, { headers: { "Content-Type": "application/json" } });

      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_name");
      localStorage.removeItem("is_admin");

      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Register Error:", err);
      setError(err?.response?.data?.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#12001f] via-[#24002e] to-[#0b0014] relative overflow-hidden">
      {/* AURA */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[120px] bg-pink-500/40" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] bg-purple-600/40" />

      <div className="max-w-md w-full mx-6 rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 z-10">
        <div className="p-8">
          <h2 className="text-3xl font-extrabold mb-2 text-[#fde68a]">Create Account</h2>

          <p className="text-[#e9d5ff] mb-6">
            Join <span className="font-semibold text-pink-400">Umazing Team</span> and start predicting
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm text-[#f5d0fe] mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/90 text-slate-900 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-sm text-[#f5d0fe] mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/90 text-slate-900 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-sm text-[#f5d0fe] mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/90 text-slate-900 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {error && <div className="text-red-300 text-sm">{error}</div>}

            <button type="submit" disabled={loading} className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-xl hover:scale-[1.02] transition disabled:opacity-60">
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-4 text-sm text-[#e9d5ff]">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-400 underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
