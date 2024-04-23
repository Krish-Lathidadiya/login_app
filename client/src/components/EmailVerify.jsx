import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EmailVerify() {
  const [email,setEmail]=useState()
  const [userId,setUserId]=useState()

  const navigate=useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
  
    try {
  
      const response = await fetch("http://localhost:5000/api/v1/users/otp/verifyEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }), 
      });
  
      const responseData = await response.json();
      console.log("Parsed Response Data:", responseData);
  
      if (response.ok) {
        toast.success(responseData.message);
        const { userId, email } = responseData.data.responseData;
        setUserId(userId);
        navigate('/Otp', { state: { userId, email } }); 
      
      } else {
        toast.error(responseData.error); 
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
            Enter Your Email To Verify
          </h2>
        </div>
        <form onSubmit={submitHandler} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-2">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
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
            Already verified?{" "}
            <Link className="text-indigo-500 font-medium" to="/">
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default EmailVerify;
