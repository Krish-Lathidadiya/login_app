import React, { useState } from "react";
import { useNavigate,useLocation} from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Reset() {

  const [password,setPassword]=useState()
  const [confirmPassword,setConfirmPassword]=useState()

  const location = useLocation();
  const userId = location.state?.userId || "";

  const navigate=useNavigate();

  const submitHandler=async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/v1/users/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId ,password,confirmPassword}),
      });

      const responseData = await response.json();
      if (response.ok) {
        toast.success(responseData.message);
        navigate('/')
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }

  }


  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Enter New Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          <div className="rounded-md shadow-sm space-y-2">
            <div>
              <label htmlFor="password" className="sr-only">
                password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter confirm Password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Reset;
