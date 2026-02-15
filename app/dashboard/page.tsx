'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/lib/supabase-client'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(true)

 
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
      }

      setLoading(false)
    }

    getUser()
  }, [router])

  
  const fetchBookmarks = async (userId: string) => {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setBookmarks(data)
    }
  }

  
  useEffect(() => {
    if (user) {
      fetchBookmarks(user.id)
    }
  }, [user])

  
  useEffect(() => {
    if (!user) return

    const channel = supabase
      .channel('realtime-bookmarks')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
        },
        async () => {
          
          await fetchBookmarks(user.id)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  
  const addBookmark = async () => {
    if (!title || !url) return

    const { error } = await supabase.from('bookmarks').insert({
      title,
      url,
      user_id: user.id,
    })

    if (!error) {
      setTitle('')
      setUrl('')
      
    }
  }

 
  const deleteBookmark = async (id: string) => {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete failed:', error.message)
    }
   
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">

        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            My Bookmarks
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        
        <div className="bg-gray-50 p-5 rounded-xl mb-8">
          <h2 className="text-lg font-medium mb-4 text-gray-700">
            Add New Bookmark
          </h2>

          <div className="space-y-3">
            <input
              className="w-full border p-3 rounded-lg"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="w-full border p-3 rounded-lg"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <button
              onClick={addBookmark}
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              Add Bookmark
            </button>
          </div>
        </div>

        
        <div className="space-y-4">
          {bookmarks.length === 0 ? (
            <p className="text-gray-500 text-center">
              No bookmarks added yet.
            </p>
          ) : (
            bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-xl"
              >
                <div>
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-blue-600 hover:underline"
                  >
                    {bookmark.title}
                  </a>
                  <p className="text-sm text-gray-500 truncate max-w-md">
                    {bookmark.url}
                  </p>
                </div>

                <button
                  onClick={() => deleteBookmark(bookmark.id)}
                  className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}
