import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import Layout from '../components/layout/Layout';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: 'United States (US)',
    address: '',
    apartment: '',
    city: '',
    state: 'New York',
    zipCode: '',
    phone: '',
    email: '',
  });
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: 'United States (US)',
    address: '',
    apartment: '',
    city: '',
    state: 'New York',
    zipCode: '',
  });
  const [savePayment, setSavePayment] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (paymentMethodError) {
        setError(paymentMethodError.message);
        setIsProcessing(false);
        return;
      }

      const { data } = await axios.post('/api/v1/payment/process-payment', {
        paymentMethodId: paymentMethod.id,
        billingDetails,
        shippingDetails,
        savePayment,
      });

      
    } catch (err) {
      console.error(err);
      setError('An error occurred while processing your payment.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card shadow-sm rounded border-0">
              <div className="card-header text-center bg-primary text-white rounded-top">
                Billing Details
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  {/* Billing Details */}
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-control"
                      value={billingDetails.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-control"
                      value={billingDetails.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="company" className="form-label">Company Name (optional)</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="form-control"
                      value={billingDetails.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country / Region *</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      className="form-control"
                      value={billingDetails.country}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Street Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="form-control"
                      value={billingDetails.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="apartment" className="form-label">Apartment, Suite, Unit, etc. (optional)</label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      className="form-control"
                      value={billingDetails.apartment}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">Town / City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="form-control"
                      value={billingDetails.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="state" className="form-label">State *</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      className="form-control"
                      value={billingDetails.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="zipCode" className="form-label">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      className="form-control"
                      value={billingDetails.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control"
                      value={billingDetails.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={billingDetails.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Shipping Details */}
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      id="shipToDifferentAddress"
                      className="form-check-input"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setShippingDetails(billingDetails);
                        } else {
                          setShippingDetails({
                            firstName: '',
                            lastName: '',
                            company: '',
                            country: 'United States (US)',
                            address: '',
                            apartment: '',
                            city: '',
                            state: 'New York',
                            zipCode: '',
                          });
                        }
                      }}
                    />
                    <label htmlFor="shipToDifferentAddress" className="form-check-label">Ship to a different address?</label>
                  </div>
                  {shippingDetails && (
                    <>
                      <h5 className="mt-4">Shipping Details</h5>
                      <div className="mb-3">
                        <label htmlFor="shipFirstName" className="form-label">First Name *</label>
                        <input
                          type="text"
                          id="shipFirstName"
                          name="firstName"
                          className="form-control"
                          value={shippingDetails.firstName}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="shipLastName" className="form-label">Last Name *</label>
                        <input
                          type="text"
                          id="shipLastName"
                          name="lastName"
                          className="form-control"
                          value={shippingDetails.lastName}
                          onChange={handleShippingChange}
                          required
                        />
                      </div>
                      {/* Add the rest of the shipping fields similarly */}
                    </>
                  )}

                  {/* Save Payment */}
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      id="savePayment"
                      className="form-check-input"
                      checked={savePayment}
                      onChange={(e) => setSavePayment(e.target.checked)}
                    />
                    <label htmlFor="savePayment" className="form-check-label">Save payment information for future purchases</label>
                  </div>

                  {/* Payment Details */}
                  <h5 className="mt-4">Payment Details</h5>
                  <div className="mb-3">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                              color: '#aab7c4',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </div>

                  {/* Error Message */}
                  {error && <div className="alert alert-danger">{error}</div>}

                  {/* Submit Button */}
                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={isProcessing || !stripe}
                    >
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Product Detail Section */}
          <div className="col-md-6">
            <div className="card shadow-sm rounded border-0">
              <div className="card-header text-center bg-info text-white rounded-top">
                Order Summary
              </div>
              <div className="card-body p-4">
                <p><strong>Product Name:</strong> Cool Jacket</p>
                <p><strong>Subtotal:</strong> $50.00</p>
                <p><strong>Total:</strong> $55.00</p>
                <p><strong>Payment Method:</strong> Credit Card (Stripe)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutForm;
