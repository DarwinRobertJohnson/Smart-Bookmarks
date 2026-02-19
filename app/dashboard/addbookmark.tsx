"use client"

import {useState, useEffect} from 'react'
import {supabase} from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { User } from "@supabase/supabase-js"


export default function AddBookMark(){
    const [bookMarkTitle,setBookMarkTitle] = useState("");
    const [bookMarkUrl,setBookMarkUrl] = useState("");
    const [user,setUser] = useState<User | null>(null);
    useEffect(function(){
        async function loadUser(){
        const {data, error} = await supabase.auth.getUser();
         if (error || !data?.user) redirect("/login");
        setUser(data.user);
    }
    loadUser();
    },[]);
    function handleTitleInput(e: React.ChangeEvent<HTMLInputElement>){
        setBookMarkTitle(e.target.value);
    }

    function handleUrlInput(e: React.ChangeEvent<HTMLInputElement>){
        setBookMarkUrl(e.target.value);
    }

    async function handleAdd(){
        await supabase.from("bookmarks").insert({
        bookMarkTitle:bookMarkTitle,
        bookMarkUrl:bookMarkUrl,
        user_id: user?.id
});
    }

    return <>
    <h2>Enter your book marks</h2>
    <div
    className="flex items-center justify-between w-full gap-4 px-4"
    >
        <input className="bg-white text-black" onChange={handleTitleInput} placeholder='Title' required></input>
        <input className="bg-white text-black" onChange={handleUrlInput} placeholder='Url' required></input>
        <button onClick={handleAdd}
        className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition"
        >
            Add Bookmark
        </button>
    </div>
    </>
}