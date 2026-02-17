"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Login from "./auth/login"
import AddBookmark from "@/components/AddBookmark"
import BookmarkList from "@/components/BookmarkList"
import { User } from "@supabase/supabase-js"

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user ?? null)
      setLoading(false)
    }

    getSession()

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-linear-to-b from-zinc-950 to-black text-white flex items-center justify-center px-6">
        <div className="text-center space-y-6">
          <div className="w-12 h-12 rounded-full border-4 border-zinc-700 border-t-white animate-spin mx-auto"></div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Bookmark Manager
            </h1>
            <p className="text-zinc-500 text-sm mt-2">
              Checking your session...
            </p>
          </div>
        </div>
      </main>
    )
  }

  if (!user) return <Login />

  return (
    <main className="min-h-screen bg-linear-to-b from-zinc-950 to-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Bookmark Manager
            </h1>
            <p className="text-zinc-500 mt-2 text-sm">
              Save and manage your favorite links
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-400 hidden sm:block">
              {user.email}
            </span>

            <button
              onClick={handleLogout}
              className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 cursor-pointer rounded-xl text-sm transition-all duration-200 active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>

        <AddBookmark user={user} />
        <BookmarkList user={user} />
      </div>
    </main>
  )

}
