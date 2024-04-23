import express from "express";
import cors from "cors";
import generateTxnToken from "../../utility/generateTxnToken";


const router = express.Router();

router.post("/paymentinitiated", async (req, res) => {

    try{
        const userId = req.body.userId;
        const token = generateTxnToken();

        res.status(200).json(
            {
                msg:"Generated successfully",
                txnToken: token,
                userId
            }
        )
    }catch(err:any){
        res.status(406).json(
            {
                msg:"Server is down",
                err:err.message
            }
        )
    }
});

router.post("/paymentstatus", async (req, res) => {
    const token = req.body.token;
    try{
        
        await waitASec();
        /*check in db for payment status*/
        res.status(200).json(
            {
                msg:"payment successfull",
                txnToken: token,
                success: true
            }
        )
    }catch(err:any){
        res.status(406).json(
            {
                msg:"Server is down",
                err:err.message,
                txnToken: token,
                success: false
            }
        )
    }
});

async function waitASec(){
    setTimeout(() => {
        return 0;
    },2000)
}
export default router