import dotenv from "dotenv";
import crypto from "crypto";
import { Request, Response } from "express";
import * as https from "https";
import * as http from "http";
import { Transaction } from "../models/transactions";
import { dataSource } from "../data-source";

dotenv.config()

const PAYSTACK_SECRET_KEY = process.env.SECRET;

let verificationInterval: NodeJS.Timer | null = null;

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

      await verifyPayment(responseData.data.reference);
      
      res.json(responseData);
    });
  }).on('error', (error: Error) => {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  });

  paystackRequest.write(params);
  paystackRequest.end();
};


// Verify payment
export const verifyPayment = async (reference: string) => {
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

      res.on('end', async () => {
        const response = JSON.parse(data);

        if (response.data.status === 'success') {
          console.log('Payment Verified');

          const transactionRepository = dataSource.getRepository(Transaction);

          const newTransaction = transactionRepository.create({
            reference: response.data.reference,
            amount: response.data.amount,
            currency: response.data.currency,
            channel: response.data.channel,
            status: response.data.status,
          });

          return await transactionRepository.save(newTransaction);
        } else {
          setTimeout(() => verifyPayment(reference), 10000);
        }

      });
    });

    req.on('error', error => {
      console.error(error);
    });

    req.end();
  };


export const populateDummyData = async (req: Request, res: Response) => {
  try {
    const transactionRepository = dataSource.getRepository(Transaction);

    const dummyData = [
      { reference: 'REF001', amount: 100.50, currency: 'USD', channel: 'Online', status: 'Pending' },
      { reference: 'REF002', amount: 200.75, currency: 'EUR', channel: 'In-Person', status: 'Completed' },
    ];

    for (const data of dummyData) {
      const transaction = transactionRepository.create(data);
      await transactionRepository.save(transaction);
    }

    res.send('Dummy data populated successfully!');
  } catch (error) {
    res.status(500).send('Internal Server Error');
    console.error(error);
  }
};
