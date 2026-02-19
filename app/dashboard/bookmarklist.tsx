"use client"

import {supabase} from '@/lib/supabase';
import {useState, useEffect} from 'react';
import { User } from "@supabase/supabase-js";

type Bookmark = {
  id: number
  bookMarkTitle: string
  bookMarkUrl: string
  user_id: string
}

export default function BookMarkList(){
        const [user,setUser] = useState<User | null>(null);
        const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

        async function loadBookMarks(){
                const { data: bookmarkData } = await supabase
                .from("bookmarks")
                .select("*")
                .eq("user_id", user?.id);

                setBookmarks(bookmarkData || []);
        }

        useEffect(function(){
            async function loadUser(){
                const {data, error} = await supabase.auth.getUser();
                if (error || !data?.user) return;
                const user = data.user;
                setUser(user);

                const { data: bookmarkData } = await supabase
                .from("bookmarks")
                .select("*")
                .eq("user_id", user.id);

                setBookmarks(bookmarkData || []);
            }
            
        loadUser();
        },[]);

        useEffect(() => {
            if (!user) return;

            const channel = supabase
            .channel("bookmarks-changes")
            .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "bookmarks" },
            () => {
                loadBookMarks();
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
    }, [user]);

    async function handleDelete(bookMarkId:number){
        console.log("delte called", bookMarkId)
        await supabase
        .from("bookmarks")
        .delete()
        .eq("id", bookMarkId)
        .eq("user_id", user?.id);
    }



    return <div className="space-y-4">
        <p>Your bookmarks:</p>
        {
            bookmarks.map((bookMark:{bookMarkTitle:string, bookMarkUrl:string,id:number})=>(
            <div
            key={bookMark.id}
            className = "flex items-center justify-between w-full gap-4 px-8"
            >
                <p>{bookMark.bookMarkTitle}</p>
                <a href={bookMark.bookMarkUrl} 
                className="text-blue-500"
                target="_target"
                rel="noopener noreferrer"
                >
                    {bookMark.bookMarkUrl}
                </a>
                <button onClick={()=>handleDelete(bookMark.id)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition"
                >
                Delete
                </button>
            </div>
        ))
        }

    </div>
}