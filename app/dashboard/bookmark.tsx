
interface BookMarkType{
    title:string,
    url:string
}

export default function BookMark(bookMark:{bookMarkTitle:string, bookMarkUrl:string}){

        async function handleDelete(bookMarkId){
            console.log("delte called", bookMarkId)
            await supabase
            .from("bookmarks")
            .delete()
            .eq("id", bookMarkId)
            .eq("user_id", user.id);
        }

            return <div key={bookMark.bookMarkTitle}
            className="flex items-center justify-between w-full gap-4"
            >
                <p>{bookMark.bookMarkTitle}</p>
                <a href={bookMark.bookMarkUrl}>{bookMark.bookMarkUrl}</a>
                <button onClick={()=>handleDelete(bookMark.id)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition"
                >
                Delete
                </button>
            </div>
}