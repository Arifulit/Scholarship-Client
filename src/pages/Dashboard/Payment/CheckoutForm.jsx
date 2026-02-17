

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutForm.css';
import Button from '../../../components/Shared/Button/Button';
import PropTypes from 'prop-types';
import {  useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState('');
  const data = useLoaderData();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const totalFee = data.applicationFee;
   
   console.log("user",data);



  useEffect(() => {
    if (!totalFee || totalFee <= 0) {
      console.error('❌ Invalid fee amount:', totalFee)
      return
    }
    
    axiosSecure.post('/create-payment-intent', { fee: totalFee })
      .then(res => {
        console.log('✅ Payment intent created:', res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
      .catch(error => {
        console.error('❌ Error creating payment intent:', error)
        setError('Failed to initialize payment. Please try again.')
      })
  }, [axiosSecure, totalFee]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error,  } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('Payment error', error);
      setError(error.message);
    } else {
      setError('');
    }

    // Confirm the payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        }
      }
    });

    if (confirmError) {
      console.log("Confirm error", confirmError);
    } else {
      console.log("Payment Intent", paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        console.log('Transaction ID:', paymentIntent.id);
        setTransactionId(paymentIntent.id);

          
        

        const payment = {
          scholarshipCategory: data.scholarshipCategory,
          subjectCategory: data.subjectCategory,
          universityName: data.universityName,
          email: user.email,
          name: user.displayName,
          Fee: totalFee,
          transactionId: paymentIntent.id,
          date: new Date(),
          status: "pending"
        };

        // Save payment in the database
        try {
          const res = await axiosSecure.post('/payments', payment);
          console.log("✅ Payment saved:", res.data);

          if (res.status === 201 || res.status === 200) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Payment successful",
              showConfirmButton: false,
              timer: 1500
            });
            
            // Navigate after a short delay to ensure state is saved
            setTimeout(() => {
              navigate(`/application-modal/${data.id}`);
            }, 1500);
          }
        } catch (saveError) {
          console.error('❌ Error saving payment:', saveError);
          Swal.fire({
            icon: 'error',
            title: 'Payment Saved but...',
            text: 'Payment was successful but there was an issue saving the details. Please contact support.',
          });
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      
       <Button disabled={!stripe} type="submit" label={`Pay $${totalFee}`} />
      <p className="text-red-600">{error}</p>
      {transactionId && <p className="text-green-600">Your transaction ID: {transactionId}</p>}
    </form>
  );
};

CheckoutForm.propTypes = {
  ApplicationData: PropTypes.shape({
    applicationFees: PropTypes.number.isRequired,
  }).isRequired,
};

export default CheckoutForm;



