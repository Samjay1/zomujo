import dotenv from "dotenv";
import { Request, Response } from "express";
import * as https from "https";
import * as http from "http";
import { Transaction } from "../models/transactions";
import { dataSource } from "../data-source";

dotenv.config()

const PAYSTACK_SECRET_KEY = process.env.SECRET;

// Create a new subscription plan
export const createPlan = async (req: Request, res: Response) => {
  const { name, amount, interval } = req.body;

  const params = JSON.stringify({
    name,
    interval,
    amount,
  });

  const options: https.RequestOptions = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/plan',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  const paystackRequest = https.request(options, (paystackRes: http.IncomingMessage) => {
    let data = '';

    paystackRes.on('data', (chunk: string) => {
      data += chunk;
    });

    paystackRes.on('end', () => {
      const responseData = JSON.parse(data);
      res.json(responseData);
    });
  }).on('error', (error: Error) => {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  });

  paystackRequest.write(params);
  paystackRequest.end();
};

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
const verifyAndStorePayment = (paymentReference: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const verifyOptions: https.RequestOptions = {
      hostname: 'api.paystack.co',
      port: 443,
      path: `/transaction/verify/${paymentReference}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.SECRET}`,
      },
    };

    const verifyRequest = https.request(verifyOptions, (verifyRes: http.IncomingMessage) => {
      let data = '';

      verifyRes.on('data', (chunk: string) => {
        data += chunk;
      });

      verifyRes.on('end', async () => {
        const verificationData = JSON.parse(data);
        console.log(verificationData);

        if (verificationData.status === true && verificationData.data.status === 'success') {
          try {
            const transactionRepository = dataSource.getRepository(Transaction);

            const newTransaction = transactionRepository.create({
              reference: verificationData.data.reference,
              amount: verificationData.data.amount,
              status: verificationData.data.status,
            });

            await transactionRepository.save(newTransaction);
            resolve(); // Resolve the promise when the transaction is successfully stored
          } catch (error) {
            console.error('Error saving transaction:', error);
            reject(error); // Reject the promise if there's an error
          }
        } else {
          reject('Payment verification failed or payment was not successful');
        }
      });
    }).on('error', (error: Error) => {
      console.error(error);
      reject(error); // Reject the promise if there's an error during the HTTP request
    });

    verifyRequest.end();
  });
};

// Initiate payment for a subscription plan
export const initiatePayment = async (req: Request, res: Response) => {
  const { email, plan, amount } = req.body;

  const requestData = {
    email,
    amount,
    plan,
  };

  const params = JSON.stringify(requestData);

  const options: https.RequestOptions = {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const makeHttpRequest = (options: https.RequestOptions, body: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const request = https.request(options, (response: http.IncomingMessage) => {
      let data = '';

      response.on('data', (chunk: string) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    request.on('error', (error: Error) => {
      reject(error);
    });

    request.write(body);
    request.end();
  });
};