'use server'

import { authoptions } from "../lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import axios from "axios";
import { createClient } from "redis";
// import { TXN } from "@repo/types";

let client = createClient();

async function connectRedis(){
    if(!client.isReady){
        await client.connect();
    }
    client.on("error", function(err:any){
        console.log("Error connecting redis in onRampTransaction "+err.message);
    });
    client.on("ready", function(){
        console.log("Connected with redis in onRampTransaction ");
    });
}
export async function onRampTxn({amount, provider} : {amount:number, provider:string}){
    const session = await getServerSession(authoptions);
    console.log("Initiating add money");
    try{
        const user = await prisma.user.findFirst({
            where:{
                id: session?.user.id
            }
        });
        if(!user){
            throw new Error("Invalid user trying to add money");
        }
        const bankApiServerUrl = "http://localhost:4555/api/v1/client/paymentinitiated";
        const bankApi = await axios.post(bankApiServerUrl, {
            userId:user.id
        })

        if(bankApi.status == 200){
            const token = bankApi?.data?.txnToken;
            const addtransaction = await prisma.transaction.create({
                data:{
                        amount:Number(amount) * 100,
                        status: "processing",
                        startTime: new Date(Date.now()),
                        token,
                        provider,
                        userId:user.id                    
                },
                select:{
                    id:true
                }
            });
            if(!addtransaction){
                return null
            }
            await connectRedis();
            if(token != null){
                client.lPush("txn", token);
            }
            
            return {
                msg:"Money added successfully",
                amount
            }
        }            

    }catch(err: any ){
        console.log(`Error occured while initiating add money action ${err.message}`)
        return {
            msg:"Money not added",
            amount,
            err:err.message
        }
    }
}