'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/lib/supabase-client'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession()

      if (data.session) {
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    }

    checkUser()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="flex flex-col items-center space-y-4">
        
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-gray-600 text-sm font-medium">
          Checking authentication...
        </p>
      </div>
    </div>
  )
}
