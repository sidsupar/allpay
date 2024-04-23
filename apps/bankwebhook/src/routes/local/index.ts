import express from "express";
import { PrismaClient } from "@Prisma/client";
import axios from "axios";

const prisma = new PrismaClient();
const router = express.Router();

const txnStatus = { 

}

router.post("/pollbankserver", async (req, res)=>{

    try{    
        console.log("Bankwebhook hit with txn : "+req.body.txnToken);
        const token = req.body.txnToken;
        const paymentStatus = await getTransactionStatus(token);
        console.log("Payment Status");
        console.log(paymentStatus?.data);
        if(paymentStatus?.data?.success == false){
            res.status(406).json({
                msg:"Payment pending",
                success:paymentStatus?.data?.success,
                txnToken: paymentStatus?.data?.txnToken
            });
            throw new Error("Payment not updated yet");
        }

        const updateTxn = await prisma.$transaction( async (tx) => {

                if(paymentStatus?.data?.success){
                    const blockTxn = await tx.$queryRaw`SELECT * FROM "Transaction" where "token" = ${paymentStatus?.data?.txnToken} FOR UPDATE`;
                    const txnDetails = await tx.transaction.findFirst({
                        where:{
                            token:paymentStatus?.data?.txnToken
                        },
                        select:{
                            token:true,
                            userId:true,
                            userTo:true,
                            amount:true
                        }
                    });
                    if(!txnDetails){
                        throw new Error("Transaction not found token: "+paymentStatus?.data?.txnToken);
                    }
                    if(txnDetails?.userTo != null){
                        //update both userId(subtract amount) and userTo(add amount) balance
                        
                        const userTo = await tx.user.findFirst({
                            where:{
                                id: txnDetails?.userId
                            }
                        });
                        const userFrom = await tx.user.findFirst({
                            where:{
                                id: txnDetails?.userTo
                            }
                        });

                        

                    }else if(txnDetails?.userTo == null){
                        //update userId balance only
                        const userTo = await tx.user.findFirst({
                            where:{
                                id: txnDetails?.userId
                            }
                        });
                        if(!userTo){
                            throw new Error("No user found with userId + "+txnDetails?.userId+" to update");
                        }
                        const blockBalanceTxn = await tx.$queryRaw`SELECT * FROM "Balances" where "userId" = ${txnDetails?.userId} FOR UPDATE`;
                        const updateUserBalance = await tx.balances.update({
                            where:{
                                id: Number(txnDetails?.userId)
                            },
                            data:{
                                amount:{
                                    increment:txnDetails.amount
                                }
                            }
                        });
                        const blockTransaction = await tx.$queryRaw`SELECT * FROM "Transaction" where "token" = ${txnDetails?.token} FOR UPDATE`;
                        const updateTransactionStatus = await tx.transaction.update({
                            where:{
                                token: txnDetails?.token
                            },
                            data:{
                                status:"sent",
                                completionTime: new Date(Date.now())
                            }
                        });
                    }

                }

        });

        res.status(200).json({
            msg:"Payment updated",
            success:paymentStatus?.data?.success,
            txnToken: paymentStatus?.data?.txnToken
        });

    }catch(err:any){
        console.log("Banksweeper, global error occured + "+err);
        res.status(406).json(
            {
                msg:"Error occured while polling station",
                err:err.message,
                success:false,
            }
        )

    }
})

async function getTransactionStatus(txnToken:string){
    try{
        const checkStatus = await axios.post("http://localhost:4555/api/v1/client/paymentstatus",{
            token:txnToken
        });
        return checkStatus
    }catch(err:any){
        console.log("Error  occured in polling " + err.message);
        return null
    }
}

export default router