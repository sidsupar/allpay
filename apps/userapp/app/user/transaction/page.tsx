import { authoptions } from "../../lib/auth";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth"
export default async function Dashboard(){    
    const sesess = await getServerSession(authoptions);

    return(
        <>
            <div>
                Hi from Transaction
            </div>
            <div>
                {JSON.stringify(sesess)}
            </div>
            <div>
                {JSON.stringify(sesess?.data?.user)}
            </div>
        </>
    )
}