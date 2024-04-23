import { getServerSession } from "next-auth"
import { authoptions } from "../lib/auth"
import { redirect } from "next/navigation"

export default async function ProtectedRoutes({children}: {children: React.ReactNode}){

    const session = await getServerSession(authoptions);
    console.log(session)

    if(session == null){
        redirect("/");
    }

    return(
        <div>
            {children}
        </div>
    )
}