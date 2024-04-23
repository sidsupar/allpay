import { createClient } from "redis";
import axios from "axios";

const client = createClient();

async function connectRedis(){
    await client.connect();
    client.on("error", function(err){
        console.log("Error occured while connecting redis "+err.message);
    });
    
    client.on("ready", function(){
        console.log("Connected to redis");
    });
}

async function main(){
    console.log("Bank Sweeper main");
    await connectRedis();
        console.log("Worker 1 initiated");
        while(true){
            await new Promise((res, rej) =>{setTimeout(() => { res(true)}, 2000)});
            const txn = await client.brPop("txn", 0);
            try{
                console.log(`Transaction ${txn?.key}: ${txn?.element}`);
                const bankWebHookURL = "http://localhost:4559/api/v1/local/pollbankserver"
                const hitbankWebHook = await axios.post(bankWebHookURL, {
                    txnToken:txn?.element
                });
                console.log(hitbankWebHook.data);
                if(!hitbankWebHook.data.success){
                    if(txn != null){
                        await client.lPush("txn", txn?.element);
                    }
                    break;                    
                }
            }catch(err:any){
                console.log("Error occured in bankSweeper "+err);
                if(txn != null){
                    await client.lPush("txn", txn?.element);
                }
            }
            
        }
    
}

main();