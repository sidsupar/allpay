import { TXN } from "@repo/types";
import { Card } from "@repo/ui/card";


export default function Transactions({txn} : {txn:TXN[]}){

    return(
        <>
        <Card title="Transactions">
            <div className="p-2">
                {txn?.length < 1 ?
                <div>
                    No recent Transactions
                </div>
                : 
                <div>
                    <div className="flex justify-between gap-2 mb-2">
                        <div className="w-1/5">
                            id
                        </div>
                        <div className="w-1/5">
                            status
                        </div>
                        <div className="w-1/5">
                            provider
                        </div>
                        <div className="w-1/5">
                            amount
                        </div>
                        <div className="w-1/5">
                            completionTime
                        </div>
                    </div>    
                    <div className="border-b w-full">

                    </div>
                    {txn.map((tx, index) => {

                        return(
                            <>
                                
                                <div key={index+"tx"} className="flex justify-between gap-2 mb-2">
                                    <div className="w-1/5">
                                        {tx.id}
                                    </div>
                                    <div className="w-1/5">
                                        {tx.status}
                                    </div>
                                    <div className="w-1/5">
                                        {tx.provider}
                                    </div>
                                    <div className="w-1/5">
                                        {Number(tx.amount)/100}
                                    </div>
                                    <div className="w-1/5">
                                        {JSON.stringify(tx.completionTime)}
                                    </div>
                                </div>
                                <div className="border-b w-full">

                                </div>
                            </>
                        )
                    } )}
                </div>}
                
            </div>
        </Card>
        </>
    )
}