"use client"

import { supabase } from "@/lib/supabaseClient"

export default function Login() {
    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl w-80 text-center">
                <h1 className="text-xl font-semibold text-white mb-6">
                    Bookmark Manager
                </h1>
                <button
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 cursor-pointer rounded-xl font-medium shadow-md hover:shadow-lg hover:bg-zinc-100 transition-all duration-200 active:scale-95"
                >
                    <svg
                        className="w-5 h-5"
                        viewBox="0 0 48 48"
                    >
                        <path
                            fill="#EA4335"
                            d="M24 9.5c3.4 0 6.4 1.2 8.8 3.1l6.5-6.5C35.3 2.5 30 0 24 0 14.7 0 6.7 5.4 2.8 13.3l7.6 5.9C12.4 13 17.7 9.5 24 9.5z"
                        />
                        <path
                            fill="#4285F4"
                            d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 2.9-2.1 5.4-4.6 7.1l7.1 5.5c4.2-3.9 6.6-9.7 6.6-17.1z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M10.4 28.7c-1-2.9-1-6 0-8.9l-7.6-5.9C.9 17.1 0 20.4 0 24s.9 6.9 2.8 10.1l7.6-5.4z"
                        />
                        <path
                            fill="#34A853"
                            d="M24 48c6 0 11-2 14.6-5.4l-7.1-5.5c-2 1.4-4.6 2.2-7.5 2.2-6.3 0-11.6-4.2-13.5-9.8l-7.6 5.4C6.7 42.6 14.7 48 24 48z"
                        />
                    </svg>

                    Sign in with Google
                </button>

            </div>
        </div>
    )
}
