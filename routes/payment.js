import express from "express";
import{ createTransaction, handleNotification} from "../midtrans.js";

const router = express.Router();

router.post("/create", createTransaction);

router.post("/nontification", handleNotification);

export default router;