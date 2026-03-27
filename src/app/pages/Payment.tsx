import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { CreditCard, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Alert, AlertDescription } from '../components/ui/alert';
import { api } from '../../lib/api';
import { toast } from 'sonner';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment() {
  const [searchParams] = useSearchParams();
  const [paymentType, setPaymentType] = useState(searchParams.get('type') || 'membership');
  const [amount, setAmount] = useState(searchParams.get('amount') || '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      toast.error('Payment service unavailable. Please try again later.');
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const membershipPlans = [
    { type: 'individual', label: 'Individual Membership', amount: 100 },
    { type: 'student', label: 'Student Membership', amount: 50 },
    { type: 'corporate', label: 'Corporate Membership', amount: 500 }
  ];

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!scriptLoaded) {
      toast.error('Payment service is loading. Please wait a moment and try again.');
      return;
    }

    if (!name || !email || !phone || !amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    const paymentAmount = parseFloat(amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      setLoading(true);

      // Create order on server
      const orderData = await api.createRazorpayOrder({
        amount: paymentAmount,
        currency: 'EUR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          type: paymentType,
          name: name,
          email: email
        }
      });

      // Configure Razorpay checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'MoX',
        description: `Payment for ${paymentType}`,
        order_id: orderData.orderId,
        prefill: {
          name: name,
          email: email,
          contact: phone
        },
        theme: {
          color: '#0f3d5f'
        },
        handler: async function (response: any) {
          try {
            // Verify payment on server
            const verificationResult = await api.verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verificationResult.success) {
              setSuccess(true);
              toast.success('Payment successful! Thank you for your payment.');
            } else {
              toast.error('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed. Please contact support with your payment ID.');
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            toast.error('Payment cancelled');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Failed to initiate payment. Please try again.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>
              Your payment has been processed successfully. You will receive a confirmation email shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Button onClick={() => window.location.href = '/'} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0f3d5f] to-[#1a5a7f] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Payment Portal</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Secure payment processing for memberships, events, and donations.
          </p>
        </div>
      </section>

      {/* Payment Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert className="mb-8">
            <CreditCard className="h-4 w-4" />
            <AlertDescription>
              All payments are processed securely through Razorpay. We accept credit cards, debit cards, and other payment methods.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Make a Payment</CardTitle>
              <CardDescription>
                Fill in your details below to complete your payment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-6">
                {/* Payment Type */}
                <div className="space-y-3">
                  <Label>Payment Type</Label>
                  <RadioGroup value={paymentType} onValueChange={setPaymentType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="membership" id="membership" />
                      <Label htmlFor="membership" className="font-normal cursor-pointer">
                        Membership Payment
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="event" id="event" />
                      <Label htmlFor="event" className="font-normal cursor-pointer">
                        Event Registration
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="donation" id="donation" />
                      <Label htmlFor="donation" className="font-normal cursor-pointer">
                        Donation
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Membership Plan Selection */}
                {paymentType === 'membership' && (
                  <div className="space-y-3">
                    <Label>Select Membership Plan</Label>
                    <RadioGroup 
                      value={amount} 
                      onValueChange={setAmount}
                    >
                      {membershipPlans.map((plan) => (
                        <div key={plan.type} className="flex items-center justify-between p-3 border rounded-lg hover:border-[#0f3d5f] transition-colors">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={plan.amount.toString()} id={plan.type} />
                            <Label htmlFor={plan.type} className="font-normal cursor-pointer">
                              {plan.label}
                            </Label>
                          </div>
                          <span className="font-semibold text-[#0f3d5f]">€{plan.amount}</span>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {/* Amount Input */}
                {paymentType !== 'membership' && (
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (€)</Label>
                    <Input
                      id="amount"
                      type="number"
                      min="1"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                )}

                {/* Personal Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Personal Details</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+32 123 456 789"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={loading || !scriptLoaded}
                >
                  {loading ? (
                    'Processing...'
                  ) : !scriptLoaded ? (
                    'Loading Payment Service...'
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Proceed to Payment
                      {amount && ` (€${amount})`}
                    </>
                  )}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  <AlertCircle className="h-4 w-4 inline mr-1" />
                  Payments are processed securely. Your card information is never stored on our servers.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}