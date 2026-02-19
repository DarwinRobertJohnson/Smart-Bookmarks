
import BookMarkList from "./bookmarklist";
import AddBookMark from "./addbookmark";
import NavBar from "@/app/navbar";



export default async function DashboardPage(){


    return <>
        <NavBar />
        <br />
        <AddBookMark />
        <br />
        <BookMarkList />
    </>
}