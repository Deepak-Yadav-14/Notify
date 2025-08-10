import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  User,
  Lock,
  ArrowRight,
  UserPlus,
  Mail,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const res = await fetch("https://notifymon.vercel.app/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setIsSuccess(true);
        setMsg(data.msg || "Registration successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setIsSuccess(false);
        setMsg(data.detail || "Registration failed");
      }
    } catch (err) {
      setIsSuccess(false);
      setMsg("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-900 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-teal-900 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Main registration container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Glassmorphism card */}
        <div className="backdrop-blur-xl bg-black/40 border border-slate-700/50 rounded-3xl p-8 shadow-2xl hover:shadow-blue-900/20 transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-800 to-blue-800 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <UserPlus className="w-8 h-8 text-emerald-200" />
            </div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">
              Create Account
            </h1>
            <p className="text-gray-400 text-sm">Join us and get started</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
              </div>
              <input
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="Choose a username"
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600/50 rounded-2xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm"
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
              </div>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600/50 rounded-2xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border border-gray-600/50 rounded-2xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-blue-400 transition-colors">
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-700 to-blue-700 hover:from-emerald-600 hover:to-blue-600 text-gray-100 font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-emerald-900/30 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group">
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-gray-400/30 border-t-gray-100 rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Message Display */}
          {msg && (
            <div
              className={`mt-6 p-4 rounded-2xl backdrop-blur-sm ${
                isSuccess
                  ? "bg-emerald-900/40 border border-emerald-800/60"
                  : "bg-red-900/30 border border-red-800/50"
              }`}>
              <p
                className={`text-sm text-center ${
                  isSuccess ? "text-emerald-300" : "text-red-300"
                }`}>
                {msg}
              </p>
            </div>
          )}

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-4">
            <div className="text-gray-500 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                Sign in
              </Link>
            </div>
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors">
                Terms
              </a>
              <span>•</span>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Privacy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-emerald-600/25 rounded-full animate-bounce delay-300"></div>
        <div className="absolute -top-2 -right-6 w-6 h-6 bg-blue-600/25 rounded-full animate-bounce delay-700"></div>
        <div className="absolute -bottom-4 -left-2 w-10 h-10 bg-teal-600/25 rounded-full animate-bounce delay-500"></div>
      </div>
    </div>
  );
};

export default RegisterPage;
