'use client'

import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
// import { getServerSession } from "next-auth";
// import { authoptions } from "../lib/auth";

const links = [
    {
        name:"dashboard",
        page:"/user/dashboard"
    }
]


export default function AppBar(){

    const session = useSession()
    // const session = await getServerSession(authoptions);
    const authStatus = session?.data?.status;
    console.log("session")
    console.log(authStatus)
    console.log(session)
    return(
        <>
            <div>
                <Appbar links={links} signin={signIn} signout={signOut} user={session?.data?.user}/>
            </div>
        </>
    )
}