import express from "express";
import cors from "cors";
import router from "./routes/index";

const app = express();

app.use(cors({
    origin:true,
    credentials:true
}));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use("/api/v1", router);

// app.use("/",(req, res) =>{
//     res.status(200).json(
//         {
//             msg:"Bank Webhook",
//             status:"Up"
//         }
//     )
// })

const port = process.env.PORT || 4559;

app.listen(port, function(){
    console.log("Bank Webhook SERVER Port listening on port number "+port);
});

app.use(function(err: any, req: any, res: any, next:any) {

    res.status(502).json({
        msg:"Something went Wrong !!!",
        err:err.message
    })
    return process.exit(-1);
})

