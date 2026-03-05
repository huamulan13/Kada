import { Router } from 'express';
import midtransClient from 'midtrans-client';

const router = Router();

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

const coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export const createTransaction = async (req, res) =>{
    try {
        console.log("sampai sini")
        const { amount, first_name, email } = req.body;

        const parameter = {
                transaction_details: {
                order_id: "ORDER-" + Date.now(),
                gross_amount: amount
            },
            credit_card: { secure: true },
            customer_details: {
                first_name,
                email
            }
        };

        const transaction = await snap.createTransaction(parameter);
        
        return res.status(200).json({ 
            message: "Transaksi berhasil dibuat",
            token: transaction.token, 
            redirect_url: transaction.redirect_url 
        });

    } catch (error) {
        console.error("Error createTransaction:", error); 
        return res.status(500).json({ message: "Gagal membuat transaksi" }); 
    }
};
export const handleNotification = async (req, res) => {
    try {
        const nontification = req.body;
        const statusResponse = awaitcoreApi.transaction.nontification(nontification);
        const orderId = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status;
        const fraudStatus = statusResponse.fraud_status;
        const paymentType = statusResponse.payment_type;

        console.log("Order Id:", orderId);
        console.log("Transaction Status:", transactionStatus);

        if (transactionStatus === "capture") {
            if (fraudStatus === "accept") {
                console.log("Pembayaran berhasil (capture)");
            }
        } else if (transactionStatus === "settlement") {
            console.log("Pembayaran berhasil (settlement)");
        } else if (transactionStatus === "pending") {
            console.log("Menunggu pembayaran");
        } else if (
            transactionStatus === "cancel" ||
            transactionStatus === "deny" ||
            transactionStatus === "expire"
        ) {
            console.log("Pembayaran gagal");
        }

        return res.status(200).json({ message: "Notification handled successfully" });

    } catch (error) {
        console.error("Error handleNotification:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const cekStatus = async (req, res) => {
    try {
        const {orderId} = req.param;
        const statusResponse = await coreApi.transaction.status(orderId);

        res.status(200).json({
            order_id: statusResponse.order_id,
            transaction_status: statusResponse.transaction_status,
            payment_type: statusResponse.payment_type,
            fraud_status: statusResponse.fraud_status
        });

        } catch (error) {
        console.error("Error checkStatus:", error);
        res.status(500).json({ message: "Gagal mengecek status transaksi" });
    }
};

export default router;