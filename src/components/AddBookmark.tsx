"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import type { User } from "@supabase/supabase-js"

export default function AddBookmark({ user }: {user:User}) {
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [messageType, setMessageType] = useState<"error" | "success" | null>(null)

    const isValidUrl = (value: string) => {
        try {
            new URL(value)
            return true
        } catch {
            return false
        }
    }

    const handleAdd = async () => {
        setMessage(null)

        if (!title.trim() || !url.trim()) {
            setMessageType("error")
            setMessage("Please fill in both fields.")
            return
        }

        if (!isValidUrl(url)) {
            setMessageType("error")
            setMessage("Please enter a valid URL (include https://)")
            return
        }

        setLoading(true)

        const { error } = await supabase.from("bookmarks").insert([
            {
                title: title.trim(),
                url: url.trim(),
                user_id: user.id,
            },
        ])

        if (error) {
            setMessageType("error")
            setMessage(error.message)
        } else {
            setTitle("")
            setUrl("")
            setMessageType("success")
            setMessage("Bookmark added successfully")

            setTimeout(() => {
                setMessage(null)
                setMessageType(null)
            }, 1500)
        }

        setLoading(false)
    }

    return (
        <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800 p-8 rounded-2xl mb-10 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 tracking-tight">
                Add Bookmark
            </h2>

            <div className="h-4 mb-4">
                <p
                    className={`text-sm transition-opacity duration-300 ${message
                            ? "opacity-100"
                            : "opacity-0"
                        } ${messageType === "error"
                            ? "text-red-400"
                            : "text-green-400"
                        }`}
                >
                    {message ?? ""}
                </p>
            </div>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-zinc-800/60  border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
                />

                <input
                    type="text"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
                />

                <button
                    onClick={handleAdd}
                    disabled={loading}
                    className="w-full bg-white text-black py-3 rounded-xl font-medium hover:bg-zinc-200 transition-all cursor-pointer duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Adding..." : "Add Bookmark"}
                </button>
            </div>
        </div>
    )
}
