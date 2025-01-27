import { useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";

const CheckoutPage = () => {
  const { id } = useParams();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { register, handleSubmit } = useForm();

  const handlePayment = async () => {
    try {
      const response = await axios.post(`/api/pay/${id}`);
      if (response.data.clientSecret) {
        setPaymentSuccess(true);
        toast.success("Payment Successful!");
      } else {
        throw new Error("Payment failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      const applicationData = {
        ...data,
        scholarshipId: id,
        userId: "USER_ID_FROM_DB", // Replace with actual user ID
        userName: "John Doe", // Replace with actual user name
        userEmail: "john.doe@example.com", // Replace with actual user email
        dateApplied: new Date().toISOString(),
      };

      const response = await axios.post(`/api/apply`, applicationData);
      if (response.status === 201) {
        Swal.fire("Application Submitted!", "You have applied successfully!", "success");
      } else {
        throw new Error("Application submission failed");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      {!paymentSuccess ? (
        <button onClick={handlePayment} className="btn-primary">
          Pay Application Fee
        </button>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("phone")}
            placeholder="Phone Number"
            className="form-input"
            required
          />
          <input
            {...register("photo")}
            type="file"
            className="form-input"
            required
          />
          <input
            {...register("address")}
            placeholder="Address (village, district, country)"
            className="form-input"
            required
          />
          <select {...register("gender")} className="form-input" required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select {...register("degree")} className="form-input" required>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
          <input
            {...register("sscResult")}
            placeholder="SSC Result"
            className="form-input"
            required
          />
          <input
            {...register("hscResult")}
            placeholder="HSC Result"
            className="form-input"
            required
          />
          <select {...register("studyGap")} className="form-input">
            <option value="">No Study Gap</option>
            <option value="1 Year">1 Year</option>
            <option value="2 Years">2 Years</option>
          </select>
          <button type="submit" className="btn-primary">
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutPage;
