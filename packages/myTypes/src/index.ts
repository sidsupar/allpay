import { onRampStatus } from "@prisma/client"

export interface TXN{
    id:number,
    amount:number,
    status:onRampStatus,
    token:string,
    startTime:Date,
    completionTime:Date,
    provider:string,
    userId:number
}