import React, { useState } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Otp() {

  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const userId = location.state?.userId || "";
  const email = location.state?.email || ""


  const submitHandler = async (e) => {
    e.preventDefault();
  
    try {
     
      // console.log("user Data:", userId);
      // console.log("user Data:", email);
      // console.log("Otp Data:", otp);
  
      const response = await fetch("http://localhost:5000/api/v1/users/otp/verifyOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId:userId ,otp:otp }), 
      });
  

      // console.log("Raw Response:", response)  
      const responseData = await response.json();
      console.log("Parsed Response Data:", responseData);
  
      if (response.ok) {
        toast.success(responseData.message);
        navigate('/Reset', { state: { userId: userId } });
      } else {
        toast.error("Error:", responseData.message);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  
  const resendOtpHandler = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/users/otp/resendOtpVerificationCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId ,email: email}),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        console.log(responseData.message);
      } else {
        console.log("Error:", responseData.message);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
      <div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Enter Your OTP
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={submitHandler}>
        <div className="rounded-md shadow-sm space-y-2">
          <div>
            <input
              id="otp"
              name="otp"
              type="number"
              autoComplete="otp"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Verify
          </button>
        </div>
      </form>

      <div className="flex items-center justify-center mt-4">
          <p className="text-sm">
            If you need to resend OTP,{" "}
            <button
              className="text-indigo-500 font-medium"
              onClick={resendOtpHandler}
            >
              Resend OTP
            </button>
          </p>
        </div>

    </div>
    <ToastContainer />
  </section>
  )
}

export default Otp