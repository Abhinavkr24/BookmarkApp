'use client'

import { supabase } from '@/app/lib/supabase-client'

export default function Login() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Bookmark Manager
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Sign in to manage your bookmarks
          </p>
        </div>

        {/* Google Button */}
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 font-medium text-gray-700 hover:bg-gray-50 transition duration-200 shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-5 h-5"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.87-6.87C35.97 2.18 30.39 0 24 0 14.62 0 6.51 5.64 2.9 13.74l8.01 6.22C12.91 13.26 17.99 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.5 24c0-1.64-.15-3.21-.43-4.74H24v9h12.68c-.55 2.96-2.2 5.47-4.68 7.16l7.28 5.66C43.98 36.36 46.5 30.73 46.5 24z"
            />
            <path
              fill="#FBBC05"
              d="M10.91 19.96l-8.01-6.22A23.96 23.96 0 000 24c0 3.84.92 7.46 2.9 10.26l8.01-6.22A14.48 14.48 0 019.5 24c0-1.38.24-2.7.67-4.04z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.39 0 11.97-2.11 15.96-5.74l-7.28-5.66c-2.02 1.36-4.6 2.17-8.68 2.17-6.01 0-11.09-3.76-13.09-8.46l-8.01 6.22C6.51 42.36 14.62 48 24 48z"
            />
          </svg>
          Sign in with Google
        </button>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-6">
          Secure authentication powered by Supabase
        </p>
      </div>
    </div>
  )
}
