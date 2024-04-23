import express from "express";
import clientRouter from "./client"
import localRouter from "./local"


const router = express.Router();

router.use("/client",clientRouter);
router.use("/local",localRouter);

export default router