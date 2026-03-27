import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js";
import crypto from "node:crypto";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-d8ebeed1/health", (c) => {
  return c.json({ status: "ok" });
});

// Razorpay order creation endpoint
app.post("/make-server-d8ebeed1/create-order", async (c) => {
  try {
    const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID');
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!razorpayKeyId || !razorpayKeySecret) {
      console.error('Razorpay credentials not configured');
      return c.json({ error: 'Payment service not configured. Please contact administrator.' }, 500);
    }

    const body = await c.req.json();
    const { amount, currency = 'EUR', receipt, notes } = body;

    if (!amount || !receipt) {
      return c.json({ error: 'Amount and receipt are required' }, 400);
    }

    // Create Razorpay order
    const orderData = {
      amount: Math.round(amount * 100), // Convert to smallest currency unit (cents)
      currency: currency,
      receipt: receipt,
      notes: notes || {}
    };

    const auth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);
    
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Razorpay order creation failed:', errorText);
      return c.json({ error: 'Failed to create payment order' }, response.status);
    }

    const order = await response.json();
    console.log('Razorpay order created successfully:', order.id);

    return c.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: razorpayKeyId
    });

  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return c.json({ error: 'Internal server error while creating order' }, 500);
  }
});

// Razorpay payment verification endpoint
app.post("/make-server-d8ebeed1/verify-payment", async (c) => {
  try {
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!razorpayKeySecret) {
      console.error('Razorpay secret not configured');
      return c.json({ error: 'Payment service not configured' }, 500);
    }

    const body = await c.req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return c.json({ error: 'Missing required payment verification parameters' }, 400);
    }

    // Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', razorpayKeySecret)
      .update(text)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      console.log('Payment verified successfully:', razorpay_payment_id);
      return c.json({ 
        success: true, 
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id 
      });
    } else {
      console.error('Payment signature verification failed');
      return c.json({ error: 'Payment verification failed' }, 400);
    }

  } catch (error) {
    console.error('Error verifying payment:', error);
    return c.json({ error: 'Internal server error during payment verification' }, 500);
  }
});

// Brochure upload endpoint
app.post("/make-server-d8ebeed1/upload-brochure", async (c) => {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase credentials not configured');
      return c.json({ error: 'Storage service not configured' }, 500);
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Ensure bucket exists
    const bucketName = 'make-d8ebeed1-brochures';
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, { public: false });
      console.log('Created brochure bucket');
    }

    const formData = await c.req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `association-brochure.${fileExt}`;
    const fileBuffer = await file.arrayBuffer();

    // Upload file
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, fileBuffer, { 
        upsert: true,
        contentType: file.type 
      });

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return c.json({ error: 'Failed to upload file' }, 500);
    }

    console.log('Brochure uploaded successfully');
    return c.json({ success: true, fileName });

  } catch (error) {
    console.error('Error in brochure upload:', error);
    return c.json({ error: 'Internal server error during file upload' }, 500);
  }
});

// Get brochure URL endpoint
app.get("/make-server-d8ebeed1/get-brochure-url", async (c) => {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase credentials not configured');
      return c.json({ error: 'Storage service not configured' }, 500);
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const bucketName = 'make-d8ebeed1-brochures';

    // List files to find the brochure
    const { data: files, error: listError } = await supabase.storage
      .from(bucketName)
      .list();

    if (listError || !files || files.length === 0) {
      return c.json({ error: 'No brochure found' }, 404);
    }

    const brochureFile = files.find(f => f.name.startsWith('association-brochure'));
    
    if (!brochureFile) {
      return c.json({ error: 'No brochure found' }, 404);
    }

    // Create signed URL (valid for 1 hour)
    const { data: signedUrl, error: urlError } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(brochureFile.name, 3600);

    if (urlError || !signedUrl) {
      console.error('Error creating signed URL:', urlError);
      return c.json({ error: 'Failed to get brochure URL' }, 500);
    }

    return c.json({ url: signedUrl.signedUrl });

  } catch (error) {
    console.error('Error getting brochure URL:', error);
    return c.json({ error: 'Internal server error while fetching brochure' }, 500);
  }
});

Deno.serve(app.fetch);