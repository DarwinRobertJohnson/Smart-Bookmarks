
"use client"

import {supabase} from "@/lib/supabase";
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function NavBar(){
    async function handleLogOut(){
        await supabase.auth.signOut();
        redirect("/login")
    }
    return <div className="flex items-center justify-between w-full py-4">
        <h1 className="text-4xl">Smart-BookMarks</h1>
        <Link href="/dashboard">Dashboard</Link>
        <button onClick={()=>handleLogOut()}
        className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition"
        >
            Log out
        </button>
        </div>
}