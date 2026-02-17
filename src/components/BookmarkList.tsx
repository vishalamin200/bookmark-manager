"use client"

import { supabase } from "@/lib/supabaseClient"
import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { Bookmark } from "@/types"

export default function BookmarkList({ user }: {user:User}) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user?.id) return

        let channel: ReturnType<typeof supabase.channel> | null = null

        const fetchBookmarks = async () => {
            const { data, error } = await supabase
                .from("bookmarks")
                .select("*")
                .order("created_at", { ascending: false })

            if (error) {
                console.error("Fetch error:", error)
            }

            setBookmarks(data || [])
            setLoading(false)
        }

        const setupRealtime = () => {
            channel = supabase
                .channel(`bookmarks-${user.id}`)
                .on(
                    "postgres_changes",
                    {
                        event: "INSERT",
                        schema: "public",
                        table: "bookmarks",
                        filter: `user_id=eq.${user.id}`,
                    },
                    (payload) => {
                        setBookmarks((prev) => [payload.new as Bookmark, ...prev])
                    }
                )
                .on(
                    "postgres_changes",
                    {
                        event: "DELETE",
                        schema: "public",
                        table: "bookmarks",
                        filter: `user_id=eq.${user.id}`,
                    },
                    (payload) => {
                        setBookmarks((prev) =>
                            prev.filter((b) => b.id !== payload.old.id)
                        )
                    }
                )
                .subscribe((status) => {
                    console.log("Realtime status:", status)
                })
        }

        fetchBookmarks()
        setupRealtime()

        return () => {
            if (channel) {
                supabase.removeChannel(channel)
            }
        }
    }, [user?.id])

    const handleDelete = async (id: string) => {
        const { error } = await supabase
            .from("bookmarks")
            .delete()
            .eq("id", id)

        if (error) {
            console.error("Delete error:", error)
        }
    }

    if (loading) {
        return (
            <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800 p-8 rounded-2xl shadow-lg">
                <div className="space-y-4 animate-pulse">
                    <div className="h-16 bg-zinc-800 rounded-xl"></div>
                    <div className="h-16 bg-zinc-800 rounded-xl"></div>
                    <div className="h-16 bg-zinc-800 rounded-xl"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800 p-8 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold tracking-tight">
                    Your Bookmarks
                </h2>

                <span className="text-xs text-zinc-500">
                    {bookmarks.length} total
                </span>
            </div>

            {bookmarks.length === 0 ? (
                <div className="text-center py-16 text-zinc-500">
                    <p className="text-lg mb-2">No bookmarks yet</p>
                    <p className="text-sm text-zinc-600">
                        Add your first bookmark above
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookmarks.map((bookmark) => (
                        <div
                            key={bookmark.id}
                            className="group bg-zinc-800/60 border border-zinc-700 rounded-xl p-5 flex justify-between items-start transition-all duration-200 hover:border-white/40 hover:bg-zinc-800/80"
                        >
                            {/* Left Content */}
                            <div className="space-y-1 max-w-[80%]">
                                <h3 className="font-medium text-white truncate">
                                    {bookmark.title}
                                </h3>

                                <a
                                    href={bookmark.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-zinc-400 hover:text-zinc-200 transition truncate block"
                                >
                                    {bookmark.url}
                                </a>
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(bookmark.id)}
                                className="text-zinc-500 cursor-pointer hover:text-red-400 text-sm transition opacity-0 group-hover:opacity-100 active:scale-95"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
