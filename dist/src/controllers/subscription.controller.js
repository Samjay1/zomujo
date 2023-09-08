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
exports.populateDummyData = exports.verifyPayment = exports.initiatePayment = exports.createPlan = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const https = __importStar(require("https"));
const transactions_1 = require("../models/transactions");
const data_source_1 = require("../data-source");
dotenv_1.default.config();
const PAYSTACK_SECRET_KEY = process.env.SECRET;
let verificationInterval = null;
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
            await (0, exports.verifyPayment)(responseData.data.reference);
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
// Verify payment
const verifyPayment = async (reference) => {
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
        res.on('end', async () => {
            const response = JSON.parse(data);
            if (response.data.status === 'success') {
                console.log('Payment Verified');
                const transactionRepository = data_source_1.dataSource.getRepository(transactions_1.Transaction);
                const newTransaction = transactionRepository.create({
                    reference: response.data.reference,
                    amount: response.data.amount,
                    currency: response.data.currency,
                    channel: response.data.channel,
                    status: response.data.status,
                });
                return await transactionRepository.save(newTransaction);
            }
            else {
                setTimeout(() => (0, exports.verifyPayment)(reference), 10000);
            }
        });
    });
    req.on('error', error => {
        console.error(error);
    });
    req.end();
};
exports.verifyPayment = verifyPayment;
const populateDummyData = async (req, res) => {
    try {
        const transactionRepository = data_source_1.dataSource.getRepository(transactions_1.Transaction);
        const dummyData = [
            { reference: 'REF001', amount: 100.50, currency: 'USD', channel: 'Online', status: 'Pending' },
            { reference: 'REF002', amount: 200.75, currency: 'EUR', channel: 'In-Person', status: 'Completed' },
        ];
        for (const data of dummyData) {
            const transaction = transactionRepository.create(data);
            await transactionRepository.save(transaction);
        }
        res.send('Dummy data populated successfully!');
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
        console.error(error);
    }
};
exports.populateDummyData = populateDummyData;
//# sourceMappingURL=subscription.controller.js.map