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
exports.initiatePayment = exports.createPlan = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
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
// export const initiatePayment = async (req: Request, res: Response) => {
//   const { email, plan, amount } = req.body;
//   const requestData = {
//     email,
//     amount,
//     plan,
//   };
//   const params = JSON.stringify(requestData);
//   const options: https.RequestOptions = {
//     hostname: 'api.paystack.co',
//     port: 443,
//     path: '/transaction/initialize',
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
//       'Content-Type': 'application/json',
//     },
//   };
//   const paystackRequest = https.request(options, (paystackRes: http.IncomingMessage) => {
//     let data = '';
//     paystackRes.on('data', (chunk: string) => {
//       data += chunk;
//     });
//     paystackRes.on('end', async () => {
//       const responseData = JSON.parse(data);
//       console.log(responseData.data.reference);
//       await verifyAndStorePayment(responseData.data.reference)
//       res.json(responseData);
//     });
//   }).on('error', (error: Error) => {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred' });
//   });
//   paystackRequest.write(params);
//   paystackRequest.end();
// };
// Verify payment and add to database
// export const verifyAndStorePayment = async (paymentReference: string) => {
//   const verifyOptions: https.RequestOptions = {
//     hostname: 'api.paystack.co',
//     port: 443,
//     path: `/transaction/verify/${paymentReference}`, 
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${process.env.SECRET}`,
//     },
//   };
//   const verifyRequest = https.request(verifyOptions, async (verifyRes: http.IncomingMessage) => {
//     let data = '';
//     verifyRes.on('data', (chunk: string) => {
//       data += chunk;
//     });
//     verifyRes.on('end', async () => {
//       const verificationData = JSON.parse(data);
//       console.log(verificationData);
//       if (verificationData.status === true && verificationData.data.status === 'success') {
//         try {
//           const transactionRepository = dataSource.getRepository(Transaction);
//           const newTransaction = transactionRepository.create({
//             reference: verificationData.data.reference,
//             amount: verificationData.data.amount,
//             status: verificationData.data.status
//           });
//           await transactionRepository.save(newTransaction);
//         } catch (error) {
//           console.error('Error saving transaction:', error);
//         }
//       }
//     });
//   }).on('error', (error: Error) => {
//     console.error(error);
//   });
//     verifyRequest.end();
// };
// Verify payment and add to database
const verifyAndStorePayment = (paymentReference) => {
    return new Promise((resolve, reject) => {
        const verifyOptions = {
            hostname: 'api.paystack.co',
            port: 443,
            path: `/transaction/verify/${paymentReference}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.SECRET}`,
            },
        };
        const verifyRequest = https.request(verifyOptions, (verifyRes) => {
            let data = '';
            verifyRes.on('data', (chunk) => {
                data += chunk;
            });
            verifyRes.on('end', async () => {
                const verificationData = JSON.parse(data);
                console.log(verificationData);
                if (verificationData.status === true && verificationData.data.status === 'success') {
                    try {
                        const transactionRepository = data_source_1.dataSource.getRepository(transactions_1.Transaction);
                        const newTransaction = transactionRepository.create({
                            reference: verificationData.data.reference,
                            amount: verificationData.data.amount,
                            status: verificationData.data.status,
                        });
                        await transactionRepository.save(newTransaction);
                        resolve(); // Resolve the promise when the transaction is successfully stored
                    }
                    catch (error) {
                        console.error('Error saving transaction:', error);
                        reject(error); // Reject the promise if there's an error
                    }
                }
                else {
                    reject('Payment verification failed or payment was not successful');
                }
            });
        }).on('error', (error) => {
            console.error(error);
            reject(error); // Reject the promise if there's an error during the HTTP request
        });
        verifyRequest.end();
    });
};
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
            Authorization: `Bearer ${process.env.SECRET}`,
            'Content-Type': 'application/json',
        },
    };
    try {
        const responseData = await makeHttpRequest(options, params);
        console.log(responseData.data.reference);
        // Verify and store payment after successful payment initialization
        // await verifyAndStorePayment(responseData.data.reference);
        res.json(responseData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};
exports.initiatePayment = initiatePayment;
const makeHttpRequest = (options, body) => {
    return new Promise((resolve, reject) => {
        const request = https.request(options, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                resolve(JSON.parse(data));
            });
        });
        request.on('error', (error) => {
            reject(error);
        });
        request.write(body);
        request.end();
    });
};
//# sourceMappingURL=subscription.controller.js.map