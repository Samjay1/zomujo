"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.paystackWebhook = exports.initiatePayment = exports.createPlan = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
const https = __importStar(require("https"));
const transactions_1 = require("../models/transactions");
const data_source_1 = require("../data-source");
dotenv_1.default.config();
const PAYSTACK_SECRET_KEY = process.env.SECRET;
// Create a new subscription plan
const createPlan = async (req, res) => {
    const { name, amount, interval } = req.body;
    const params = JSON.stringify({
        name,
        interval,
        amount,
    });
    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/plan',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
        },
    };
    const paystackRequest = https.request(options, (paystackRes) => {
        let data = '';
        paystackRes.on('data', (chunk) => {
            data += chunk;
        });
        paystackRes.on('end', () => {
            const responseData = JSON.parse(data);
            res.json(responseData);
        });
    }).on('error', (error) => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    });
    paystackRequest.write(params);
    paystackRequest.end();
};
exports.createPlan = createPlan;
// Initiate payment for a subscription plan
const initiatePayment = async (req, res) => {
    const { email, plan, amount } = req.body;
    const requestData = {
        email,
        amount,
        plan,
    };
    const params = JSON.stringify(requestData);
    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
        },
    };
    const paystackRequest = https.request(options, (paystackRes) => {
        let data = '';
        paystackRes.on('data', (chunk) => {
            data += chunk;
        });
        paystackRes.on('end', async () => {
            const responseData = JSON.parse(data);
            res.json(responseData);
        });
    }).on('error', (error) => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    });
    paystackRequest.write(params);
    paystackRequest.end();
};
exports.initiatePayment = initiatePayment;
// Paystack Webhook
const paystackWebhook = async (req, res) => {
    const hash = crypto_1.default.createHmac('sha512', process.env.WEBHOOK_SECRET)
        .update(JSON.stringify(req.body))
        .digest('hex');
    if (hash === req.headers['x-paystack-signature']) {
        console.log(true);
        const eventData = req.body;
        if (eventData.event === 'charge.success') {
            try {
                const transactionRepository = data_source_1.dataSource.getRepository(transactions_1.Transaction);
                const verifyResponse = await (0, exports.verifyPayment)(eventData.data.reference);
                if (verifyResponse && verifyResponse.data.status === 'success') {
                    const transaction = new transactions_1.Transaction();
                    transaction.reference = verifyResponse.data.reference;
                    transaction.amount = verifyResponse.data.amount;
                    transaction.currency = verifyResponse.data.currency;
                    transaction.channel = verifyResponse.data.channel;
                    transaction.status = verifyResponse.data.status;
                    await transactionRepository.save(transaction);
                    console.log('Payment successfully verified and stored:', eventData.data.reference);
                }
                else {
                    console.error('Payment verification failed');
                }
            }
            catch (error) {
                console.error('Error storing or verifying payment:', error);
            }
        }
    }
    res.sendStatus(200);
};
exports.paystackWebhook = paystackWebhook;
// Verify payment
const verifyPayment = (reference) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.paystack.co',
            port: 443,
            path: `/transaction/verify/${reference}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
            }
        };
        const req = https.request(options, res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                const response = JSON.parse(data);
                resolve(response);
            });
        });
        req.on('error', error => {
            console.error(error);
            reject(error);
        });
        req.end();
    });
};
exports.verifyPayment = verifyPayment;
//# sourceMappingURL=subscription.controller.js.map