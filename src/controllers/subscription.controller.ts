import dotenv from "dotenv";
import crypto from "crypto";
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
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  const paystackRequest = https.request(options, (paystackRes: http.IncomingMessage) => {
    let data = '';

    paystackRes.on('data', (chunk: string) => {
      data += chunk;
    });

    paystackRes.on('end', async () => {
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


// Paystack Webhook
export const paystackWebhook = async (req: Request, res: Response) => {

  const hash = crypto.createHmac('sha512', process.env.WEBHOOK_SECRET as string)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (hash === req.headers['x-paystack-signature']) {
    console.log(true);
    const eventData = req.body;

    if (eventData.event === 'charge.success') {
        try {
          const transactionRepository = dataSource.getRepository(Transaction);

          const verifyResponse = await verifyPayment(eventData.data.reference);
    
          if (verifyResponse && verifyResponse.data.status === 'success') {
            const transaction = new Transaction();
            transaction.reference = verifyResponse.data.reference;
            transaction.amount = verifyResponse.data.amount;
            transaction.currency = verifyResponse.data.currency;
            transaction.channel = verifyResponse.data.channel;
            transaction.status = verifyResponse.data.status;
    
            await transactionRepository.save(transaction);
    
            console.log('Payment successfully verified and stored:', eventData.data.reference);
          } else {
            console.error('Payment verification failed');
          }
        } catch (error) {
          console.error('Error storing or verifying payment:', error);
        }
      }
    }
    res.sendStatus(200);
}

// Verify payment
export const verifyPayment = (reference: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: `/transaction/verify/${reference}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
      }
    }

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
}