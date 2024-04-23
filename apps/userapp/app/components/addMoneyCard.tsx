'use client'
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/text-input";
import { useState, useEffect } from "react";
import { onRampTxn } from "../actions/onRampTransaction";
import { revalidatePath } from "next/cache";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];


export default function AddMoney(){
    
    const [amount, setAmount] = useState(0);
    const [bank, setBank] = useState("");
    const [bankUrl, setBankUrl] = useState("");
    console.log(`amount = ${amount} and bank = ${bank} bankUrl = ${bankUrl}`);

    return(
        <>
        <div className="">
            <div className="p-2">
                <Card title="Transfer">
                    <div className="flex flex-col gap-5">
                        <TextInput label="Amount" placeholder="₹ 999999" setTextValue={setAmount}/>
                        <Select onSelect={(value: string) => {
                            setBankUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                            setBank(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
                        }} option={SUPPORTED_BANKS}/>
                        <button onClick={(e) => {
                            onRampTxn({amount, provider:bank});
                            setTimeout(()=>{
                                revalidatePath('/user/transfer');
                            },3000)
                        }}
                        
                        className="focus:outline-none text-white bg-purple-700 
                                        hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 
                                        font-medium rounded-lg text-sm px-5 py-2.5 
                                        mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 
                                        dark:focus:ring-purple-900">
                                Add Money
                        </button>
                    </div>                
                </Card>    
            </div>
        </div>            
        </>
    )
}