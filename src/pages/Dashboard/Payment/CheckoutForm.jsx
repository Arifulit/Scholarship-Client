

// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import './CheckoutForm.css';
// import Button from '../../../components/Shared/Button/Button';
// import PropTypes from 'prop-types';
// import { Navigate, useLoaderData } from 'react-router-dom';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { useEffect, useState } from 'react';
// import useAuth from '../../../hooks/useAuth';
// import Swal from 'sweetalert2';
// // import axios from 'axios';
// const CheckoutForm = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const [clientSecret,setClientSecret] = useState('');
//   const data = useLoaderData();
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState('');
//   const [transactionId, setTransactionId] = useState('');

//   const totalFee = data.applicationFee;
//   // const totalFee = data.applicationFee;

//   console.log('checkout page',data)

//   useEffect(() => {
//      axiosSecure.post('/create-payment-intent', {fee: totalFee})
//      .then(res =>{
//       console.log(res.data.clientSecret);
//       setClientSecret(res.data.clientSecret);
//      })
//   },[axiosSecure, totalFee]);


//   const handleSubmit = async (event) => {
//     // Block native form submission.
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const card = elements.getElement(CardElement);

//     if (card == null) {
//       return;
//     }

  
//     const {error, paymentMethod} = await stripe.createPaymentMethod({
//       type: 'card',
//       card,
//     });

//     if (error) {
//       console.log('payment error', error);
//       setError(error.message);
//     } else {
//       console.log('PaymentMethod', paymentMethod);
//       setError('');
//     }

//     // Confirm the payment
//     const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//           card: card,
//           billing_details: {
//               email: user?.email || "anonymous",
//               name: user?.displayName || "anonymous",
//           }
//       }
//   })

//   if (confirmError) {
//       console.log("confirm error")
//   }
//   else {
//       console.log("payment intent", paymentIntent)
//       if (paymentIntent.status === 'succeeded') {
//           console.log('transaction id', paymentIntent.id)
//           setTransactionId(paymentIntent.id)

//           // now save the payment in the database
//           const checkout = []; // Define the checkout variable
//           const payment = {
//               email: user.email,
//               name: user.displayName,
//               // image:checkoutData.image,
//               Fee: totalFee,
//               // itemName: checkoutData.name,
//               transactionId: paymentIntent.id,
//               date: new Date(),
//               checkoutId: checkout.map(item => item._id),
//               // menuItemIds: cart.map(item => item.menuId),
//               status: "pending"
//           }

//           const res = await axiosSecure.post('/payments', payment)
//           console.log("payment save", res.data)
//           // refetch()
//           if (res.insertedId) {
//               Swal.fire({
//                   position: "top-end",
//                   icon: "success",
//                   title: "Payment successfull",
//                   showConfirmButton: false,
//                   timer: 1500
//               });
//               Navigate("/")
//           }
//       }
//   }



//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement
//         options={{
//           style: {
//             base: {
//               fontSize: '16px',
//               color: '#424770',
//               '::placeholder': {
//                 color: '#aab7c4',
//               },
//             },
//             invalid: {
//               color: '#9e2146',
//             },
//           },
//         }}
//       />
      
//       <Button disabled={!stripe } type="submit" label={`Pay$ ${data.applicationFee}`}/>
//       <p className="text-red-600">{error}</p>
//        {transactionId && <p className='text-green-600'>Your transaction id:{transactionId}</p>}

//     </form>
//   );
// };
// CheckoutForm.propTypes = {
//   ApplicationData: PropTypes.shape({
//     applicationFees: PropTypes.number.isRequired,
//   }).isRequired,
// };

// export default CheckoutForm;

// // Make sure to call `loadStripe` outside of a component’s render to avoid



import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutForm.css';
import Button from '../../../components/Shared/Button/Button';
import { useEffect, useState } from 'react';
import { Link, Navigate, useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { GiConsoleController } from 'react-icons/gi';

const CheckoutForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const data = useLoaderData();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const totalFee = data.applicationFee;
  console.log('checkout all data ', data);

  useEffect(() => {
    axiosSecure.post('/create-payment-intent', { fee: totalFee }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, totalFee]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (paymentError) {
      setError(paymentError.message);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      setTransactionId(paymentIntent.id);

      const paymentData = {
        email: user.email,
        name: user.displayName,
        fee: totalFee,
        transactionId: paymentIntent.id,
        date: new Date(),
        status: 'pending',
        id: data._id,
      };

      try {
        const res = await axiosSecure.post('/payments', paymentData);
        if (res.data.insertedId) {
          Swal.fire('Success!', 'Payment completed successfully.', 'success');
          navigate('/application-modal', { state: { paymentData, applicationData: data } });
          // <Link to="/application-modal" state={{ paymentData, applicationData: data }} />;
        }
      } catch (error) {
        console.error('Error saving payment:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: { fontSize: '16px', color: '#424770' },
            invalid: { color: '#9e2146' },
          },
        }}
      />
      {/* <Link to="/application-modal"><Button disabled={!stripe} type="submit" label={`Pay $${totalFee}`} /></Link> */}
      <Button disabled={!stripe} type="submit" label={`Pay $${totalFee}`} />
      {error && <p className="text-red-600">{error}</p>}
      {transactionId && <p className="text-green-600">Transaction ID: {transactionId}</p>}
    </form>
  );
};

export default CheckoutForm;
