import { Card } from "@repo/ui/card";

export default function Balance({amount, locked}: {
    amount: number;
    locked: number;
}){

    return(
        <>
            <div className="p-2 w-full">
                <Card title="Balance">
                    <div className="flex justify-between border-b border-slate-300 pb-2 gap-2">
                        <div>
                            Unlocked balance
                        </div>
                        <div>
                            {amount / 100} INR
                        </div>
                    </div>
                    <div className="flex justify-between border-b border-slate-300 py-2 gap-2">
                        <div>
                            Total Locked Balance
                        </div>
                        <div>
                            {locked / 100} INR
                        </div>
                    </div>
                    <div className="flex justify-between border-b border-slate-300 py-2 gap-2">
                        <div>
                            Total Balance
                        </div>
                        <div>
                            {(locked + amount) / 100} INR
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}