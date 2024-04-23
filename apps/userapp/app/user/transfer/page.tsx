import { authoptions } from "../../lib/auth";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth"
import AddMoney from "../../components/addMoneyCard";
import Balance from "../../components/balanceCard";
import Transaction from "../../components/transactionsCard";
import { Center } from "@repo/ui/center";
import prisma from "@repo/db/client";
import  { revalidatePath } from "next/cache";

async function getBalance(sesess: any): Promise<{
    ubalance:number,
    lbalance:number
} | null>{

    try{
        console.log("sesess");
        console.log(sesess)
        const balance = await prisma.balances.findFirst({
            where:{
                id:sesess?.user.id
            }
        });
        return {
            ubalance:balance?.amount || 0,
            lbalance:balance?.locked || 0
        }
    }catch(err: any){
        console.log("Error occured while fetching balance "+err.message);
        return null   
    }

}
async function getTransactions(sesess: any){
    console.log("Transactions");
    console.log(sesess);
    console.log("Transactions for userId: "+sesess?.user.id);
    try{

        const txn = await prisma.transaction.findMany({
            where:{
                userId: sesess?.user.id
            }
        })
        return txn

    }catch(err:any){
        console.log("Error occured while fetching transactions "+err.message);
    }

}
export default async function Dashboard(){    
    const sesess = await getServerSession(authoptions);
    const {ubalance, lbalance} = await getBalance(sesess);
    const txn = await getTransactions(sesess);
    revalidatePath('/user/transfer');
    return(
        <>
            <div className="w-full grid grid-cols-12">
                <div className="col-span-5">
                    <AddMoney />
                </div>
            
                <div className="col-span-7 border">
                        <div className="flex flex-col jsutify-between">
                            <div className="w-full ">
                                <Balance amount={parseInt(ubalance)} locked={parseInt(lbalance)}/>
                            </div>
                            <div className="p-2">
                                <Transaction txn={txn} />                                
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}