export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black px-4">
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#6b46c1,_#0f172a)] opacity-30 animate-pulse"></div>

      <div className="relative bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-sm border border-white/20">
        <h2 className="text-3xl font-extrabold text-center text-white mb-8 tracking-wide">
          Login to The Read Shop
        </h2>

        <form className="space-y-6">
          <div>
            <label className="block text-sm text-gray-200 mb-2">Email</label>
            <input
              type="email"
              className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-200 mb-2">Password</label>
            <input
              type="password"
              className="w-full bg-white/20 border border-white/30 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-xl shadow-lg hover:shadow-cyan-400/50 transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Social login links */}
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="#"
            className="text-white hover:text-cyan-400 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="text-white hover:text-cyan-400 transition-colors"
          >
            X
          </a>
        </div>
      </div>
    </div>
  );
}